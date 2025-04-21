import { 
  SignInCredentials, 
  SignUpData, 
  ForgotPasswordData, 
  ResetPasswordData,
  User 
} from "@/types/auth"

// Mock API base URL - replace with your actual API URL in a real app
const API_URL = '/api'

// Helper function to simulate API calls
const simulateApiCall = async <T>(data: T, endpoint: string): Promise<any> => {
  // In a real app, you would use fetch or axios here
  console.log(`Calling ${endpoint} with data:`, data)
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Simulate successful response
  return {
    success: true,
    data: { message: 'Operation successful' }
  }
}

export class AuthService {
  static async login(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string; status?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to sign in',
          status: data.status
        }
      }

      return {
        success: true,
        user: data.user
      }
    } catch (error) {
      console.error('Login service error:', error)
      return {
        success: false,
        error: 'Something went wrong. Please try again later.'
      }
    }
  }

  static getDashboardPathByRole(role: string): string {
    const roleLower = role.toLowerCase()
    
    if (roleLower === 'student') {
      return '/student/dashboard'
    } else if (roleLower === 'faculty' || roleLower === 'staff') {
      return '/fs/dashboard'
    } else if (roleLower === 'admin') {
      return '/admin/dashboard'
    }
    
    return '/auth' // Default fallback
  }

  /**
   * Register a new user
   */
  static async signUp(data: SignUpData): Promise<any> {
    return simulateApiCall(data, `${API_URL}/auth/signup`)
  }

  /**
   * Send password reset email
   */
  static async forgotPassword(data: ForgotPasswordData): Promise<any> {
    return simulateApiCall(data, `${API_URL}/auth/forgot-password`)
  }

  /**
   * Reset password with token
   */
  static async resetPassword(data: ResetPasswordData): Promise<any> {
    return simulateApiCall(data, `${API_URL}/auth/reset-password`)
  }

  /**
   * Sign out the current user
   */
  static async signOut(): Promise<any> {
    return simulateApiCall({}, `${API_URL}/auth/signout`)
  }
} 