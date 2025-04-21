"use client"

import { ReactNode } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
} 