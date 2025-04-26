"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bell, Edit, LogOut, Search, ChevronDown, FileText, Calendar, User, Menu } from "lucide-react"
import { useAuthStore } from "@/store/auth-store"
import { useSidebarStore } from "@/store/sidebar-store"
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
import { Notification, fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/services/notification-service"
import { formatDistanceToNow } from "date-fns"

export function Header() {
  const { user, logout } = useAuthStore()
  const { isCollapsed, toggleCollapse } = useSidebarStore()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  // Fetch notifications on component mount and when user changes
  const fetchUserNotifications = useCallback(async () => {
    if (user?.id) {
      setLoading(true)
      try {
        const response = await fetchNotifications()
        if (response.success && response.notifications) {
          setNotifications(response.notifications)
        }
      } catch (error) {
        console.error("Error fetching notifications:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [user?.id])
  
  useEffect(() => {
    fetchUserNotifications()
    
    // Set up a polling interval to check for new notifications
    const intervalId = setInterval(fetchUserNotifications, 60000) // Check every minute
    
    return () => clearInterval(intervalId)
  }, [fetchUserNotifications])
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
    console.log("Search for:", searchQuery)
  }
  
  const handleNotificationClick = async (notification: Notification) => {
    // Mark notification as read
    if (!notification.read) {
      const success = await markNotificationAsRead(notification.id)
      if (success) {
        // Update local state
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === notification.id ? { ...notif, read: true } : notif
          )
        )
      }
    }
    
    // Navigate to the appropriate page if linkTo is provided
    if (notification.linkTo) {
      router.push(notification.linkTo)
    }
  }
  
  const handleMarkAllAsRead = async () => {
    const success = await markAllNotificationsAsRead()
    if (success) {
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      )
    }
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

  // Get profile path based on user role
  const getProfilePath = () => {
    if (!user || !user.role) return "/student/profile";
    
    // Convert role to uppercase for consistent comparison
    const role = user.role.toUpperCase();
    
    switch (role) {
      case "ADMIN":
        return "/admin/profile";
      case "FACULTY":
      case "STAFF":
        return "/fs/profile";
      case "STUDENT":
      default:
        return "/student/profile";
    }
  };
  
  // Get dashboard path based on user role
  const getDashboardPath = () => {
    if (!user || !user.role) return "/student/dashboard";
    
    // Convert role to uppercase for consistent comparison
    const role = user.role.toUpperCase();
    
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "FACULTY":
      case "STAFF":
        return "/fs/dashboard";
      case "STUDENT":
      default:
        return "/student/dashboard";
    }
  };
  
  // Get notification icon based on type
  const getNotificationIcon = (type: string, iconString?: string) => {
    if (iconString) {
      return <div className="mr-3 text-xl">{iconString}</div>
    }
    
    switch (type) {
      case "APPOINTMENT":
        return <Calendar className="mr-3 h-5 w-5 text-blue-500" />;
      case "FORM":
        return <FileText className="mr-3 h-5 w-5 text-green-500" />;
      case "ACCOUNT_APPROVAL":
        return <User className="mr-3 h-5 w-5 text-orange-500" />;
      case "CLEARANCE":
        return <FileText className="mr-3 h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="mr-3 h-5 w-5 text-slate-500" />;
    }
  };
  
  // Format notification time
  const formatNotificationTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return "recently";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex items-center flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleCollapse}
          className="mr-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href={getDashboardPath()} className="flex items-center gap-2">
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
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {loading ? (
              <div className="p-4 text-center text-slate-500">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                No notifications
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id}
                    className={`flex items-start p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    {getNotificationIcon(notification.type, notification.icon)}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-slate-700">{notification.title}</p>
                      <p className="text-xs text-slate-500">{notification.description}</p>
                      <p className="text-xs text-slate-400">{formatNotificationTime(notification.createdAt)}</p>
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
                  {user?.idNumber ? `${user.idNumber} / ${user?.role || "STUDENT"}` : user?.role || "STUDENT"}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <Link href={getProfilePath()}>
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