"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Search, Clock, CheckCircle, Archive } from "lucide-react"
import { supabase } from "@/lib/database/supabase/client"
import type { Client, Proposal } from "@/lib/types/database"

type ProposalWithClient = Proposal & {
  client: Client
}

export default function ProposalHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [proposals, setProposals] = useState<ProposalWithClient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchProposals = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('proposta_hub.proposals')
          .select(`
            *,
            client:proposta_hub.clients(*)
          `)
        
        if (error) {
          console.error('Erro ao buscar propostas:', error)
          return
        }
        
        setProposals(data as ProposalWithClient[])
      } catch (error) {
        console.error('Erro ao buscar propostas:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchProposals()
  }, [])
  
  const filteredProposals = proposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.client.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Rascunho</span>
      case 'published':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Publicada</span>
      case 'archived':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><Archive className="w-3 h-3 mr-1" /> Arquivada</span>
      default:
        return null
    }
  }
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Hub de Propostas</h1>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar proposta ou cliente..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link href="/proposals/new">
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" /> Nova Proposta
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredProposals.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Nenhuma proposta encontrada</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProposals.map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden hover:shadow-md transition-shadow border-gray-200">
                  <div 
                    className="h-2"
                    style={{ background: `linear-gradient(to right, ${proposal.client.primary_color}, ${proposal.client.secondary_color})` }}
                  ></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {proposal.client.logo_url && (
                          <div className="h-6 w-6 relative">
                            <Image 
                              src={proposal.client.logo_url}
                              alt={proposal.client.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      </div>
                      {getStatusBadge(proposal.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-500">Cliente: {proposal.client.name}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(proposal.updated_at).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: '2-digit', 
                        year: 'numeric'
                      })}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/proposals/${proposal.id}`} className="w-full">
                      <Button variant="outline" className="w-full">Ver Proposta</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-500">Nova Proposta</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-24">
                  <div className="text-4xl text-gray-300">
                    <Plus className="h-12 w-12" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/proposals/new" className="w-full">
                    <Button variant="outline" className="w-full">Criar Nova</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  )
} 