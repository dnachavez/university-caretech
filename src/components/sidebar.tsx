"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  ChevronDown, ChevronRight, 
  Home, FileText, FolderOpen, 
  FileUp, TestTube, Syringe, LogOut, 
  ChevronLeft, ClipboardList, FileQuestion
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Separator } from "./ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { useAuthStore } from "@/store/auth-store"
import { toast } from "sonner"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
  isCollapsed?: boolean
}

interface SubNavItemProps {
  href: string
  icon?: React.ReactNode
  label: string
  isActive?: boolean
  isCollapsed?: boolean
}

interface NavGroupProps {
  icon: React.ReactNode
  label: string
  defaultOpen?: boolean
  isCollapsed?: boolean
  children: React.ReactNode
}

const NavItem = ({ href, icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Link href={href} className="w-full">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 h-10 px-3",
                isActive 
                  ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              {icon}
              {!isCollapsed && <span className="text-slate-700">{label}</span>}
            </Button>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              {label}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Link>
  )
}

const SubNavItem = ({ href, icon, label, isActive, isCollapsed }: SubNavItemProps) => {
  if (isCollapsed) return null
  
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3 h-9 text-sm pl-12",
          isActive 
            ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
            : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        )}
      >
        {icon && icon}
        <span className="text-slate-700">{label}</span>
      </Button>
    </Link>
  )
}

const NavGroup = ({ 
  icon, 
  label, 
  defaultOpen = false, 
  isCollapsed = false,
  children 
}: NavGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 px-3 h-10 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            >
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between gap-2 px-3 h-10 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-slate-700">{label}</span>
          </div>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1 space-y-1 pl-2 border-l border-blue-100 ml-6">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleSignOut = () => {
    logout()
    toast.success("You have been signed out successfully")
    router.push("/auth")
  }

  return (
    <div 
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1.5">
        <NavItem 
          href="/student/dashboard" 
          icon={<Home className="h-5 w-5 text-blue-600" />} 
          label="Dashboard" 
          isActive={pathname === "/student/dashboard"} 
          isCollapsed={isCollapsed}
        />
        
        <NavGroup 
          icon={<FileText className="h-5 w-5 text-blue-600" />} 
          label="My Forms" 
          isCollapsed={isCollapsed}
          defaultOpen={pathname.includes("/student/forms")}
        >
          <SubNavItem 
            href="/student/forms/new" 
            icon={<FileUp className="h-4 w-4 text-blue-600" />}
            label="New Form" 
            isActive={pathname === "/student/forms/new"} 
            isCollapsed={isCollapsed}
          />
          <SubNavItem 
            href="/student/forms/upload" 
            icon={<FileUp className="h-4 w-4 text-blue-600" />}
            label="Scan and Upload Form" 
            isActive={pathname === "/student/forms/upload"} 
            isCollapsed={isCollapsed}
          />
        </NavGroup>
        
        <NavGroup 
          icon={<FolderOpen className="h-5 w-5 text-blue-600" />} 
          label="Medical Records" 
          isCollapsed={isCollapsed}
          defaultOpen={pathname.includes("/student/medical")}
        >
          <SubNavItem 
            href="/student/medical/history" 
            icon={<ClipboardList className="h-4 w-4 text-blue-600" />}
            label="Medical History" 
            isActive={pathname === "/student/medical/history"} 
            isCollapsed={isCollapsed}
          />
          <SubNavItem 
            href="/student/medical/lab-results" 
            icon={<TestTube className="h-4 w-4 text-blue-600" />}
            label="Lab Results" 
            isActive={pathname === "/student/medical/lab-results"} 
            isCollapsed={isCollapsed}
          />
          <SubNavItem 
            href="/student/medical/immunization" 
            icon={<Syringe className="h-4 w-4 text-blue-600" />}
            label="Immunization" 
            isActive={pathname === "/student/medical/immunization"} 
            isCollapsed={isCollapsed}
          />
          <SubNavItem 
            href="/student/medical/others" 
            icon={<FileQuestion className="h-4 w-4 text-blue-600" />}
            label="Others" 
            isActive={pathname === "/student/medical/others"} 
            isCollapsed={isCollapsed}
          />
        </NavGroup>
      </div>
      
      <div className="p-2">
        <Separator className="my-2" />
        <Button 
          variant="ghost" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-start gap-2 px-3 h-10 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-blue-600" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600">Collapse</span>
            </>
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={handleSignOut}
          className="w-full justify-start gap-2 px-3 h-10 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  )
} 