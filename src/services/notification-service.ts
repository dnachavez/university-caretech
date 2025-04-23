import { useAuthStore } from '@/store/auth-store'

export interface Notification {
  id: string
  userId: string
  title: string
  description: string
  type: string
  read: boolean
  icon?: string
  linkTo?: string
  relatedId?: string
  createdAt: string
  updatedAt: string
}

export interface NotificationResponse {
  success: boolean
  notifications?: Notification[]
  message?: string
}

export interface CreateNotificationParams {
  userId: string
  title: string
  description: string
  type: string
  icon?: string
  linkTo?: string
  relatedId?: string
}

/**
 * Fetch notifications for the current user
 */
export async function fetchNotifications(): Promise<NotificationResponse> {
  try {
    // Get user from Zustand store
    const { user } = useAuthStore.getState()
    
    if (!user || !user.id) {
      return {
        success: false,
        message: 'User not authenticated'
      }
    }
    
    const response = await fetch(`/api/notifications?userId=${user.id}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`)
    }
    
    const data = await response.json()
    return {
      success: true,
      notifications: data.notifications,
    }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}

/**
 * Mark a notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/notifications/${notificationId}/read`, {
      method: 'PATCH',
    })
    
    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`)
    }
    
    return true
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return false
  }
}

/**
 * Mark all notifications as read for the current user
 */
export async function markAllNotificationsAsRead(): Promise<boolean> {
  try {
    // Get user from Zustand store
    const { user } = useAuthStore.getState()
    
    if (!user || !user.id) {
      return false
    }
    
    const response = await fetch(`/api/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id }),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to mark all notifications as read: ${response.statusText}`)
    }
    
    return true
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return false
  }
}

/**
 * Create a new notification (client-side API call)
 */
export async function createNotification(params: CreateNotificationParams): Promise<{ success: boolean, notification?: Notification, error?: any }> {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create notification: ${response.statusText}`)
    }
    
    const data = await response.json()
    return {
      success: true,
      notification: data.notification,
    }
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error }
  }
} 