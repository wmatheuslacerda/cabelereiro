import Link from "next/link"
import { Scissors } from "lucide-react"

export default function ClienteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scissors className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-lg">HairSync Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforme sua experiência de beleza com tecnologia de ponta e profissionais qualificados.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Para Clientes</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/cliente/profissionais" className="hover:text-purple-400 transition-colors">
                  Encontrar Profissionais
                </Link>
              </li>
              <li>
                <Link href="/cliente/simulacao" className="hover:text-purple-400 transition-colors">
                  Simulação de Corte
                </Link>
              </li>
              <li>
                <Link href="/cliente/agendamentos" className="hover:text-purple-400 transition-colors">
                  Meus Agendamentos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Para Profissionais</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/cadastro" className="hover:text-purple-400 transition-colors">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-purple-400 transition-colors">
                  Acesso ao Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Planos e Preços
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Suporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-purple-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} HairSync Pro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
