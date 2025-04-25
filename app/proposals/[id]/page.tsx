"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Eye, EyeOff, Bot, Cog, LayoutDashboard, Code, CheckCircle2, Clock, Loader2 } from "lucide-react"
import { supabase } from "@/lib/database/supabase/client"
import type { CompleteProposal } from "@/lib/types/database"

type Props = {
  params: {
    id: string
  }
}

export default function ProposalDetails({ params }: Props) {
  const [proposal, setProposal] = useState<CompleteProposal | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("por-tipo")
  const [showValues, setShowValues] = useState(false)
  
  useEffect(() => {
    const fetchProposal = async () => {
      setIsLoading(true)
      try {
        // Buscar dados da proposta
        const { data: proposalData, error: proposalError } = await supabase
          .from('proposta_hub.proposals')
          .select(`
            *,
            client:proposta_hub.clients(*),
            template:proposta_hub.templates(*)
          `)
          .eq('id', params.id)
          .single()
        
        if (proposalError) {
          console.error('Erro ao buscar proposta:', proposalError)
          setIsLoading(false)
          return
        }
        
        // Buscar componentes da proposta
        const { data: componentsData, error: componentsError } = await supabase
          .from('proposta_hub.proposal_components')
          .select(`
            *,
            component:proposta_hub.components(
              *,
              details:proposta_hub.component_details(*)
            )
          `)
          .eq('proposal_id', params.id)
        
        if (componentsError) {
          console.error('Erro ao buscar componentes:', componentsError)
          setIsLoading(false)
          return
        }
        
        // Buscar fases da proposta
        const { data: phasesData, error: phasesError } = await supabase
          .from('proposta_hub.proposal_phases')
          .select('*')
          .eq('proposal_id', params.id)
          .order('number', { ascending: true })
        
        if (phasesError) {
          console.error('Erro ao buscar fases:', phasesError)
          setIsLoading(false)
          return
        }
        
        // Buscar resultados esperados
        const { data: resultsData, error: resultsError } = await supabase
          .from('proposta_hub.proposal_results')
          .select('*')
          .eq('proposal_id', params.id)
          .order('order_index', { ascending: true })
        
        if (resultsError) {
          console.error('Erro ao buscar resultados:', resultsError)
          setIsLoading(false)
          return
        }
        
        // Montar objeto completo da proposta
        const completeProposal = {
          ...proposalData,
          components: componentsData,
          phases: phasesData || [],
          results: resultsData || []
        } as CompleteProposal
        
        setProposal(completeProposal)
      } catch (error) {
        console.error('Erro ao buscar dados da proposta:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProposal()
  }, [params.id])
  
  const toggleValues = () => {
    setShowValues(!showValues)
  }

  const getComponentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="h-5 w-5 text-blue-600" />
      case 'Cog':
        return <Cog className="h-5 w-5 text-blue-600" />
      case 'LayoutDashboard':
        return <LayoutDashboard className="h-5 w-5 text-blue-600" />
      case 'Code':
        return <Code className="h-5 w-5 text-blue-600" />
      default:
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />
    }
  }
  
  const getComponentsByType = () => {
    if (!proposal) return {}
    
    const componentsByType: Record<string, any[]> = {
      agent: [],
      rpa: [],
      interface: [],
      system: []
    }
    
    proposal.components.forEach(component => {
      const type = component.component.type
      if (componentsByType[type]) {
        componentsByType[type].push(component)
      }
    })
    
    return componentsByType
  }
  
  const getTypeTitle = (type: string) => {
    switch (type) {
      case 'agent':
        return 'Agentes de IA'
      case 'rpa':
        return 'Automação de Processos (RPAs)'
      case 'interface':
        return 'Interfaces'
      case 'system':
        return 'Sistemas e Aplicativos'
      default:
        return type
    }
  }
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'agent':
        return <Bot className="h-7 w-7 inline-block mr-2 text-blue-600" />
      case 'rpa':
        return <Cog className="h-7 w-7 inline-block mr-2 text-blue-600" />
      case 'interface':
        return <LayoutDashboard className="h-7 w-7 inline-block mr-2 text-blue-600" />
      case 'system':
        return <Code className="h-7 w-7 inline-block mr-2 text-blue-600" />
      default:
        return null
    }
  }
  
  if (isLoading) {
    return (
      <div className="container py-10 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500">Carregando proposta...</p>
      </div>
    )
  }
  
  if (!proposal) {
    return (
      <div className="container py-10">
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Proposta não encontrada</p>
          <Link href="/proposals">
            <Button variant="outline" className="mt-4">Voltar para a lista</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  const componentsByType = getComponentsByType()
  
  return (
    <div className="container py-10">
      <div className="flex items-center mb-6 justify-between">
        <div className="flex items-center">
          <Link href="/proposals" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">{proposal.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleValues} className="flex items-center gap-2">
            {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showValues ? "Ocultar Valores" : "Mostrar Valores"}
          </Button>
          <Link href={`/proposals/${params.id}/edit`}>
            <Button size="sm" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <Card className="w-full md:w-2/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Informações da Proposta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                  <div className="flex items-center mt-1">
                    {proposal.client.logo_url && (
                      <div className="h-6 w-6 relative mr-2">
                        <Image 
                          src={proposal.client.logo_url}
                          alt={proposal.client.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="font-medium">{proposal.client.name}</p>
                  </div>
                </div>
                
                {proposal.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                    <p className="mt-1">{proposal.description}</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">
                    {proposal.status === 'draft' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-3 h-3 mr-1" /> Rascunho
                      </span>
                    )}
                    {proposal.status === 'published' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Publicada
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full md:w-1/3 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Componentes:</span>
                  <span className="font-medium">{proposal.components.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Fases:</span>
                  <span className="font-medium">{proposal.phases.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Duração Total:</span>
                  <span className="font-medium">
                    {proposal.phases.length > 0 ? (
                      `${proposal.phases[0].month_start || 1} a ${proposal.phases[proposal.phases.length - 1].month_end || 12} meses`
                    ) : (
                      "Não definida"
                    )}
                  </span>
                </div>
                
                {showValues && (
                  <>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-medium text-blue-800">
                        <span>Investimento Inicial:</span>
                        <span>
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(
                            proposal.components.reduce((sum, comp) => sum + (comp.investment_value || 0), 0)
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-medium text-blue-800 mt-1">
                        <span>Custo Mensal:</span>
                        <span>
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(
                            proposal.components.reduce((sum, comp) => sum + (comp.monthly_cost || 0), 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="por-tipo" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full md:w-64 mb-6">
            <TabsTrigger value="por-tipo">Por Tipo</TabsTrigger>
            <TabsTrigger value="por-fase">Por Fase</TabsTrigger>
          </TabsList>
          
          <TabsContent value="por-tipo" className="space-y-6">
            {Object.entries(componentsByType).map(([type, components]) => 
              components.length > 0 && (
                <div key={type} className="space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
                    {getTypeIcon(type)}
                    {getTypeTitle(type)}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {components.map((component) => (
                      <Card key={component.id} className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              {getComponentIcon(component.component.icon || '')}
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">{component.component.name}</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            {component.component.description}
                          </p>
                          <div className="space-y-2 mt-4">
                            {component.component.details?.map((detail) => (
                              detail.key === 'feature' && (
                                <div key={detail.id} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                                  <span className="text-sm text-gray-600">{detail.value}</span>
                                </div>
                              )
                            ))}
                          </div>
                          
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              {component.investment_value && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-500">Investimento Inicial:</span>
                                  <span className="font-medium text-blue-800">
                                    {new Intl.NumberFormat('pt-BR', { 
                                      style: 'currency', 
                                      currency: 'BRL' 
                                    }).format(component.investment_value)}
                                  </span>
                                </div>
                              )}
                              
                              {component.monthly_cost && (
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-gray-500">Custo Mensal:</span>
                                  <span className="font-medium text-blue-800">
                                    {new Intl.NumberFormat('pt-BR', { 
                                      style: 'currency', 
                                      currency: 'BRL' 
                                    }).format(component.monthly_cost)}
                                  </span>
                                </div>
                              )}
                              
                              {component.timeframe && (
                                <div className="flex justify-between text-sm mt-1">
                                  <span className="text-gray-500">Período de Implementação:</span>
                                  <span className="font-medium text-blue-800">{component.timeframe}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            )}
          </TabsContent>
          
          <TabsContent value="por-fase" className="space-y-8">
            {proposal.phases.map((phase) => (
              <div key={phase.id} className="space-y-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Fase {phase.number}: {phase.name} (Mês {phase.month_start}-{phase.month_end})
                </h2>
                <p className="text-gray-600">{phase.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {proposal.components
                    .filter(comp => comp.phase === phase.number)
                    .map((component) => (
                      <Card key={component.id} className="overflow-hidden border-blue-100">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-1">
                            {getComponentIcon(component.component.icon || '')}
                            <h5 className="font-medium text-sm">{component.component.name}</h5>
                          </div>
                          <p className="text-xs text-gray-600">{component.timeframe}</p>
                          
                          {showValues && (
                            <p className="text-xs text-blue-700 mt-1">
                              {component.market_comparison_value && (
                                <>Mercado: {new Intl.NumberFormat('pt-BR', { 
                                  style: 'currency', 
                                  currency: 'BRL' 
                                }).format(component.market_comparison_value)} | </>
                              )}
                              Nosso: {new Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                              }).format(component.investment_value || 0)} + {new Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                              }).format(component.monthly_cost || 0)}/mês
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 