"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  currentPage: string
  baseUrl?: string
}

export function PageHeader({ title, description, currentPage, baseUrl = "/student" }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-700">{title}</h1>
        <p className="text-gray-500">
          {description}
        </p>
      </div>
      <nav className="flex items-center text-sm text-gray-500">
        <Link href={`${baseUrl}/dashboard`} className="hover:text-blue-600">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href={`${baseUrl}/medical`} className="hover:text-blue-600">
          Medical
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-700 font-medium">{currentPage}</span>
      </nav>
    </div>
  )
} 