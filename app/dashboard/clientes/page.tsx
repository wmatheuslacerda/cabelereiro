"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, ChevronLeft, ChevronRight, Filter } from "lucide-react"

// Dados de exemplo
const clientesIniciais = [
  {
    id: 1,
    nome: "Ana Silva",
    telefone: "(11) 98765-4321",
    email: "ana.silva@email.com",
    tipoCabelo: "Cacheado",
    ultimoCorte: "10/03/2025",
  },
  {
    id: 2,
    nome: "Carlos Oliveira",
    telefone: "(11) 91234-5678",
    email: "carlos.oliveira@email.com",
    tipoCabelo: "Liso",
    ultimoCorte: "15/03/2025",
  },
  {
    id: 3,
    nome: "Mariana Santos",
    telefone: "(11) 99876-5432",
    email: "mariana.santos@email.com",
    tipoCabelo: "Ondulado",
    ultimoCorte: "20/03/2025",
  },
  {
    id: 4,
    nome: "Pedro Costa",
    telefone: "(11) 95555-1234",
    email: "pedro.costa@email.com",
    tipoCabelo: "Crespo",
    ultimoCorte: "25/03/2025",
  },
  {
    id: 5,
    nome: "Juliana Lima",
    telefone: "(11) 97777-8888",
    email: "juliana.lima@email.com",
    tipoCabelo: "Liso",
    ultimoCorte: "01/04/2025",
  },
  {
    id: 6,
    nome: "Roberto Alves",
    telefone: "(11) 96666-9999",
    email: "roberto.alves@email.com",
    tipoCabelo: "Ondulado",
    ultimoCorte: "05/04/2025",
  },
  {
    id: 7,
    nome: "Fernanda Gomes",
    telefone: "(11) 94444-3333",
    email: "fernanda.gomes@email.com",
    tipoCabelo: "Cacheado",
    ultimoCorte: "08/04/2025",
  },
  {
    id: 8,
    nome: "Ricardo Dias",
    telefone: "(11) 93333-2222",
    email: "ricardo.dias@email.com",
    tipoCabelo: "Liso",
    ultimoCorte: "10/04/2025",
  },
]

export default function ClientesPage() {
  const [clientes, setClientes] = useState(clientesIniciais)
  const [busca, setBusca] = useState("")
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  // Filtrar clientes com base na busca
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.telefone.includes(busca),
  )

  // Calcular paginação
  const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina)
  const clientesPaginados = clientesFiltrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina)

  // Função para excluir cliente
  const excluirCliente = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      setClientes(clientes.filter((cliente) => cliente.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <Link href="/dashboard/clientes/novo">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Gerenciar Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Buscar por nome, email ou telefone..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-8 bg-gray-800 border-gray-700"
              />
            </div>
            <Button variant="outline" className="border-gray-700">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 bg-gray-900">
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo de Cabelo</TableHead>
                  <TableHead className="hidden md:table-cell">Último Corte</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesPaginados.length > 0 ? (
                  clientesPaginados.map((cliente) => (
                    <TableRow key={cliente.id} className="hover:bg-gray-800/50">
                      <TableCell className="font-medium">{cliente.nome}</TableCell>
                      <TableCell className="hidden md:table-cell">{cliente.telefone}</TableCell>
                      <TableCell className="hidden md:table-cell">{cliente.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="border-purple-500 text-purple-500">
                          {cliente.tipoCabelo}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{cliente.ultimoCorte}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/dashboard/clientes/${cliente.id}`}>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => excluirCliente(cliente.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          {clientesFiltrados.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-400">
                Mostrando {Math.min(clientesFiltrados.length, (paginaAtual - 1) * itensPorPagina + 1)} a{" "}
                {Math.min(clientesFiltrados.length, paginaAtual * itensPorPagina)} de {clientesFiltrados.length}{" "}
                clientes
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                  disabled={paginaAtual === 1}
                  className="border-gray-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Página anterior</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaAtual === totalPaginas}
                  className="border-gray-700"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Próxima página</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
