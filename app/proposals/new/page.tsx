"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/database/supabase/client"
import type { Client, Template } from "@/lib/types/database"

export default function NewProposal() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client_id: "",
    template_id: ""
  })
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar clientes
        const { data: clientsData, error: clientsError } = await supabase
          .from('proposta_hub.clients')
          .select('*')
        
        if (clientsError) {
          console.error('Erro ao buscar clientes:', clientsError)
        } else {
          setClients(clientsData)
        }
        
        // Buscar templates
        const { data: templatesData, error: templatesError } = await supabase
          .from('proposta_hub.templates')
          .select('*')
        
        if (templatesError) {
          console.error('Erro ao buscar templates:', templatesError)
        } else {
          setTemplates(templatesData)
          
          // Selecionar o template padrão automaticamente, se existir
          const defaultTemplate = templatesData.find(template => template.is_default)
          if (defaultTemplate) {
            setFormData(prev => ({ ...prev, template_id: defaultTemplate.id }))
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      }
    }
    
    fetchData()
  }, [])
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Validar dados
      if (!formData.title || !formData.client_id || !formData.template_id) {
        alert('Por favor, preencha todos os campos obrigatórios')
        setIsLoading(false)
        return
      }
      
      // Criar nova proposta
      const { data, error } = await supabase
        .from('proposta_hub.proposals')
        .insert({
          title: formData.title,
          description: formData.description,
          client_id: formData.client_id,
          template_id: formData.template_id,
          status: 'draft'
        })
        .select()
      
      if (error) {
        console.error('Erro ao criar proposta:', error)
        alert('Erro ao criar proposta. Por favor, tente novamente.')
        setIsLoading(false)
        return
      }
      
      // Redirecionar para a página da proposta
      router.push(`/proposals/${data[0].id}`)
    } catch (error) {
      console.error('Erro ao criar proposta:', error)
      alert('Erro ao criar proposta. Por favor, tente novamente.')
      setIsLoading(false)
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/proposals" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Nova Proposta</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título da Proposta *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Proposta de Transformação Digital"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Breve descrição da proposta"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_id">Cliente *</Label>
              <Select
                value={formData.client_id}
                onValueChange={(value) => handleSelectChange('client_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template_id">Template *</Label>
              <Select
                value={formData.template_id}
                onValueChange={(value) => handleSelectChange('template_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} {template.is_default && '(Padrão)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                O template define os componentes e estrutura base da proposta
              </p>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Criar Proposta
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
} 