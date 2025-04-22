"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Edit, LogOut, Search, ChevronDown } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { useRouter } from "next/navigation"

// Mock notifications for demo
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Medical form approved",
    description: "Your medical form has been approved by the clinic staff.",
    icon: "✅",
    read: false,
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Appointment reminder",
    description: "You have a scheduled appointment tomorrow at 2:00 PM.",
    icon: "📅",
    read: false,
    time: "1 day ago"
  },
  {
    id: 3,
    title: "Document upload required",
    description: "Please upload your latest vaccination record.",
    icon: "📄",
    read: true,
    time: "3 days ago"
  }
]

export function Header() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Search for:", searchQuery)
  }
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const handleSignOut = () => {
    logout()
    router.push('/auth')
  }
  
  const getInitials = (name: string) => {
    if (!name) return "U"
    const nameParts = name.split(" ")
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <Link href="/student/dashboard" className="flex items-center gap-2">
          <Image 
            src="/images/university-caretech-logo.png" 
            alt="University CareTech Logo" 
            width={32} 
            height={32} 
          />
          <span className="font-semibold text-lg text-blue-600">University CareTech</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 h-9 rounded-md bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </form>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-blue-600 hover:bg-blue-50">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <div className="flex items-center justify-between p-2">
              <h3 className="font-medium text-slate-700">Notifications</h3>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs" 
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                No notifications
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    className={`flex items-start p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="mr-3 text-xl">{notification.icon}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-700">{notification.title}</p>
                      <p className="text-xs text-slate-500">{notification.description}</p>
                      <p className="text-xs text-slate-400">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 px-2 hover:bg-blue-50 hover:text-blue-600"
            >
              <Avatar className="h-8 w-8 border border-blue-200">
                <AvatarImage 
                  src={undefined} 
                  alt={user?.firstName || "User"} 
                />
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {user ? getInitials(`${user.firstName} ${user.lastName}`) : "BF"}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium leading-none text-slate-700">
                  {user ? `${user.firstName} ${user.lastName}` : "Besil Angeline Famat"}
                </p>
                <p className="text-xs text-slate-500 uppercase">
                  {user?.role || "STUDENT"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <Link href="/student/profile">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span className="text-slate-700">Edit Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-500 focus:text-red-500"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
} 