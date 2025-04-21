"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ReactNode } from "react"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  description: string
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(to bottom, #dcebf5, #f5fafa)",
      }}
    >
      <Card className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Column - Branding */}
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/university-caretech-logo.png"
              alt="University CareTech Logo"
              width={250}
              height={250}
              className="mb-6"
            />
            <p className="text-center text-[#5b6779] max-w-xs font-medium mb-6 text-xl">
              An Independent Web-based Information System for School Clinics
            </p>

            <div className="bg-[#f0f4f9] rounded-xl p-6 text-center w-full max-w-sm border border-[#dde5f0]">
              <h2 className="text-[#5b6779] text-xl font-medium mb-3">{title}</h2>
              <p className="text-[#5b6779] text-sm">{description}</p>
            </div>
          </div>

          {/* Second Column - Content */}
          <div className="bg-[#f5fafa] rounded-lg flex items-center justify-center p-4">
            <Card className="w-full p-6 shadow-sm bg-[#f5f5ff]">
              {children}
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
} 