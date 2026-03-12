"use client"

import Image from "next/image"
import { Book } from "../types/book"

interface BookCardProps {
  book: Book
  onClick: (book: Book) => void
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const { title, authors, imageLinks } = book.volumeInfo
  const thumbnail = imageLinks?.thumbnail?.replace("http://", "https://")

  return (
    <div
      onClick={() => onClick(book)}
      className="bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:ring-2 hover:ring-blue-500 transition-all duration-200"
    >
      <div className="relative w-full h-56 bg-gray-800">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
            Sem capa
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-white text-sm font-semibold line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs mt-1 line-clamp-1">
          {authors?.join(", ") ?? "Autor desconhecido"}
        </p>
      </div>
    </div>
  )
}