export type Client = {
  id: string
  name: string
  logo_url?: string | null
  primary_color: string
  secondary_color: string
  created_at: string
  updated_at: string
}

export type Template = {
  id: string
  name: string
  description?: string | null
  is_default: boolean
  created_at: string
  updated_at: string
}

export type Proposal = {
  id: string
  client_id: string
  template_id: string
  title: string
  description?: string | null
  version: number
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  published_at?: string | null
}

export type Component = {
  id: string
  template_id: string
  name: string
  type: 'agent' | 'rpa' | 'interface' | 'system'
  description?: string | null
  icon?: string | null
  order_index?: number | null
  created_at: string
  updated_at: string
}

export type ComponentDetail = {
  id: string
  component_id: string
  key: string
  value: string
  order_index?: number | null
  created_at: string
}

export type ProposalComponent = {
  id: string
  proposal_id: string
  component_id: string
  investment_value?: number | null
  monthly_cost?: number | null
  market_comparison_value?: number | null
  timeframe?: string | null
  phase?: number | null
  implementation_month_start?: number | null
  implementation_month_end?: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type ProposalPhase = {
  id: string
  proposal_id: string
  name: string
  number: number
  description?: string | null
  month_start?: number | null
  month_end?: number | null
  created_at: string
  updated_at: string
}

export type ProposalResult = {
  id: string
  proposal_id: string
  type: 'quantitative' | 'qualitative' | 'roi'
  title: string
  description?: string | null
  value?: string | null
  icon?: string | null
  order_index?: number | null
  created_at: string
  updated_at: string
}

// Tipo para os joins e queries comuns
export type ComponentWithDetails = Component & {
  details: ComponentDetail[]
}

export type ProposalWithComponents = Proposal & {
  components: (ProposalComponent & {
    component: ComponentWithDetails
  })[]
  phases: ProposalPhase[]
  results: ProposalResult[]
  client: Client
  template: Template
}

export type CompleteProposal = Proposal & {
  client: Client
  template: Template
  components: (ProposalComponent & {
    component: ComponentWithDetails
  })[]
  phases: ProposalPhase[]
  results: ProposalResult[]
} 