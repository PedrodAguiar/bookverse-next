import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
        return NextResponse.json(
            { error: "Preencha todos os campos" },
            { status: 400 }
        )
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        return NextResponse.json(
            { error: "Email já cadastrado" },
            { status: 400 }
        )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
        data: { name, email, password: hashedPassword },
    })

    return NextResponse.json({ message: "Usuário criado com sucesso" })
}