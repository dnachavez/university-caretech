import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'

export function useProtectedFsRoute() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/auth')
      return
    }
    
    // Verify this is a faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      router.push(user.role === 'STUDENT' ? '/student/dashboard' : '/admin/dashboard')
      return
    }
    
    // Verify user is approved
    if (user.status !== 'ACTIVE') {
      router.push('/auth')
      return
    }
  }, [isAuthenticated, user, router])
  
  return { user, isAuthenticated }
} 