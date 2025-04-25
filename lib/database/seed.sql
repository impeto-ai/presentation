-- Inserir cliente MedWork
INSERT INTO proposta_hub.clients (id, name, logo_url, primary_color, secondary_color)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'MedWork', '/logo-medwork.png', '#4361ee', '#3f37c9');

-- Inserir componentes para o template padrão (assumindo que o template padrão tem ID 1)
DO $$
DECLARE
    template_id UUID;
BEGIN
    SELECT id INTO template_id FROM proposta_hub.templates WHERE is_default = true;
    
    -- Agentes de IA
    INSERT INTO proposta_hub.components (template_id, name, type, description, icon, order_index)
    VALUES
      (template_id, 'Agente Financeiro', 'agent', 'Agente inteligente para automatização de processos financeiros', 'Bot', 1),
      (template_id, 'Agente de Cobrança', 'agent', 'Agente para automatização do processo de cobrança', 'Bot', 2),
      (template_id, 'Agente de Verificação de Exames', 'agent', 'Agente para verificação e análise de exames médicos', 'Bot', 3),
      (template_id, 'Agente de Atendimento', 'agent', 'Agente para automatização do processo de agendamento e cadastro', 'Bot', 4);

    -- RPAs
    INSERT INTO proposta_hub.components (template_id, name, type, description, icon, order_index)
    VALUES
      (template_id, 'RPA para Agendamentos', 'rpa', 'Robô para automatização de agendamentos no sistema', 'Cog', 5),
      (template_id, 'RPA para Extração de Exames', 'rpa', 'Robô para extração automatizada de dados de exames', 'Cog', 6);

    -- Interfaces
    INSERT INTO proposta_hub.components (template_id, name, type, description, icon, order_index)
    VALUES
      (template_id, 'Interface para Conhecimento de Auxílio Médico', 'interface', 'Interface inteligente com base de conhecimento médico', 'LayoutDashboard', 7),
      (template_id, 'Interface para Conhecimento Técnico SST', 'interface', 'Interface inteligente com base de conhecimento técnico em SST', 'LayoutDashboard', 8);

    -- Sistemas
    INSERT INTO proposta_hub.components (template_id, name, type, description, icon, order_index)
    VALUES
      (template_id, 'Aplicativo para Gestão de Treinamento', 'system', 'Sistema completo para gerenciamento de treinamentos', 'Smartphone', 9),
      (template_id, 'Criação do PCMSO', 'system', 'Sistema para geração do Programa de Controle Médico de Saúde Ocupacional', 'FileText', 10),
      (template_id, 'KPIs para Gestão Financeira', 'system', 'Dashboard de indicadores para gestão financeira da operação', 'LayoutDashboard', 11);
END $$;

-- Inserir detalhes para os componentes
DO $$
DECLARE
    agente_financeiro_id UUID;
    agente_atendimento_id UUID;
    kpis_gestao_id UUID;
BEGIN
    -- Obter IDs
    SELECT id INTO agente_financeiro_id FROM proposta_hub.components WHERE name = 'Agente Financeiro';
    SELECT id INTO agente_atendimento_id FROM proposta_hub.components WHERE name = 'Agente de Atendimento';
    SELECT id INTO kpis_gestao_id FROM proposta_hub.components WHERE name = 'KPIs para Gestão Financeira';
    
    -- Detalhes para Agente Financeiro
    INSERT INTO proposta_hub.component_details (component_id, key, value, order_index)
    VALUES
      (agente_financeiro_id, 'feature', 'Análise automática de contas a receber', 1),
      (agente_financeiro_id, 'feature', 'Integração com Conta Azul', 2),
      (agente_financeiro_id, 'feature', 'Relatórios de fluxo de caixa', 3);
      
    -- Detalhes para Agente de Atendimento
    INSERT INTO proposta_hub.component_details (component_id, key, value, order_index)
    VALUES
      (agente_atendimento_id, 'feature', 'Agendamentos via RPA', 1),
      (agente_atendimento_id, 'feature', 'Onboarding de novos usuários', 2),
      (agente_atendimento_id, 'feature', 'Atendimento ao RH especializado', 3);
      
    -- Detalhes para KPIs para Gestão Financeira
    INSERT INTO proposta_hub.component_details (component_id, key, value, order_index)
    VALUES
      (kpis_gestao_id, 'feature', 'Monitoramento em tempo real', 1),
      (kpis_gestao_id, 'feature', 'Integração com todos os sistemas', 2),
      (kpis_gestao_id, 'feature', 'Relatórios automatizados e personalizáveis', 3);
