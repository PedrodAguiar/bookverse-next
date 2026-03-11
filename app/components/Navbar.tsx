"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="text-white text-xl font-bold">
          BookVerse
        </Link>

        <div className="flex items-center gap-4">
          {status === "loading" && (
            <span className="text-gray-400 text-sm">Carregando...</span>
          )}

          {status === "unauthenticated" && (
            <>
              <Link
                href="/login"
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Cadastrar
              </Link>
            </>
          )}

          {status === "authenticated" && (
            <>
              <Link
                href="/profile"
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Olá, {session.user?.name}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Sair
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}