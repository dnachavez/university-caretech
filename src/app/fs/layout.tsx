"use client"

import { ReactNode } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface FacultyStaffLayoutProps {
  children: ReactNode
}

export default function FacultyStaffLayout({ children }: FacultyStaffLayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>
} 