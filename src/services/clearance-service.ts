import { Department } from "./department-service";
import { useAuthStore } from "@/store/auth-store";

export interface ClearanceRequest {
  id: string;
  userId: string;
  departmentId: string;
  department?: Department;
  reason: string;
  otherReason?: string | null;
  purpose: string;
  dateNeeded: string;
  additionalInfo?: string | null;
  status: string;
  documentUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClearanceRequestFormData {
  reason: string;
  otherReason?: string;
  departmentId: string;
  purpose: string;
  dateNeeded: Date;
  additionalInfo?: string;
}

export interface SubmitClearanceResponse {
  success: boolean;
  clearanceRequest?: ClearanceRequest;
  message?: string;
}

export interface FetchClearanceRequestsResponse {
  success: boolean;
  clearanceRequests?: ClearanceRequest[];
  message?: string;
}

/**
 * Submits a new clearance request
 */
export async function submitClearanceRequest(
  formData: ClearanceRequestFormData
): Promise<SubmitClearanceResponse> {
  try {
    // Get user from Zustand store
    const { user } = useAuthStore.getState();
    
    if (!user || !user.id) {
      return {
        success: false,
        message: 'User not authenticated'
      };
    }
    
    const response = await fetch(`/api/clearance?userId=${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to submit clearance request: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      clearanceRequest: data.clearanceRequest,
    };
  } catch (error) {
    console.error('Error submitting clearance request:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

/**
 * Fetches clearance requests for a user
 */
export async function fetchClearanceRequests(): Promise<FetchClearanceRequestsResponse> {
  try {
    // Get user from Zustand store
    const { user } = useAuthStore.getState();
    
    if (!user || !user.id) {
      return {
        success: false,
        message: 'User not authenticated'
      };
    }
    
    const response = await fetch(`/api/clearance?userId=${user.id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch clearance requests: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      clearanceRequests: data.clearanceRequests,
    };
  } catch (error) {
    console.error('Error fetching clearance requests:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

/**
 * Upload a document for a clearance request (admin only)
 */
export async function uploadClearanceDocument(
  requestId: string,
  file: File,
  status: 'APPROVED' | 'REJECTED' | 'PENDING',
  role: string = 'ADMIN'
): Promise<SubmitClearanceResponse> {
  try {
    if (role !== 'ADMIN') {
      return {
        success: false,
        message: 'Unauthorized - Admin access required'
      };
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('requestId', requestId);
    formData.append('status', status);
    
    const response = await fetch(`/api/clearance/document?role=${role}`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to upload clearance document: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      clearanceRequest: data.clearanceRequest
    };
  } catch (error) {
    console.error('Error uploading clearance document:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
} 