"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Star, MapPin, Clock, CalendarIcon, Check, Scissors } from "lucide-react"
import Image from "next/image"

// Dados de exemplo
const profissionais = [
  {
    id: 1,
    nome: "Carlos Silva",
    especialidade: "Barbeiro",
    avaliacao: 4.9,
    cidade: "São Paulo",
    bairro: "Pinheiros",
    endereco: "Rua dos Pinheiros, 123",
    bio: "Especialista em cortes masculinos modernos, com mais de 10 anos de experiência. Formado pela Academia de Barbearia de São Paulo, com cursos de especialização em técnicas americanas e europeias.",
    preco: 80,
    servicos: [
      { nome: "Corte Masculino", preco: 80, duracao: "45 min" },
      { nome: "Barba", preco: 50, duracao: "30 min" },
      { nome: "Corte + Barba", preco: 120, duracao: "1h 15min" },
      { nome: "Sobrancelha", preco: 30, duracao: "15 min" },
      { nome: "Pigmentação", preco: 100, duracao: "1h" },
    ],
    horarios: [
      { dia: "Segunda-feira", horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { dia: "Terça-feira", horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { dia: "Quarta-feira", horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { dia: "Quinta-feira", horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { dia: "Sexta-feira", horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
      { dia: "Sábado", horas: ["09:00", "10:00", "11:00", "14:00"] },
    ],
    avaliacoes: [
      { cliente: "João Silva", data: "10/04/2025", nota: 5, comentario: "Excelente atendimento e corte perfeito!" },
      { cliente: "Pedro Alves", data: "05/04/2025", nota: 5, comentario: "Muito profissional e pontual." },
      { cliente: "Lucas Mendes", data: "01/04/2025", nota: 4, comentario: "Gostei do resultado, recomendo." },
    ],
  },
  // Outros profissionais...
]

export default function ProfissionalDetalhes() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const profissional = profissionais.find((p) => p.id === id) || profissionais[0]

  const [data, setData] = useState<Date | undefined>(new Date())
  const [horario, setHorario] = useState<string>("")
  const [servico, setServico] = useState<string>("")
  const [etapaAgendamento, setEtapaAgendamento] = useState(1)
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(false)

  // Função para avançar no processo de agendamento
  const avancarEtapa = () => {
    if (etapaAgendamento === 3) {
      // Simulação de confirmação de agendamento
      setTimeout(() => {
        setAgendamentoConfirmado(true)
      }, 1500)
    } else {
      setEtapaAgendamento(etapaAgendamento + 1)
    }
  }

  // Função para voltar à etapa anterior
  const voltarEtapa = () => {
    setEtapaAgendamento(etapaAgendamento - 1)
  }

  // Função para reiniciar o agendamento
  const reiniciarAgendamento = () => {
    setData(new Date())
    setHorario("")
    setServico("")
    setEtapaAgendamento(1)
    setAgendamentoConfirmado(false)
  }

  // Encontrar o serviço selecionado
  const servicoSelecionado = profissional.servicos.find((s) => s.nome === servico)

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Button>
          <h1 className="text-2xl font-bold">Perfil do Profissional</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Profissional */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <div className="aspect-square relative">
                      <Image
                        src={`/placeholder.svg?height=300&width=300&text=${profissional.nome}`}
                        alt={profissional.nome}
                        fill
                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-bold">{profissional.nome}</h2>
                      <div className="flex items-center bg-gray-800 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{profissional.avaliacao}</span>
                      </div>
                    </div>
                    <p className="text-purple-400">{profissional.especialidade}</p>
                    <p className="text-gray-400 flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profissional.endereco}, {profissional.bairro}, {profissional.cidade}
                    </p>
                    <div className="mt-4">
                      <p className="text-gray-300">{profissional.bio}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profissional.servicos.map((servico, idx) => (
                        <Badge key={idx} variant="outline" className="bg-gray-800 border-gray-700">
                          {servico.nome}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="servicos" className="mb-8">
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="servicos">Serviços</TabsTrigger>
                <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                <TabsTrigger value="horarios">Horários</TabsTrigger>
              </TabsList>

              <TabsContent value="servicos" className="mt-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Serviços Oferecidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profissional.servicos.map((servico, idx) => (
                        <div key={idx} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                          <div>
                            <h3 className="font-medium">{servico.nome}</h3>
                            <p className="text-sm text-gray-400">Duração: {servico.duracao}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">R${servico.preco}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="avaliacoes" className="mt-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Avaliações de Clientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profissional.avaliacoes.map((avaliacao, idx) => (
                        <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{avaliacao.cliente}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{avaliacao.nota}</span>
                            </div>
                          </div>
                          <p className="text-gray-300">{avaliacao.comentario}</p>
                          <p className="text-sm text-gray-400 mt-2">{avaliacao.data}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="horarios" className="mt-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle>Horários de Atendimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profissional.horarios.map((horario, idx) => (
                        <div key={idx} className="p-4 bg-gray-800 rounded-lg">
                          <h3 className="font-medium mb-2">{horario.dia}</h3>
                          <div className="flex flex-wrap gap-2">
                            {horario.horas.map((hora, i) => (
                              <Badge key={i} variant="outline" className="bg-gray-700 border-gray-600">
                                {hora}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Agendamento */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-20">
              <CardHeader>
                <CardTitle>Agendar Horário</CardTitle>
              </CardHeader>
              <CardContent>
                {!agendamentoConfirmado ? (
                  <div className="space-y-6">
                    {etapaAgendamento === 1 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">1. Escolha o serviço</h3>
                        <Select value={servico} onValueChange={setServico}>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {profissional.servicos.map((s, idx) => (
                              <SelectItem key={idx} value={s.nome}>
                                {s.nome} - R${s.preco}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {servicoSelecionado && (
                          <div className="p-4 bg-gray-800 rounded-lg">
                            <p className="font-medium">{servicoSelecionado.nome}</p>
                            <div className="flex justify-between mt-2">
                              <p className="text-sm text-gray-400">Duração: {servicoSelecionado.duracao}</p>
                              <p className="font-bold">R${servicoSelecionado.preco}</p>
                            </div>
                          </div>
                        )}

                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={avancarEtapa}
                          disabled={!servico}
                        >
                          Continuar
                        </Button>
                      </div>
                    )}

                    {etapaAgendamento === 2 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">2. Escolha a data</h3>
                        <div className="bg-gray-800 p-2 rounded-lg">
                          <Calendar
                            mode="single"
                            selected={data}
                            onSelect={setData}
                            className="border-gray-700"
                            disabled={(date) =>
                              date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                            }
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 border-gray-700" onClick={voltarEtapa}>
                            Voltar
                          </Button>
                          <Button
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            onClick={avancarEtapa}
                            disabled={!data}
                          >
                            Continuar
                          </Button>
                        </div>
                      </div>
                    )}

                    {etapaAgendamento === 3 && (
                      <div className="space-y-4">
                        <h3 className="font-medium">3. Escolha o horário</h3>

                        <Select value={horario} onValueChange={setHorario}>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {profissional.horarios[0].horas.map((hora, idx) => (
                              <SelectItem key={idx} value={hora}>
                                {hora}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {servico && data && horario && (
                          <div className="p-4 bg-gray-800 rounded-lg space-y-2">
                            <h4 className="font-medium">Resumo do agendamento</h4>
                            <p className="flex items-center text-sm">
                              <Scissors className="h-4 w-4 mr-2 text-purple-400" />
                              {servico}
                            </p>
                            <p className="flex items-center text-sm">
                              <CalendarIcon className="h-4 w-4 mr-2 text-purple-400" />
                              {data?.toLocaleDateString("pt-BR")}
                            </p>
                            <p className="flex items-center text-sm">
                              <Clock className="h-4 w-4 mr-2 text-purple-400" />
                              {horario}
                            </p>
                            <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
                              <p className="text-sm">Total:</p>
                              <p className="font-bold">R${servicoSelecionado?.preco || 0}</p>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1 border-gray-700" onClick={voltarEtapa}>
                            Voltar
                          </Button>
                          <Button
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            onClick={avancarEtapa}
                            disabled={!horario}
                          >
                            Confirmar Agendamento
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold">Agendamento Confirmado!</h3>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-2 text-left">
                      <p className="flex items-center text-sm">
                        <Scissors className="h-4 w-4 mr-2 text-purple-400" />
                        {servico}
                      </p>
                      <p className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-2 text-purple-400" />
                        {data?.toLocaleDateString("pt-BR")}
                      </p>
                      <p className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-purple-400" />
                        {horario}
                      </p>
                      <p className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-purple-400" />
                        {profissional.endereco}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Um e-mail de confirmação foi enviado para você com todos os detalhes.
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={reiniciarAgendamento}>
                      Fazer Novo Agendamento
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
