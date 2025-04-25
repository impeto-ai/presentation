-- Criar esquema personalizado
CREATE SCHEMA IF NOT EXISTS proposta_hub;

-- Tabela de Clientes
CREATE TABLE proposta_hub.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#4361ee',
  secondary_color TEXT DEFAULT '#3f37c9',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Templates
CREATE TABLE proposta_hub.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Propostas
CREATE TABLE proposta_hub.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES proposta_hub.clients(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES proposta_hub.templates(id),
  title TEXT NOT NULL,
  description TEXT,
  version INT DEFAULT 1,
  status TEXT DEFAULT 'draft', -- draft, published, archived
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Tabela de Componentes
CREATE TABLE proposta_hub.components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES proposta_hub.templates(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- agent, rpa, interface, system, etc.
  description TEXT,
  icon TEXT,
  order_index INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Detalhes dos Componentes
CREATE TABLE proposta_hub.component_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  component_id UUID NOT NULL REFERENCES proposta_hub.components(id) ON DELETE CASCADE,
  key TEXT NOT NULL, -- feature, benefit, etc.
  value TEXT NOT NULL,
  order_index INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Valores dos Componentes na Proposta
CREATE TABLE proposta_hub.proposal_components (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposta_hub.proposals(id) ON DELETE CASCADE,
  component_id UUID NOT NULL REFERENCES proposta_hub.components(id),
  investment_value DECIMAL(10,2),
  monthly_cost DECIMAL(10,2),
  market_comparison_value DECIMAL(10,2),
  timeframe TEXT,
  phase INT,
  implementation_month_start INT,
  implementation_month_end INT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(proposal_id, component_id)
);

-- Tabela de Fases da Proposta
CREATE TABLE proposta_hub.proposal_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposta_hub.proposals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  number INT NOT NULL,
  description TEXT,
  month_start INT,
  month_end INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(proposal_id, number)
);

-- Tabela de Resultados da Proposta
CREATE TABLE proposta_hub.proposal_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES proposta_hub.proposals(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- quantitative, qualitative, roi, etc.
  title TEXT NOT NULL,
  description TEXT,
  value TEXT,
  icon TEXT,
  order_index INT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ativar extensão RLS para segurança dos dados
ALTER TABLE proposta_hub.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.component_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.proposal_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.proposal_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposta_hub.proposal_results ENABLE ROW LEVEL SECURITY;

-- Criar função para atualizar o timestamp de updated_at
CREATE OR REPLACE FUNCTION proposta_hub.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas
CREATE TRIGGER update_clients_updated_at
BEFORE UPDATE ON proposta_hub.clients
FOR EACH ROW EXECUTE FUNCTION proposta_hub.update_updated_at();

CREATE TRIGGER update_templates_updated_at
BEFORE UPDATE ON proposta_hub.templates
FOR EACH ROW EXECUTE FUNCTION proposta_hub.update_updated_at();

CREATE TRIGGER update_proposals_updated_at
BEFORE UPDATE ON proposta_hub.proposals
FOR EACH ROW EXECUTE FUNCTION proposta_hub.update_updated_at();

CREATE TRIGGER update_components_updated_at
BEFORE UPDATE ON proposta_hub.components
FOR EACH ROW EXECUTE FUNCTION proposta_hub.update_updated_at();

CREATE TRIGGER update_proposal_components_updated_at
BEFORE UPDATE ON proposta_hub.proposal_components
FOR EACH ROW EXECUTE FUNCTION proposta_hub.update_updated_at();

-- Criar políticas RLS
-- Políticas para clientes
CREATE POLICY "Permissão para visualizar clientes" ON proposta_hub.clients FOR SELECT USING (true);
CREATE POLICY "Permissão para inserir clientes" ON proposta_hub.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Permissão para atualizar clientes" ON proposta_hub.clients FOR UPDATE USING (true);

-- Políticas para templates
CREATE POLICY "Permissão para visualizar templates" ON proposta_hub.templates FOR SELECT USING (true);
CREATE POLICY "Permissão para inserir templates" ON proposta_hub.templates FOR INSERT WITH CHECK (true);
CREATE POLICY "Permissão para atualizar templates" ON proposta_hub.templates FOR UPDATE USING (true);

-- Políticas para propostas
CREATE POLICY "Permissão para visualizar propostas" ON proposta_hub.proposals FOR SELECT USING (true);
CREATE POLICY "Permissão para inserir propostas" ON proposta_hub.proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "Permissão para atualizar propostas" ON proposta_hub.proposals FOR UPDATE USING (true);

-- Adicionar template padrão
INSERT INTO proposta_hub.templates (name, description, is_default) 
VALUES ('Template Padrão', 'Template padrão para propostas', true); 