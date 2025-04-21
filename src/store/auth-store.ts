import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User } from '@/types/auth'
import { AuthService } from '@/services/auth-service'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      login: async (username: string, password: string) => {
        set({ loading: true, error: null })
        
        try {
          const result = await AuthService.login(username, password)
          
          if (result.success && result.user) {
            set({ 
              user: result.user, 
              isAuthenticated: true, 
              loading: false 
            })
            return true
          } else {
            set({ 
              error: result.error || 'Failed to sign in', 
              loading: false 
            })
            return false
          }
        } catch (error) {
          set({ 
            error: 'An unexpected error occurred', 
            loading: false 
          })
          return false
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
) 