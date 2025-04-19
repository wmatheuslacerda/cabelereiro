"use client"

import { Input } from "@/components/ui/input"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Camera, Upload, Wand2, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function SimulacaoPage() {
  const [activeTab, setActiveTab] = useState("foto")
  const [fotoSelecionada, setFotoSelecionada] = useState<string | null>(null)
  const [estiloSelecionado, setEstiloSelecionado] = useState("")
  const [corSelecionada, setCorSelecionada] = useState("")
  const [simulacaoGerada, setSimulacaoGerada] = useState<string | null>(null)
  const [intensidade, setIntensidade] = useState([50])
  const [carregando, setCarregando] = useState(false)
  const [mostrarChat, setMostrarChat] = useState(false)

  // Função para simular upload de foto
  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulando URL da imagem
      setFotoSelecionada("/placeholder.svg?height=400&width=300")
    }
  }

  // Função para simular tirar foto
  const handleTirarFoto = () => {
    // Simulando URL da imagem
    setFotoSelecionada("/placeholder.svg?height=400&width=300")
  }

  // Função para gerar simulação
  const handleGerarSimulacao = () => {
    if (!fotoSelecionada || !estiloSelecionado) return

    setCarregando(true)

    // Simulando processamento da IA
    setTimeout(() => {
      setSimulacaoGerada("/placeholder.svg?height=400&width=300")
      setCarregando(false)
    }, 2000)
  }

  // Função para iniciar chat com IA
  const handleIniciarChat = () => {
    setMostrarChat(true)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Simulação de Corte</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Foto do Cliente</CardTitle>
            <CardDescription>Tire uma foto ou faça upload de uma imagem para começar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                <TabsTrigger value="foto">Tirar Foto</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="foto" className="mt-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  {!fotoSelecionada ? (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-sm text-gray-400 text-center mb-4">
                        Clique no botão abaixo para ativar a câmera e tirar uma foto
                      </p>
                      <Button onClick={handleTirarFoto} className="bg-purple-600 hover:bg-purple-700">
                        <Camera className="mr-2 h-4 w-4" />
                        Tirar Foto
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={fotoSelecionada || "/placeholder.svg"}
                        alt="Foto do cliente"
                        width={300}
                        height={400}
                        className="rounded-lg object-cover"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/80 border-gray-700"
                        onClick={() => setFotoSelecionada(null)}
                      >
                        Remover
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="mt-4">
                <div className="flex flex-col items-center justify-center space-y-4">
                  {!fotoSelecionada ? (
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center">
                      <Upload className="h-12 w-12 text-gray-500 mb-4" />
                      <p className="text-sm text-gray-400 text-center mb-4">
                        Arraste e solte uma imagem aqui ou clique para selecionar
                      </p>
                      <div>
                        <input
                          type="file"
                          id="foto-upload"
                          accept="image/*"
                          className="hidden"
                          onChange={handleUploadFoto}
                        />
                        <label htmlFor="foto-upload">
                          <Button asChild className="bg-purple-600 hover:bg-purple-700">
                            <span>
                              <Upload className="mr-2 h-4 w-4" />
                              Selecionar Imagem
                            </span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Image
                        src={fotoSelecionada || "/placeholder.svg"}
                        alt="Foto do cliente"
                        width={300}
                        height={400}
                        className="rounded-lg object-cover"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-gray-800/80 hover:bg-gray-700/80 border-gray-700"
                        onClick={() => setFotoSelecionada(null)}
                      >
                        Remover
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Opções de Estilo</CardTitle>
            <CardDescription>Escolha o estilo de corte e cor para a simulação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="estilo">Estilo de Corte</Label>
              <Select value={estiloSelecionado} onValueChange={setEstiloSelecionado} disabled={!fotoSelecionada}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione um estilo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="curto">Curto</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="longo">Longo</SelectItem>
                  <SelectItem value="pixie">Pixie</SelectItem>
                  <SelectItem value="bob">Bob</SelectItem>
                  <SelectItem value="undercut">Undercut</SelectItem>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="pompadour">Pompadour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cor">Cor do Cabelo</Label>
              <Select value={corSelecionada} onValueChange={setCorSelecionada} disabled={!fotoSelecionada}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Selecione uma cor" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="loiro">Loiro</SelectItem>
                  <SelectItem value="castanho">Castanho</SelectItem>
                  <SelectItem value="preto">Preto</SelectItem>
                  <SelectItem value="ruivo">Ruivo</SelectItem>
                  <SelectItem value="platinado">Platinado</SelectItem>
                  <SelectItem value="azul">Azul</SelectItem>
                  <SelectItem value="rosa">Rosa</SelectItem>
                  <SelectItem value="verde">Verde</SelectItem>
                  <SelectItem value="roxo">Roxo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="intensidade">Intensidade</Label>
                <span className="text-sm text-gray-400">{intensidade[0]}%</span>
              </div>
              <Slider
                id="intensidade"
                value={intensidade}
                onValueChange={setIntensidade}
                min={0}
                max={100}
                step={1}
                disabled={!fotoSelecionada}
                className="py-2"
              />
            </div>

            <Button
              onClick={handleGerarSimulacao}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!fotoSelecionada || !estiloSelecionado || carregando}
            >
              {carregando ? (
                "Gerando simulação..."
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Gerar Simulação
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {simulacaoGerada && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Resultado da Simulação</CardTitle>
            <CardDescription>Visualize o resultado da simulação de corte com IA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium mb-4">Foto Original</h3>
                <Image
                  src={fotoSelecionada || "/placeholder.svg"}
                  alt="Foto original"
                  width={300}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium mb-4">Simulação</h3>
                <Image
                  src={simulacaoGerada || "/placeholder.svg"}
                  alt="Simulação de corte"
                  width={300}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleIniciarChat}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={mostrarChat}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Conversar com IA sobre este estilo
            </Button>
          </CardFooter>
        </Card>
      )}

      {mostrarChat && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Consultoria com IA</CardTitle>
            <CardDescription>Converse com nossa IA para obter dicas e sugestões personalizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-800 rounded-lg">
              <div className="flex gap-3">
                <div className="bg-purple-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">
                  IA
                </div>
                <div className="bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p>
                    Olá! Estou analisando a simulação do seu corte. O que você achou do resultado? Posso ajudar com
                    dicas de manutenção ou sugerir outros estilos que combinariam com o seu tipo de rosto.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-purple-500/20 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                  <p>Gostei do resultado! Você pode me dar dicas de como manter esse corte?</p>
                </div>
                <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">
                  EU
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-purple-600 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">
                  IA
                </div>
                <div className="bg-gray-700 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                  <p>Claro! Para manter esse corte em boas condições, recomendo:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Agende retoques a cada 4-6 semanas para manter a forma</li>
                    <li>Use produtos específicos para o seu tipo de cabelo</li>
                    <li>Aplique protetor térmico antes de usar secador ou chapinha</li>
                    <li>Hidrate o cabelo semanalmente com máscaras capilares</li>
                  </ul>
                  <p className="mt-2">Você tem alguma dúvida específica sobre produtos ou técnicas de styling?</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Input placeholder="Digite sua mensagem..." className="bg-gray-800 border-gray-700" />
              <Button className="bg-purple-600 hover:bg-purple-700">Enviar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
