"use client"

import { ReactNode } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface StudentLayoutProps {
  children: ReactNode
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
} 