END $$;

-- Criar proposta para MedWork
DO $$
DECLARE
    medwork_id UUID := '11111111-1111-1111-1111-111111111111';
    template_id UUID;
    proposal_id UUID;
    agente_financeiro_id UUID;
    agente_cobranca_id UUID;
    agente_exames_id UUID;
    agente_atendimento_id UUID;
    kpis_gestao_id UUID;
    app_treinamento_id UUID;
BEGIN
    -- Obter template padrão
    SELECT id INTO template_id FROM proposta_hub.templates WHERE is_default = true;
    
    -- Criar proposta
    INSERT INTO proposta_hub.proposals (client_id, template_id, title, description, status)
    VALUES (medwork_id, template_id, 'Proposta MedWork - Transformação Digital', 'Proposta para implementação de soluções de transformação digital na MedWork', 'published')
    RETURNING id INTO proposal_id;
    
    -- Obter IDs dos componentes
    SELECT id INTO agente_financeiro_id FROM proposta_hub.components WHERE name = 'Agente Financeiro';
    SELECT id INTO agente_cobranca_id FROM proposta_hub.components WHERE name = 'Agente de Cobrança';
    SELECT id INTO agente_exames_id FROM proposta_hub.components WHERE name = 'Agente de Verificação de Exames';
    SELECT id INTO agente_atendimento_id FROM proposta_hub.components WHERE name = 'Agente de Atendimento';
    SELECT id INTO kpis_gestao_id FROM proposta_hub.components WHERE name = 'KPIs para Gestão Financeira';
    SELECT id INTO app_treinamento_id FROM proposta_hub.components WHERE name = 'Aplicativo para Gestão de Treinamento';
    
    -- Criar fases da proposta
    INSERT INTO proposta_hub.proposal_phases (proposal_id, name, number, description, month_start, month_end)
    VALUES
      (proposal_id, 'Fundação', 1, 'Formação da equipe, configuração dos ambientes de desenvolvimento e implantação das primeiras soluções de automação', 2, 3),
      (proposal_id, 'Expansão', 2, 'Ampliação das capacidades analíticas e expansão para novos processos', 4, 6),
      (proposal_id, 'Integração', 3, 'Integração de sistemas e processos para maximizar eficiência operacional', 6, 9),
      (proposal_id, 'Consolidação', 4, 'Implementação de aplicativos avançados e finalização do projeto', 10, 14);
    
    -- Adicionar componentes à proposta com valores
    INSERT INTO proposta_hub.proposal_components (proposal_id, component_id, investment_value, monthly_cost, market_comparison_value, timeframe, phase, implementation_month_start, implementation_month_end)
    VALUES
      (proposal_id, agente_financeiro_id, 15000.00, 1500.00, 4500.00, 'Mês 2-3', 1, 2, 3),
      (proposal_id, agente_cobranca_id, 18000.00, 2000.00, 4500.00, 'Mês 2-3', 1, 2, 3),
      (proposal_id, agente_exames_id, 35000.00, 3500.00, 12000.00, 'Mês 4-6', 2, 4, 6),
      (proposal_id, agente_atendimento_id, 25000.00, 2200.00, 12000.00, 'Mês 6-8', 3, 6, 8),
      (proposal_id, kpis_gestao_id, 32000.00, 2500.00, 15000.00, 'Mês 6-7', 3, 6, 7),
      (proposal_id, app_treinamento_id, 40000.00, 2800.00, 30000.00, 'Mês 7-9', 3, 7, 9);
      
    -- Adicionar resultados esperados
    INSERT INTO proposta_hub.proposal_results (proposal_id, type, title, description, value, icon, order_index)
    VALUES
      (proposal_id, 'quantitative', 'Redução de Custos Operacionais', 'Redução de 30% nos custos operacionais através da automação de processos manuais', '30%', 'BarChart3', 1),
      (proposal_id, 'quantitative', 'Aumento de Produtividade', 'Aumento de 40% na produtividade da equipe com a eliminação de tarefas repetitivas', '40%', 'Clock', 2),
      (proposal_id, 'quantitative', 'Melhoria no Atendimento', 'Redução de 70% no tempo de resposta ao cliente e aumento de 25% na satisfação', '70%', 'Users', 3),
      (proposal_id, 'roi', 'ROI Projetado', 'Baseado na redução de custos operacionais e aumento de eficiência nos processos', '250%', 'TrendingUp', 4),
      (proposal_id, 'roi', 'Tempo para Break-even', 'Considerando a economia gerada pela automação e otimização de processos', '8 meses', 'Clock', 5);
END $$; 