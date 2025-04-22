export interface Department {
  id: string;
  name: string;
  isActive: boolean;
}

export interface FetchDepartmentsResponse {
  success: boolean;
  departments?: Department[];
  message?: string;
}

/**
 * Fetches all active departments
 */
export async function fetchDepartments(): Promise<FetchDepartmentsResponse> {
  try {
    const response = await fetch('/api/departments');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch departments: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      success: true,
      departments: data.departments
    };
  } catch (error) {
    console.error('Error fetching departments:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
} 