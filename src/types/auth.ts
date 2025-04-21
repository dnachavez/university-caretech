export type UserRole = 'STUDENT' | 'FACULTY' | 'STAFF' | 'ADMIN'
export type UserStatus = 'UNVERIFIED' | 'PENDING_APPROVAL' | 'ACTIVE' | 'SUSPENDED'

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
}

export interface SignInCredentials {
  username: string
  password: string
  rememberMe?: boolean
}

export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  username: string
  password: string
  confirmPassword: string
  role: 'student' | 'faculty' | 'staff'
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  password: string
  confirmPassword: string
  token: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
} 