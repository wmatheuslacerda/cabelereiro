import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Scissors, Calendar, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/clientes/novo">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Users className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-gray-400">+5 no último mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cortes Realizados</CardTitle>
            <Scissors className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-400">+28 no último mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-gray-400">Para os próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Simulações de IA</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-gray-400">+12 na última semana</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recentes" className="space-y-4">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="recentes">Clientes Recentes</TabsTrigger>
          <TabsTrigger value="agendamentos">Próximos Agendamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="recentes" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Clientes Recentes</CardTitle>
              <CardDescription>Últimos 5 clientes cadastrados na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { nome: "Ana Silva", telefone: "(11) 98765-4321", data: "12/04/2025", tipo: "Cacheado" },
                  { nome: "Carlos Oliveira", telefone: "(11) 91234-5678", data: "10/04/2025", tipo: "Liso" },
                  { nome: "Mariana Santos", telefone: "(11) 99876-5432", data: "08/04/2025", tipo: "Ondulado" },
                  { nome: "Pedro Costa", telefone: "(11) 95555-1234", data: "05/04/2025", tipo: "Crespo" },
                  { nome: "Juliana Lima", telefone: "(11) 97777-8888", data: "02/04/2025", tipo: "Liso" },
                ].map((cliente, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800">
                    <div>
                      <div className="font-medium">{cliente.nome}</div>
                      <div className="text-sm text-gray-400">{cliente.telefone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Cadastrado em: {cliente.data}</div>
                      <div className="text-sm">Tipo de cabelo: {cliente.tipo}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agendamentos" className="space-y-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Agendamentos para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { nome: "Fernanda Gomes", servico: "Corte e Coloração", data: "18/04/2025", hora: "14:30" },
                  { nome: "Ricardo Alves", servico: "Corte Masculino", data: "18/04/2025", hora: "16:00" },
                  { nome: "Camila Dias", servico: "Hidratação", data: "19/04/2025", hora: "10:00" },
                  { nome: "Bruno Martins", servico: "Barba e Cabelo", data: "19/04/2025", hora: "11:30" },
                  { nome: "Luciana Ferreira", servico: "Coloração", data: "20/04/2025", hora: "15:00" },
                ].map((agendamento, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-800">
                    <div>
                      <div className="font-medium">{agendamento.nome}</div>
                      <div className="text-sm text-gray-400">{agendamento.servico}</div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-sm">
                        {agendamento.data} às {agendamento.hora}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
