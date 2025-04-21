"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  SignInCredentials, 
  SignUpData, 
  ForgotPasswordData, 
  ResetPasswordData,
  User,
  AuthState
} from "@/types/auth"

// This is a mock implementation. In a real app, you would connect to your backend.
export function useAuth() {
  const router = useRouter()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  })

  const signIn = async (credentials: SignInCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful sign in
      const user: User = {
        id: "1",
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        firstName: "John",
        lastName: "Doe",
        role: "student"
      }

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      })

      // Navigate to dashboard or home page
      router.push("/dashboard")
      return true
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Invalid username or password" 
      }))
      return false
    }
  }

  const signUp = async (data: SignUpData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful sign up
      setAuthState(prev => ({ ...prev, isLoading: false }))
      
      // Redirect to verification page or signin
      router.push("/auth")
      return true
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to create account. Please try again." 
      }))
      return false
    }
  }

  const forgotPassword = async (data: ForgotPasswordData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful password reset request
      setAuthState(prev => ({ ...prev, isLoading: false }))
      return true
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to send reset instructions. Please try again." 
      }))
      return false
    }
  }

  const resetPassword = async (data: ResetPasswordData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock successful password reset
      setAuthState(prev => ({ ...prev, isLoading: false }))
      
      // Redirect to login page
      router.push("/auth")
      return true
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to reset password. Please try again." 
      }))
      return false
    }
  }

  const signOut = () => {
    // Clear auth state
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    })
    
    // Redirect to login page
    router.push("/auth")
  }

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword
  }
} 