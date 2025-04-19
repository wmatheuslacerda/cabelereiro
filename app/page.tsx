import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Users, MessageSquare, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">HairSync Pro</span>
          </div>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href="/cadastro">
              <Button className="bg-purple-600 hover:bg-purple-700">Cadastrar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Revolucione seu <span className="text-purple-500">Salão</span> com Inteligência Artificial
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            Gerencie clientes, simule cortes com IA e ofereça consultoria personalizada em uma única plataforma.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6">
              Começar Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Funcionalidades Principais</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <Users className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Cadastro de Clientes</h3>
              <p className="text-gray-400">
                Gerencie perfis completos dos seus clientes com histórico de cortes, preferências e observações
                personalizadas.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <Scissors className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Simulação de Cortes</h3>
              <p className="text-gray-400">
                Permita que seus clientes visualizem diferentes estilos e cores antes de realizar o corte, com simulação
                realista por IA.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
              <MessageSquare className="h-12 w-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">Consultoria com IA</h3>
              <p className="text-gray-400">
                Ofereça dicas personalizadas, sugestões de cortes e responda dúvidas com nossa integração de chat
                inteligente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu negócio?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já estão usando o HairSync Pro para elevar a experiência dos seus
            clientes.
          </p>
          <Link href="/cadastro">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-8">
              Experimente Grátis por 14 Dias
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Scissors className="h-5 w-5 text-purple-500" />
              <span className="font-bold">HairSync Pro</span>
            </div>
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} HairSync Pro. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
