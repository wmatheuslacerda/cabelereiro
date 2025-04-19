"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Camera, Download, Check } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

// Dados de exemplo
const profissionais = [
  { id: 1, nome: "Carlos Silva", especialidade: "Barbeiro" },
  { id: 2, nome: "Ana Oliveira", especialidade: "Cabeleireira" },
  { id: 3, nome: "Marcos Santos", especialidade: "Barbeiro" },
  { id: 4, nome: "Juliana Costa", especialidade: "Cabeleireira" },
]

const horarios = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

export default function ClienteHome() {
  const [activeTab, setActiveTab] = useState("agendamento")

  // Estados para agendamento
  const [profissionalSelecionado, setProfissionalSelecionado] = useState("")
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(undefined)
  const [horarioSelecionado, setHorarioSelecionado] = useState("")
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [agendamentoConfirmado, setAgendamentoConfirmado] = useState(false)

  // Estados para simulação
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null)
  const [estiloSelecionado, setEstiloSelecionado] = useState("")
  const [corSelecionada, setCorSelecionada] = useState("")
  const [simulacaoGerada, setSimulacaoGerada] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const [permissaoCamera, setPermissaoCamera] = useState<boolean | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [promptPersonalizado, setPromptPersonalizado] = useState("")

  // Função para confirmar agendamento
  const confirmarAgendamento = () => {
    if (!profissionalSelecionado || !dataSelecionada || !horarioSelecionado || !nome || !whatsapp) {
      alert("Por favor, preencha todos os campos")
      return
    }

    // Simulação de confirmação
    setTimeout(() => {
      setAgendamentoConfirmado(true)
    }, 1000)
  }

  // Função para reiniciar agendamento
  const reiniciarAgendamento = () => {
    setProfissionalSelecionado("")
    setDataSelecionada(undefined)
    setHorarioSelecionado("")
    setNome("")
    setWhatsapp("")
    setAgendamentoConfirmado(false)
  }

  // Função para solicitar acesso à câmera
  const solicitarAcessoCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setPermissaoCamera(true)
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error)
      setPermissaoCamera(false)
    }
  }

  // Função para capturar foto da câmera
  const capturarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Definir dimensões do canvas para corresponder ao vídeo
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Desenhar o frame atual do vídeo no canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Converter para URL de dados
      const dataUrl = canvas.toDataURL("image/png")
      setFotoSelecionada(dataUrl)

      // Parar a câmera
      const stream = video.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      video.srcObject = null
    }
  }

  // Função para gerar simulação
  const gerarSimulacao = () => {
    if (!fotoSelecionada || (!promptPersonalizado && !estiloSelecionado)) return

    setCarregando(true)

    // Aqui seria a integração real com o ChatGPT
    // Enviando a imagem e o prompt personalizado ou o estilo selecionado
    console.log("Enviando para o ChatGPT:")
    console.log("- Imagem capturada")
    console.log("- Prompt:", promptPersonalizado || `Corte de cabelo ${estiloSelecionado} ${corSelecionada || ""}`)

    // Simulando processamento da IA
    setTimeout(() => {
      setSimulacaoGerada(fotoSelecionada) // Na versão real, seria uma imagem modificada
      setCarregando(false)
    }, 2000)
  }

  // Função para salvar imagem
  const salvarImagem = () => {
    if (!simulacaoGerada) return

    // Criar um link para download
    const link = document.createElement("a")
    link.href = simulacaoGerada
    link.download = `simulacao-corte-${new Date().getTime()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            HairSync <span className="text-purple-500">Pro</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Agende seu corte e experimente novos visuais com nossa tecnologia de IA
          </p>
        </div>
      </section>

      {/* Tabs para Agendamento e Simulação */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="agendamento" className="text-lg py-3">
                <MapPin className="mr-2 h-5 w-5" />
                Agendar Corte
              </TabsTrigger>
              <TabsTrigger value="simulacao" className="text-lg py-3">
                <Camera className="mr-2 h-5 w-5" />
                Simular Corte
              </TabsTrigger>
            </TabsList>

            {/* Conteúdo da Aba de Agendamento */}
            <TabsContent value="agendamento">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl">Agende seu Corte</CardTitle>
                </CardHeader>
                <CardContent>
                  {!agendamentoConfirmado ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Selecione o Profissional</label>
                        <Select value={profissionalSelecionado} onValueChange={setProfissionalSelecionado}>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Escolha um profissional" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {profissionais.map((prof) => (
                              <SelectItem key={prof.id} value={prof.nome}>
                                {prof.nome} - {prof.especialidade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Selecione a Data</label>
                        <div className="bg-gray-800 p-2 rounded-lg">
                          <Calendar
                            mode="single"
                            selected={dataSelecionada}
                            onSelect={setDataSelecionada}
                            className="border-gray-700"
                            disabled={(date) =>
                              date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Selecione o Horário</label>
                        <Select value={horarioSelecionado} onValueChange={setHorarioSelecionado}>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue placeholder="Escolha um horário" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {horarios.map((horario) => (
                              <SelectItem key={horario} value={horario}>
                                {horario}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Seu Nome Completo</label>
                        <Input
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Seu WhatsApp</label>
                        <Input
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>

                      <Button
                        onClick={confirmarAgendamento}
                        className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
                      >
                        Confirmar Agendamento
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 py-8">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Check className="h-10 w-10 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold">Agendamento Confirmado!</h3>
                      <div className="bg-gray-800 p-6 rounded-lg text-left space-y-3 max-w-md mx-auto">
                        <p>
                          <span className="font-medium">Profissional:</span> {profissionalSelecionado}
                        </p>
                        <p>
                          <span className="font-medium">Data:</span> {dataSelecionada?.toLocaleDateString("pt-BR")}
                        </p>
                        <p>
                          <span className="font-medium">Horário:</span> {horarioSelecionado}
                        </p>
                        <p>
                          <span className="font-medium">Nome:</span> {nome}
                        </p>
                        <p>
                          <span className="font-medium">WhatsApp:</span> {whatsapp}
                        </p>
                      </div>
                      <p className="text-gray-400">
                        O profissional entrará em contato pelo WhatsApp para confirmar seu agendamento.
                      </p>
                      <Button onClick={reiniciarAgendamento} className="bg-purple-600 hover:bg-purple-700">
                        Fazer Novo Agendamento
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Conteúdo da Aba de Simulação */}
            <TabsContent value="simulacao">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl">Simule seu Corte com IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Seção de Captura de Foto */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">1. Tire uma Foto</h3>

                      {!fotoSelecionada ? (
                        permissaoCamera ? (
                          <div className="space-y-4">
                            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-lg bg-black">
                              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                            </div>
                            <Button onClick={capturarFoto} className="w-full bg-purple-600 hover:bg-purple-700">
                              <Camera className="mr-2 h-4 w-4" />
                              Capturar Foto
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
                            <Camera className="h-12 w-12 text-gray-500 mb-4" />
                            <p className="text-sm text-gray-400 text-center mb-4">
                              Clique no botão abaixo para ativar a câmera e tirar uma foto
                            </p>
                            <Button onClick={solicitarAcessoCamera} className="bg-purple-600 hover:bg-purple-700">
                              <Camera className="mr-2 h-4 w-4" />
                              Ativar Câmera
                            </Button>
                          </div>
                        )
                      ) : (
                        <div className="relative max-w-md mx-auto">
                          <Image
                            src={fotoSelecionada || "/placeholder.svg"}
                            alt="Foto capturada"
                            width={300}
                            height={400}
                            className="rounded-lg object-cover mx-auto"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/80 border-gray-700"
                            onClick={() => {
                              setFotoSelecionada(null)
                              setPermissaoCamera(false)
                              setSimulacaoGerada(null)
                            }}
                          >
                            Remover
                          </Button>
                        </div>
                      )}
                      <canvas ref={canvasRef} className="hidden" />
                    </div>

                    {/* Seção de Descrição do Corte Desejado */}
                    {fotoSelecionada && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">2. Descreva como quer seu cabelo</h3>
                        <div className="space-y-2">
                          <textarea
                            value={promptPersonalizado}
                            onChange={(e) => setPromptPersonalizado(e.target.value)}
                            placeholder="Descreva como você gostaria que seu cabelo ficasse. Ex: 'Quero um corte curto estilo undercut com a parte de cima mais longa' ou 'Gostaria de ver como ficaria com cabelo platinado e franja lateral'"
                            className="w-full h-32 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                          />
                          <p className="text-sm text-gray-400">
                            Seja específico sobre o estilo, comprimento e cor desejados para obter melhores resultados.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Você ainda pode manter as opções de estilo e cor como referência rápida */}
                    {fotoSelecionada && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">3. Ou selecione um estilo predefinido</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {["Curto", "Médio", "Longo", "Pixie", "Bob", "Undercut", "Fade", "Pompadour"].map(
                            (estilo) => (
                              <div
                                key={estilo}
                                className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
                                  estiloSelecionado === estilo.toLowerCase()
                                    ? "bg-purple-600"
                                    : "bg-gray-800 hover:bg-gray-700"
                                }`}
                                onClick={() => setEstiloSelecionado(estilo.toLowerCase())}
                              >
                                {estilo}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Seção de Escolha de Cor */}
                    {fotoSelecionada && estiloSelecionado && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">3. Escolha a Cor</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {[
                            { nome: "Natural", cor: "bg-amber-800" },
                            { nome: "Loiro", cor: "bg-yellow-300" },
                            { nome: "Castanho", cor: "bg-amber-900" },
                            { nome: "Preto", cor: "bg-gray-900" },
                            { nome: "Ruivo", cor: "bg-red-600" },
                            { nome: "Platinado", cor: "bg-gray-200" },
                            { nome: "Azul", cor: "bg-blue-500" },
                            { nome: "Rosa", cor: "bg-pink-500" },
                            { nome: "Verde", cor: "bg-green-500" },
                            { nome: "Roxo", cor: "bg-purple-500" },
                          ].map((cor) => (
                            <div
                              key={cor.nome}
                              className={`flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                                corSelecionada === cor.nome.toLowerCase()
                                  ? "bg-gray-700 ring-2 ring-purple-500"
                                  : "bg-gray-800 hover:bg-gray-700"
                              }`}
                              onClick={() => setCorSelecionada(cor.nome.toLowerCase())}
                            >
                              <div className={`w-8 h-8 rounded-full ${cor.cor}`}></div>
                              <span className="text-sm">{cor.nome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Botão de Gerar Simulação */}
                    {fotoSelecionada && (promptPersonalizado || estiloSelecionado) && (
                      <Button
                        onClick={gerarSimulacao}
                        className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-lg"
                        disabled={carregando}
                      >
                        {carregando ? "Gerando simulação..." : "Gerar Simulação com ChatGPT"}
                      </Button>
                    )}

                    {/* Resultado da Simulação */}
                    {simulacaoGerada && (
                      <div className="space-y-6 pt-4 border-t border-gray-800">
                        <h3 className="text-xl font-medium">Resultado da Simulação</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <p className="text-center font-medium">Foto Original</p>
                            <Image
                              src={fotoSelecionada || "/placeholder.svg"}
                              alt="Foto original"
                              width={300}
                              height={400}
                              className="rounded-lg object-cover mx-auto"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-center font-medium">Simulação</p>
                            <Image
                              src={simulacaoGerada || "/placeholder.svg"}
                              alt="Simulação de corte"
                              width={300}
                              height={400}
                              className="rounded-lg object-cover mx-auto"
                            />
                          </div>
                        </div>
                        <Button onClick={salvarImagem} className="w-full bg-green-600 hover:bg-green-700">
                          <Download className="mr-2 h-4 w-4" />
                          Salvar Imagem Gratuitamente
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Seção de Profissionais */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Profissionais</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {profissionais.map((profissional, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=${profissional.nome}`}
                      alt={profissional.nome}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{profissional.nome}</h3>
                    <p className="text-gray-400">{profissional.especialidade}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
