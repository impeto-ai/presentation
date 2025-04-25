export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      [key: string]: {
        Row: {}
        Insert: {}
        Update: {}
        Relationships: {}
      }
    }
    Views: {
      [key: string]: {
        Row: {}
      }
    }
    Functions: {
      [key: string]: {
        Args: {}
        Returns: {}
      }
    }
    Enums: {
      [key: string]: {}
    }
  }
  proposta_hub: {
    Tables: {
      clients: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          primary_color: string
          secondary_color: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          primary_color?: string
          secondary_color?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      templates: {
        Row: {
          id: string
          name: string
          description: string | null
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      proposals: {
        Row: {
          id: string
          client_id: string
          template_id: string
          title: string
          description: string | null
          version: number
          status: string
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          template_id: string
          title: string
          description?: string | null
          version?: number
          status?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          template_id?: string
          title?: string
          description?: string | null
          version?: number
          status?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
      components: {
        Row: {
          id: string
          template_id: string
          name: string
          type: string
          description: string | null
          icon: string | null
          order_index: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id: string
          name: string
          type: string
          description?: string | null
          icon?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string
          name?: string
          type?: string
          description?: string | null
          icon?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "components_template_id_fkey"
            columns: ["template_id"]
            referencedRelation: "templates"
            referencedColumns: ["id"]
          }
        ]
      }
      component_details: {
        Row: {
          id: string
          component_id: string
          key: string
          value: string
          order_index: number | null
          created_at: string
        }
        Insert: {
          id?: string
          component_id: string
          key: string
          value: string
          order_index?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          component_id?: string
          key?: string
          value?: string
          order_index?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "component_details_component_id_fkey"
            columns: ["component_id"]
            referencedRelation: "components"
            referencedColumns: ["id"]
          }
        ]
      }
      proposal_components: {
        Row: {
          id: string
          proposal_id: string
          component_id: string
          investment_value: number | null
          monthly_cost: number | null
          market_comparison_value: number | null
          timeframe: string | null
          phase: number | null
          implementation_month_start: number | null
          implementation_month_end: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          proposal_id: string
          component_id: string
          investment_value?: number | null
          monthly_cost?: number | null
          market_comparison_value?: number | null
          timeframe?: string | null
          phase?: number | null
          implementation_month_start?: number | null
          implementation_month_end?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          proposal_id?: string
          component_id?: string
          investment_value?: number | null
          monthly_cost?: number | null
          market_comparison_value?: number | null
          timeframe?: string | null
          phase?: number | null
          implementation_month_start?: number | null
          implementation_month_end?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_components_proposal_id_fkey"
            columns: ["proposal_id"]
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_components_component_id_fkey"
            columns: ["component_id"]
            referencedRelation: "components"
            referencedColumns: ["id"]
          }
        ]
      }
      proposal_phases: {
        Row: {
          id: string
          proposal_id: string
          name: string
          number: number
          description: string | null
          month_start: number | null
          month_end: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          proposal_id: string
          name: string
          number: number
          description?: string | null
          month_start?: number | null
          month_end?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          proposal_id?: string
          name?: string
          number?: number
          description?: string | null
          month_start?: number | null
          month_end?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_phases_proposal_id_fkey"
            columns: ["proposal_id"]
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          }
        ]
      }
      proposal_results: {
        Row: {
          id: string
          proposal_id: string
          type: string
          title: string
          description: string | null
          value: string | null
          icon: string | null
          order_index: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          proposal_id: string
          type: string
          title: string
          description?: string | null
          value?: string | null
          icon?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          proposal_id?: string
          type?: string
          title?: string
          description?: string | null
          value?: string | null
          icon?: string | null
          order_index?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_results_proposal_id_fkey"
            columns: ["proposal_id"]
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
} 