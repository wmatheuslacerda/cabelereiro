"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Scissors, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Dados de exemplo
const agendamentosIniciais = [
  {
    id: 1,
    profissional: {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Barbeiro",
      foto: "/placeholder.svg?height=100&width=100&text=Carlos",
    },
    servico: "Corte Masculino",
    data: "18/04/2025",
    hora: "14:30",
    endereco: "Rua dos Pinheiros, 123, Pinheiros, São Paulo",
    status: "confirmado",
    preco: 80,
  },
  {
    id: 2,
    profissional: {
      id: 2,
      nome: "Ana Oliveira",
      especialidade: "Cabeleireira",
      foto: "/placeholder.svg?height=100&width=100&text=Ana",
    },
    servico: "Coloração",
    data: "25/04/2025",
    hora: "10:00",
    endereco: "Av. Paulista, 1000, Bela Vista, São Paulo",
    status: "confirmado",
    preco: 150,
  },
]

const agendamentosAnteriores = [
  {
    id: 3,
    profissional: {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Barbeiro",
      foto: "/placeholder.svg?height=100&width=100&text=Carlos",
    },
    servico: "Corte Masculino",
    data: "10/03/2025",
    hora: "15:00",
    endereco: "Rua dos Pinheiros, 123, Pinheiros, São Paulo",
    status: "concluido",
    preco: 80,
    avaliado: true,
  },
  {
    id: 4,
    profissional: {
      id: 3,
      nome: "Marcos Santos",
      especialidade: "Barbeiro",
      foto: "/placeholder.svg?height=100&width=100&text=Marcos",
    },
    servico: "Barba",
    data: "01/03/2025",
    hora: "11:30",
    endereco: "Rua Augusta, 500, Consolação, São Paulo",
    status: "concluido",
    preco: 50,
    avaliado: false,
  },
]

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState(agendamentosIniciais)
  const [anteriores, setAnteriores] = useState(agendamentosAnteriores)

  // Função para cancelar agendamento
  const cancelarAgendamento = (id: number) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Meus Agendamentos</h1>

        <Tabs defaultValue="proximos" className="space-y-8">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="proximos">Próximos Agendamentos</TabsTrigger>
            <TabsTrigger value="anteriores">Agendamentos Anteriores</TabsTrigger>
          </TabsList>

          <TabsContent value="proximos">
            {agendamentos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agendamentos.map((agendamento) => (
                  <Card key={agendamento.id} className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{agendamento.servico}</CardTitle>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Confirmado
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={agendamento.profissional.foto || "/placeholder.svg"}
                            alt={agendamento.profissional.nome}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/cliente/profissionais/${agendamento.profissional.id}`}>
                            <h3 className="font-medium hover:text-purple-400 transition-colors">
                              {agendamento.profissional.nome}
                            </h3>
                          </Link>
                          <p className="text-sm text-purple-400">{agendamento.profissional.especialidade}</p>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              {agendamento.data}
                            </p>
                            <p className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              {agendamento.hora}
                            </p>
                            <p className="text-sm flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {agendamento.endereco}
                            </p>
                            <p className="text-sm flex items-center">
                              <Scissors className="h-4 w-4 mr-2 text-gray-400" />
                              R$ {agendamento.preco.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex justify-between">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                              onClick={() => cancelarAgendamento(agendamento.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                            <Link href={`/cliente/profissionais/${agendamento.profissional.id}`}>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                Ver Profissional
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-gray-400 mb-4">Você não possui agendamentos futuros.</p>
                  <Link href="/cliente/profissionais">
                    <Button className="bg-purple-600 hover:bg-purple-700">Encontrar Profissionais</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="anteriores">
            {anteriores.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {anteriores.map((agendamento) => (
                  <Card key={agendamento.id} className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{agendamento.servico}</CardTitle>
                        <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">
                          Concluído
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden">
                          <Image
                            src={agendamento.profissional.foto || "/placeholder.svg"}
                            alt={agendamento.profissional.nome}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link href={`/cliente/profissionais/${agendamento.profissional.id}`}>
                            <h3 className="font-medium hover:text-purple-400 transition-colors">
                              {agendamento.profissional.nome}
                            </h3>
                          </Link>
                          <p className="text-sm text-purple-400">{agendamento.profissional.especialidade}</p>

                          <div className="mt-4 space-y-2">
                            <p className="text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                              {agendamento.data}
                            </p>
                            <p className="text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-gray-400" />
                              {agendamento.hora}
                            </p>
                            <p className="text-sm flex items-center">
                              <Scissors className="h-4 w-4 mr-2 text-gray-400" />
                              R$ {agendamento.preco.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex justify-between">
                            {!agendamento.avaliado ? (
                              <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                                Avaliar Serviço
                              </Button>
                            ) : (
                              <Badge variant="outline" className="bg-gray-800 border-gray-700">
                                Avaliado
                              </Badge>
                            )}
                            <Link href={`/cliente/profissionais/${agendamento.profissional.id}`}>
                              <Button size="sm" variant="outline" className="border-gray-700">
                                Agendar Novamente
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="pt-6 text-center py-12">
                  <p className="text-gray-400">Você não possui agendamentos anteriores.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
