"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { MapPin, Filter, Star, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Dados de exemplo
const profissionaisIniciais = [
  {
    id: 1,
    nome: "Carlos Silva",
    especialidade: "Barbeiro",
    avaliacao: 4.9,
    cidade: "São Paulo",
    bairro: "Pinheiros",
    preco: 80,
    servicos: ["Corte Masculino", "Barba", "Sobrancelha"],
  },
  {
    id: 2,
    nome: "Ana Oliveira",
    especialidade: "Cabeleireira",
    avaliacao: 4.8,
    cidade: "São Paulo",
    bairro: "Vila Mariana",
    preco: 120,
    servicos: ["Corte Feminino", "Coloração", "Hidratação"],
  },
  {
    id: 3,
    nome: "Marcos Santos",
    especialidade: "Barbeiro",
    avaliacao: 4.7,
    cidade: "São Paulo",
    bairro: "Moema",
    preco: 70,
    servicos: ["Corte Masculino", "Barba", "Pigmentação"],
  },
  {
    id: 4,
    nome: "Juliana Costa",
    especialidade: "Cabeleireira",
    avaliacao: 4.9,
    cidade: "São Paulo",
    bairro: "Itaim Bibi",
    preco: 150,
    servicos: ["Corte Feminino", "Mechas", "Tratamentos"],
  },
  {
    id: 5,
    nome: "Roberto Alves",
    especialidade: "Barbeiro",
    avaliacao: 4.6,
    cidade: "São Paulo",
    bairro: "Santana",
    preco: 60,
    servicos: ["Corte Masculino", "Barba"],
  },
  {
    id: 6,
    nome: "Fernanda Lima",
    especialidade: "Cabeleireira",
    avaliacao: 4.7,
    cidade: "São Paulo",
    bairro: "Tatuapé",
    preco: 100,
    servicos: ["Corte Feminino", "Escova", "Penteado"],
  },
  {
    id: 7,
    nome: "Diego Martins",
    especialidade: "Barbeiro",
    avaliacao: 4.8,
    cidade: "São Paulo",
    bairro: "Perdizes",
    preco: 90,
    servicos: ["Corte Masculino", "Barba", "Tratamento Capilar"],
  },
  {
    id: 8,
    nome: "Camila Ferreira",
    especialidade: "Cabeleireira",
    avaliacao: 4.9,
    cidade: "São Paulo",
    bairro: "Jardins",
    preco: 180,
    servicos: ["Corte Feminino", "Coloração", "Tratamentos Especiais"],
  },
]

export default function ProfissionaisPage() {
  const [cidade, setCidade] = useState("São Paulo")
  const [bairro, setBairro] = useState("")
  const [especialidade, setEspecialidade] = useState("")
  const [precoRange, setPrecoRange] = useState([0, 200])
  const [avaliacao, setAvaliacao] = useState(0)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Filtrar profissionais
  const profissionaisFiltrados = profissionaisIniciais.filter((prof) => {
    return (
      prof.cidade.toLowerCase().includes(cidade.toLowerCase()) &&
      (bairro === "" || prof.bairro.toLowerCase().includes(bairro.toLowerCase())) &&
      (especialidade === "" || prof.especialidade === especialidade) &&
      prof.preco >= precoRange[0] &&
      prof.preco <= precoRange[1] &&
      prof.avaliacao >= avaliacao
    )
  })

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Encontre Profissionais</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800 sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Filtros</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setMostrarFiltros(!mostrarFiltros)}
                  >
                    {mostrarFiltros ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>

                <div className={`space-y-6 ${mostrarFiltros ? "block" : "hidden lg:block"}`}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cidade</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Digite sua cidade"
                        className="pl-10 bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bairro</label>
                    <Input
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      placeholder="Digite o bairro"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Especialidade</label>
                    <Select value={especialidade} onValueChange={setEspecialidade}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Todas especialidades" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="todos">Todas especialidades</SelectItem>
                        <SelectItem value="Barbeiro">Barbeiro</SelectItem>
                        <SelectItem value="Cabeleireira">Cabeleireira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Faixa de Preço</label>
                      <span className="text-sm text-gray-400">
                        R${precoRange[0]} - R${precoRange[1]}
                      </span>
                    </div>
                    <Slider
                      value={precoRange}
                      min={0}
                      max={200}
                      step={10}
                      onValueChange={setPrecoRange}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Avaliação Mínima</label>
                    <Select value={avaliacao.toString()} onValueChange={(value) => setAvaliacao(Number(value))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Qualquer avaliação" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="qualquer">Qualquer avaliação</SelectItem>
                        <SelectItem value="3">3+ estrelas</SelectItem>
                        <SelectItem value="4">4+ estrelas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => setMostrarFiltros(false)}>
                    <Filter className="mr-2 h-4 w-4" />
                    Aplicar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Profissionais */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">{profissionaisFiltrados.length} profissionais encontrados</p>
              <Select defaultValue="avaliacao">
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="avaliacao">Melhor avaliação</SelectItem>
                  <SelectItem value="preco_menor">Menor preço</SelectItem>
                  <SelectItem value="preco_maior">Maior preço</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profissionaisFiltrados.length > 0 ? (
                profissionaisFiltrados.map((profissional) => (
                  <Link href={`/cliente/profissionais/${profissional.id}`} key={profissional.id}>
                    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all cursor-pointer h-full">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 relative">
                            <div className="aspect-square relative">
                              <Image
                                src={`/placeholder.svg?height=150&width=150&text=${profissional.nome}`}
                                alt={profissional.nome}
                                fill
                                className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                              />
                            </div>
                          </div>
                          <div className="p-4 md:w-2/3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-lg">{profissional.nome}</h3>
                              <div className="flex items-center bg-gray-800 px-2 py-1 rounded">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-sm">{profissional.avaliacao}</span>
                              </div>
                            </div>
                            <p className="text-purple-400 text-sm">{profissional.especialidade}</p>
                            <p className="text-gray-400 text-sm flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              {profissional.bairro}, {profissional.cidade}
                            </p>
                            <p className="font-medium mt-2">A partir de R${profissional.preco}</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {profissional.servicos.map((servico, idx) => (
                                <Badge key={idx} variant="outline" className="bg-gray-800 border-gray-700">
                                  {servico}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-4">
                              <Link href={`/cliente/profissionais/${profissional.id}`}>
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Agendar Horário
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 bg-gray-900 rounded-lg border border-gray-800">
                  <p className="text-gray-400">Nenhum profissional encontrado com os filtros selecionados.</p>
                  <Button
                    variant="link"
                    className="text-purple-400 mt-2"
                    onClick={() => {
                      setCidade("São Paulo")
                      setBairro("")
                      setEspecialidade("")
                      setPrecoRange([0, 200])
                      setAvaliacao(0)
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
