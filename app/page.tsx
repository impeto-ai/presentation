"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InteractiveButton } from "@/components/ui/interactive-button"
import {
  BarChart3,
  Book,
  BookOpen,
  Bot,
  BrainCircuit,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Code,
  Computer,
  CreditCard,
  DollarSign,
  FileSearch,
  Flame,
  Gauge,
  GitBranch,
  HeartPulse,
  Lightbulb,
  List,
  MessageCircle,
  MonitorSmartphone,
  Plane,
  Puzzle,
  ReceiptText,
  Rocket,
  Shield,
  Smartphone,
  Trophy,
  Users,
  Workflow,
  X,
  PiggyBank,
  Calculator,
  Cpu,
  FileCog,
  Cog,
  LayoutDashboard,
  Eye,
  EyeOff,
  CheckCircle2,
  Target,
  Zap,
  Menu,
  FileText,
} from "lucide-react"
import Image from "next/image"

export default function Presentation() {
  const [showValues, setShowValues] = useState(false)
  const [activeTab, setActiveTab] = useState("por-tipo")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    intro: true,
    valores: false,
    agentes: false,
    rpas: false,
    interfaces: false,
    sistemas: false,
    implementacao: false,
    conclusao: false,
  })
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    "intro",
    "valores",
    "agentes",
    "rpas",
    "interfaces",
    "sistemas",
    "implementacao",
    "conclusao",
  ]

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timer)
  }, [])

  const toggleSection = (section: string) => {
    console.log("toggleSection chamado para:", section);
    setExpandedSections((prev) => {
      const newState = {
      ...prev,
      [section]: !prev[section],
      };
      console.log("Novo estado de expandedSections:", newState);
      return newState;
    });
  };

  const toggleValues = () => {
    console.log("toggleValues chamado, estado atual:", showValues);
    setShowValues(!showValues);
  };

  const nextSlide = () => {
    console.log("nextSlide chamado, slide atual:", currentSlide);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setExpandedSections((prev) => {
        const newState = {
        ...prev,
        [slides[currentSlide]]: false,
        [slides[currentSlide + 1]]: true,
        };
        console.log("Novo estado após nextSlide:", newState);
        return newState;
      });
    }
  };

  const prevSlide = () => {
    console.log("prevSlide chamado, slide atual:", currentSlide);
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setExpandedSections((prev) => {
        const newState = {
        ...prev,
        [slides[currentSlide]]: false,
        [slides[currentSlide - 1]]: true,
        };
        console.log("Novo estado após prevSlide:", newState);
        return newState;
      });
    }
  };

  const handleSectionClick = (section: string) => {
    console.log("handleSectionClick chamado para:", section);
    toggleSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-40">
              <Image src="/logo-impeto.png" alt="Ímpeto AI Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
            <div className="h-6 w-px bg-blue-200" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Proposta MedWork
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <InteractiveButton variant="outline" size="sm" onClick={toggleValues} className="flex items-center gap-2">
              {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showValues ? "Ocultar Valores" : "Mostrar Valores"}
            </InteractiveButton>
            <InteractiveButton variant="outline" size="sm" onClick={prevSlide} disabled={currentSlide === 0}>
              Anterior
            </InteractiveButton>
            <InteractiveButton variant="outline" size="sm" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
              Próximo
            </InteractiveButton>
          </div>
          <div className="md:hidden">
            <InteractiveButton variant="ghost" size="sm" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </InteractiveButton>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute w-full bg-white border-b shadow-lg z-50">
            <div className="container py-4 space-y-2">
              <InteractiveButton
                variant="outline"
                size="sm"
                onClick={toggleValues}
                className="w-full flex items-center gap-2 justify-center"
              >
                {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showValues ? "Ocultar Valores" : "Mostrar Valores"}
              </InteractiveButton>
              <div className="flex gap-2">
                <InteractiveButton
                  variant="outline"
                  size="sm"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="flex-1"
                >
                  Anterior
                </InteractiveButton>
                <InteractiveButton
                  variant="outline"
                  size="sm"
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="flex-1"
                >
                  Próximo
                </InteractiveButton>
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <Progress value={progress} className="h-1 rounded-none" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Intro Section */}
        <section className="mb-12 scroll-mt-20" id="intro">
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2" 
            onClick={() => handleSectionClick("intro")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("intro")}
          >
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
              {expandedSections.intro ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
              Transformação Digital para MedWork
            </h2>
          </div>

          {expandedSections.intro && (
            <div className="mt-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">Sobre a Ímpeto AI</h3>
                    <p className="text-gray-600 leading-relaxed">
                      A Ímpeto AI é uma agência especializada em soluções de inteligência artificial que impulsionam a
                      transformação digital de empresas. Nosso foco é criar soluções personalizadas que automatizam
                      processos, melhoram a eficiência operacional e geram valor real para o negócio.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full mb-2">
                          <BrainCircuit className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-blue-800 font-medium text-center">Expertise em IA</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full mb-2">
                          <Zap className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-blue-800 font-medium text-center">Soluções Customizadas</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-full mb-2">
                          <Target className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-blue-800 font-medium text-center">Resultados Mensuráveis</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                    <h3 className="text-xl font-semibold mb-3">Proposta para MedWork</h3>
                    <p className="opacity-90 mb-4">
                      Implementação de agentes automatizados, interfaces e sistemas integrados para otimizar operações,
                      aumentar a eficiência e melhorar a experiência do cliente.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-200" />
                        <span className="text-sm">13 soluções integradas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-200" />
                        <span className="text-sm">Implementação em 14 meses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-200" />
                        <span className="text-sm">Indicadores Estratégicos em Tempo Real</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-200" />
                        <span className="text-sm">Redução de Processo manuais e erros</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="relative w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-xl">
                    <Image
                      src="/logo-medwork.png"
                      alt="MedWork Logo"
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-4 bg-white"
                    />
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 w-full">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Desafios da MedWork</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-4">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-gray-600">Processos manuais que consomem tempo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-4">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-gray-600">Dificuldade no gerenciamento de exames médicos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-4">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-gray-600">Necessidade de melhorar o atendimento ao cliente</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 min-w-4">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <span className="text-gray-600">Gestão financeira e cobrança ineficientes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Valores Section */}
        <section className="mb-12 scroll-mt-20" id="valores">
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2" 
            onClick={() => handleSectionClick("valores")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("valores")}
          >
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
              {expandedSections.valores ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Nossos Valores
            </h2>
          </div>

          {expandedSections.valores && (
            <div className="mt-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <Lightbulb className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-blue-800">Inovação Constante</h3>
                      <p className="text-gray-600">
                        Buscamos sempre as soluções mais avançadas e inovadoras para nossos clientes, mantendo-nos na
                        vanguarda da tecnologia.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <CheckCircle2 className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-blue-800">Excelência Técnica</h3>
                      <p className="text-gray-600">
                        Comprometimento com a qualidade e excelência em todas as nossas entregas, garantindo soluções
                        robustas e confiáveis.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <BarChart3 className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-xl text-blue-800">Resultados Mensuráveis</h3>
                      <p className="text-gray-600">
                        Foco em entregar valor real e mensurável para o negócio dos nossos clientes, com métricas claras
                        de sucesso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-1 md:col-span-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">Nossa Missão</h3>
                    <p className="opacity-90">
                      Transformar negócios através da inteligência artificial, criando soluções que geram impacto real e
                      duradouro.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-blue-200" />
                        <h4 className="font-semibold">Foco no Cliente</h4>
                      </div>
                      <p className="text-sm opacity-80">
                        Entendemos profundamente as necessidades dos nossos clientes para entregar soluções
                        personalizadas.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-blue-200" />
                        <h4 className="font-semibold">Segurança</h4>
                      </div>
                      <p className="text-sm opacity-80">
                        Priorizamos a segurança e a privacidade dos dados em todas as nossas soluções.
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Rocket className="h-5 w-5 text-blue-200" />
                        <h4 className="font-semibold">Agilidade</h4>
                      </div>
                      <p className="text-sm opacity-80">
                        Trabalhamos com metodologias ágeis para entregar valor rapidamente e adaptar às mudanças.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Tabs for Solution Organization */}
        <div className="mb-8">
          <Tabs defaultValue="por-tipo" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="por-tipo" className="text-sm md:text-base">
                Por Tipo de Solução
              </TabsTrigger>
              <TabsTrigger value="por-execucao" className="text-sm md:text-base">
                Por Ordem de Execução
              </TabsTrigger>
            </TabsList>

            {/* Content organized by solution type */}
            <TabsContent value="por-tipo" className="space-y-12">
              {/* Agentes Section */}
              <section className="scroll-mt-20" id="agentes">
                <div
                  className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2"
                  onClick={() => handleSectionClick("agentes")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("agentes")}
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    {expandedSections.agentes ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
                    <Bot className="h-7 w-7 inline-block mr-2 text-blue-600" />
                    Agentes de I.A
                  </h2>
                </div>

                {expandedSections.agentes && (
                  <div className="mt-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Bot className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Agente de Atendimento Financeiro</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Agente especializado em tirar dúvidas financeiras dos clientes, enviar links de cobrança e
                            gerenciar demandas transacionais internas.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Esclarecimento de dúvidas financeiras</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Envio de links de cobrança</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Conexão com Gmail para obtenção de boletos</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 15.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 1.500,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Bot className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Agente de Cobrança</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Agente automatizado para rotina de cobrança integrada ao Conta Azul, enviando cobranças aos
                            clientes com pagamentos em atraso.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Conexão com dados do Conta Azul</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Envio de cobranças automatizadas</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Operação paralela à API oficial</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 18.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.000,00 + custos de envio</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Bot className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Agente de I.A para Análise de Exames</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Agente inteligente para análise automatizada de exames médicos, identificando aprovação ou
                            reprovação dos exames.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Análise automatizada de exames</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Integração com CRM</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">
                                Diferenciação entre exames aprovados/reprovados
                              </span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 35.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 3.500,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Bot className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Agente de Atendimento</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Agente para automatização do processo de agendamento e cadastro de novos usuários,
                            realizando onboarding e agendamentos no sistema.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Agendamentos via RPA</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Onboarding de novos usuários</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Atendimento ao RH especializado</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 25.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.200,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Cog className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">RPA para Agendamentos no Sistema</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Robô para automatização de agendamentos no sistema principal
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Execução automatizada de agendamentos</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Validação de dados inseridos</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Confirmação de operações realizadas</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Valor Estimado:</span>
                                <span className="font-medium text-blue-800">R$ 22.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 1.800,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Cog className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">RPA para Extração de Exames</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Robô para extração automatizada de dados de exames
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Extração de informações de exames dos sistemas</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Preparação de dados para análise pelo Agente de I.A</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Geração de logs de operações</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Valor Estimado:</span>
                                <span className="font-medium text-blue-800">R$ 20.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 1.700,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-bold mb-4">Como os RPAs Transformam Processos</h3>
                          <p className="opacity-90 mb-4">
                            Os Robôs de Automação de Processos (RPAs) são capazes de executar tarefas repetitivas com
                            precisão e velocidade muito superiores aos processos manuais, liberando a equipe para
                            atividades de maior valor.
                          </p>
                          <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Redução de 90% no tempo de processamento</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Eliminação de erros humanos</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Operação 24/7 sem interrupções</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="relative w-full h-48 md:h-64">
                            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl font-bold mb-2">98%</div>
                                <div className="text-sm opacity-80">Precisão na execução de tarefas</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Interfaces Section */}
              <section className="scroll-mt-20" id="interfaces">
                <div
                  className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2"
                  onClick={() => handleSectionClick("interfaces")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("interfaces")}
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    {expandedSections.interfaces ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
                    <LayoutDashboard className="h-7 w-7 inline-block mr-2 text-blue-600" />
                    Interfaces
                  </h2>
                </div>

                {expandedSections.interfaces && (
                  <div className="mt-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <LayoutDashboard className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">
                              Interface para Conhecimento de Auxílio Médico
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Interface inteligente com base de conhecimento médico que rodará no Claude Desktop,
                            consumindo dados dos agentes e utilizando dados de treinamento via MCP.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Integração com Claude Desktop</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Consumo de dados dos agentes</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Treinamento via MCP</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 28.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.500,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <LayoutDashboard className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Interface para Conhecimento Técnico SST</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Interface inteligente com base de conhecimento técnico em Segurança e Saúde no Trabalho,
                            rodando no Claude Desktop e consumindo dados dos agentes.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Base de conhecimento em SST</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Integração com Claude Desktop</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Consumo de dados dos agentes</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 30.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.700,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">Vantagens das Interfaces Inteligentes</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BrainCircuit className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-blue-800">Conhecimento Especializado</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Acesso imediato a conhecimento técnico especializado sem necessidade de consulta a
                            especialistas.
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-blue-800">Tomada de Decisão Assistida</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Suporte à tomada de decisões com base em dados e conhecimento técnico atualizado.
                          </p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium text-blue-800">Democratização do Conhecimento</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Acesso ao conhecimento especializado para todos os colaboradores, independente do nível
                            técnico.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Sistemas Section */}
              <section className="scroll-mt-20" id="sistemas">
                <div
                  className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2"
                  onClick={() => handleSectionClick("sistemas")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("sistemas")}
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    {expandedSections.sistemas ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
                    <Code className="h-7 w-7 inline-block mr-2 text-blue-600" />
                    Sistemas e Aplicativos
                  </h2>
                </div>

                {expandedSections.sistemas && (
                  <div className="mt-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Code className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Aplicativo para PGR</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Aplicativo para equipe comercial realizar mapeamento de estabelecimentos, com captura de
                            fotos, gravação de áudios e geração de relatórios.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Mapeamento completo do estabelecimento</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Captura de fotos e gravação de áudios</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Geração de relatórios detalhados</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 45.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 3.000,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Code className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Aplicativo para Gestão de Treinamento</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Sistema completo para gerenciamento de treinamentos, com agendamento, seleção de instrutores
                            e geração de cobranças no Conta Azul.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Organização de todos os treinamentos</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Agendamento e seleção de instrutores</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Disparo de agendamento via WhatsApp e Gmail</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 40.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.800,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Code className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">Criação do PCMSO</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Sistema para geração do Programa de Controle Médico de Saúde Ocupacional, com base nos dados
                            do PGR.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Geração automatizada de PCMSO</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Integração com dados do PGR</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Documentação completa e conforme legislação</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 38.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.900,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card className="overflow-hidden border-blue-100 hover:shadow-lg transition-all">
                        <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-full">
                              <Code className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-800">KPIs para Gestão Financeira</h3>
                          </div>
                          <p className="text-gray-600 mb-4 text-sm">
                            Dashboard de indicadores para gestão financeira da operação, com monitoramento em tempo real
                            dos principais indicadores financeiros.
                          </p>
                          <div className="space-y-2 mt-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Monitoramento em tempo real</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Integração com todos os sistemas</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-600">Relatórios automatizados e personalizáveis</span>
                            </div>
                          </div>
                          {showValues && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Investimento Inicial:</span>
                                <span className="font-medium text-blue-800">R$ 32.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Custo Mensal:</span>
                                <span className="font-medium text-blue-800">R$ 2.500,00</span>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-xl font-bold mb-4">Integração Total de Sistemas</h3>
                          <p className="opacity-90 mb-4">
                            Todos os sistemas e aplicativos são projetados para funcionar de forma integrada,
                            compartilhando dados e criando um ecossistema digital completo para a MedWork.
                          </p>
                          <div className="space-y-3 mt-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Fluxo de dados contínuo entre sistemas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Eliminação de retrabalho e duplicidade</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-white/20 rounded-full p-1">
                                <CheckCircle2 className="h-4 w-4" />
                              </div>
                              <span>Visão unificada de todos os processos</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="relative w-full h-48 md:h-64">
                            <div className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl font-bold mb-2">360°</div>
                                <div className="text-sm opacity-80">Visão completa do negócio</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </TabsContent>

            {/* Content organized by execution order */}
            <TabsContent value="por-execucao" className="space-y-12">
              <section className="scroll-mt-20" id="implementacao">
                <div
                  className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2"
                  onClick={() => handleSectionClick("implementacao")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("implementacao")}
                >
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
                    {expandedSections.implementacao ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
                    <Cog className="h-7 w-7 inline-block mr-2 text-blue-600" />
                    Plano de Implementação
                  </h2>
                </div>

                {expandedSections.implementacao && (
                  <div className="mt-8 animate-fadeIn">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 mb-8">
                      <h3 className="text-xl font-bold text-blue-800 mb-4">Cronograma de Implementação</h3>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                        <div className="space-y-8">
                          <div className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              1
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-bold text-blue-800 mb-2">Fase 1: Fundação (Mês 2-3)</h4>
                              <p className="text-sm text-gray-600 mb-3">Formação da equipe, configuração dos ambientes de desenvolvimento e implantação das primeiras soluções de automação</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Bot className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">1. Agente Financeiro</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 2-3</p>
                                  <p className="text-xs text-blue-700 mt-1"> R$ 3.000 + 1997/ Mes</p>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Bot className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">2. Agente de Cobrança</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 2-3</p>
                                  <p className="text-xs text-blue-700 mt-1">R$ 3.000 + 1997/ Mes</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              2
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-bold text-blue-800 mb-2">Fase 2: Expansão (Mês 4-6)</h4>
                              <p className="text-sm text-gray-600 mb-3">Ampliação das capacidades analíticas e expansão para novos processos, com implementação de análise avançada de exames</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Bot className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">3. Agente de Verificação de Exames + RPA</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 4-6</p>
                                  <p className="text-xs text-blue-700 mt-1">RPA R$ 5.000 + R$ 3.000 + 1997/ Mes</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              3
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-bold text-blue-800 mb-2">Fase 3: Integração (Mês 6-9)</h4>
                              <p className="text-sm text-gray-600 mb-3">Integração de sistemas e processos para maximizar eficiência operacional e melhorar a experiência do cliente</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Bot className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">4. Agente de Atendimento/Cadastro + RPA</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 6-8</p>
                                  <p className="text-xs text-blue-700 mt-1">RPA R$ 5.000 + R$ 3.000 + 1997/ Mes</p>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">6. Interface para Auxílio Médico e SST</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 9-10</p>
                                  <p className="text-xs text-blue-700 mt-1"> R$ 2997/ Mes</p>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">8. KPIs para Gestão Financeira</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 6-7</p>
                                  <p className="text-xs text-blue-700 mt-1"></p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="relative pl-12">
                            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                              4
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="font-bold text-blue-800 mb-2">Fase 4: Consolidação (Mês 10-14)</h4>
                              <p className="text-sm text-gray-600 mb-3">Implementação de aplicativos avançados e finalização do projeto</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Code className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">5. Aplicativo PGR</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 10-14</p>
                                  <p className="text-xs text-blue-700 mt-1"></p>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Smartphone className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">7. Aplicativo para Gestão de Treinamento</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 10-14</p>
                                  <p className="text-xs text-blue-700 mt-1"></p>
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-blue-100">
                                  <div className="flex items-center gap-2 mb-1">
                                    <FileText className="h-4 w-4 text-blue-600" />
                                    <h5 className="font-medium text-sm">9. Caracterização do PCMSO</h5>
                                  </div>
                                  <p className="text-xs text-gray-600">Mês 11-12</p>
                                  <p className="text-xs text-blue-700 mt-1"></p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Metodologia de Implementação</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full mt-1">
                              <Rocket className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800">Desenvolvimento Ágil</h4>
                              <p className="text-sm text-gray-600">
                                Sprints de 2 semanas com entregas incrementais e validação contínua com usuários.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full mt-1">
                              <Users className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800">Equipe Multidisciplinar</h4>
                              <p className="text-sm text-gray-600">
                                Composição de desenvolvedores, especialistas em negócios e designers UX/UI.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-full mt-1">
                              <CheckCircle2 className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-blue-800">Validação Contínua</h4>
                              <p className="text-sm text-gray-600">
                                Testes com usuários reais ao final de cada sprint para ajustes imediatos.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                        <h3 className="text-xl font-bold mb-4">Recursos Necessários</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Equipe do Projeto</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Gerente de Projeto (1)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Desenvolvedores Front-end (2)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Desenvolvedores Back-end (3)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Especialista em RPA (1)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Especialista em IA/ML (1)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Designer UX/UI (1)</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Infraestrutura</h4>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Servidores para hospedagem dos sistemas</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Ambiente de desenvolvimento e testes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="bg-white/20 rounded-full p-1">
                                  <CheckCircle2 className="h-3 w-3" />
                                </div>
                                <span className="text-sm">Infraestrutura para IA e processamento de dados</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showValues && (
                      <div className="mt-6 bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">Orçamento Total</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-blue-800 mb-2">Investimento Inicial</h4>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-gray-600">Desenvolvimento e implementação:</span>
                              <span className="font-bold text-blue-800">R$ 368.000,00</span>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Agentes de I.A:</span>
                                <span>R$ 113.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">RPAs:</span>
                                <span>R$ 42.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Interfaces:</span>
                                <span>R$ 58.000,00</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Sistemas e Aplicativos:</span>
                                <span>R$ 155.000,00</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800 mb-2">Custos Mensais</h4>
                            <div className="flex justify-between items-center py-2 border-b">
                              <span className="text-gray-600">Manutenção e suporte:</span>
                              <span className="font-bold text-blue-800">R$ 30.900,00/mês</span>
                            </div>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Agentes de I.A:</span>
                                <span>R$ 11.000,00/mês</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">RPAs:</span>
                                <span>R$ 3.500,00/mês</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Interfaces:</span>
                                <span>R$ 5.200,00/mês</span>
                              </div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Sistemas e Aplicativos:</span>
                                <span>R$ 11.200,00/mês</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </TabsContent>
          </Tabs>
        </div>

        {/* Conclusão Section */}

        <section className="mb-12 scroll-mt-20" id="conclusao">
          <div 
            className="flex items-center gap-2 mb-4 cursor-pointer group clickable rounded-lg p-2" 
            onClick={() => handleSectionClick("conclusao")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSectionClick("conclusao")}
          >
            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-110">
              {expandedSections.conclusao ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center">
              Conclusão
            </h2>
          </div>

          {expandedSections.conclusao && (
            <div className="mt-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-bold text-blue-800 mb-4">Resumo da Proposta</h3>
                  <p className="text-gray-600 mb-4">
                    A proposta da Ímpeto AI para a MedWork representa uma transformação digital completa, com soluções
                    integradas que abordam os principais desafios operacionais e estratégicos da empresa.
                  </p>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-gray-600">13 soluções integradas de IA, RPAs, interfaces e sistemas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-gray-600">Implementação em 14 meses com resultados a partir do 3º mês</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-gray-600">Foco nas etapas cruciais para o desenvolvimento</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5" />
                      <span className="text-gray-600">Transformação completa da operação com foco em eficiência</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 shadow-lg text-white">
                  <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/30"></div>
                    <div className="space-y-6">
                      <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Reunião de Alinhamento</h4>
                          <p className="text-sm opacity-80 mt-1">
                            Alinhar expectativas, definir prioridades e estabelecer cronograma detalhado.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Workshop de Requisitos</h4>
                          <p className="text-sm opacity-80 mt-1">
                            Levantamento detalhado de requisitos técnicos e de negócio para cada solução.
                          </p>
                        </div>
                      </div>

                      <div className="relative pl-12">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Início do Projeto</h4>
                          <p className="text-sm opacity-80 mt-1">
                            Formação da equipe, configuração de ambientes e início da Fase 1 de implementação.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
                <h3 className="text-xl font-bold text-blue-800 mb-3">Pronto para Transformar sua Operação?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                  A Ímpeto AI está preparada para iniciar esta jornada de transformação digital com a MedWork, trazendo
                  inovação, eficiência e resultados mensuráveis para o seu negócio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">Agendar Reunião</Button>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Solicitar Mais Informações
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}