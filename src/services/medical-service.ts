import { MedicalRecord } from "@/features/medical/types/record-types";

export interface FetchRecordsResponse {
  success: boolean;
  forms?: MedicalRecord[];
  message?: string;
}

/**
 * Fetches medical records for a user
 */
export async function fetchMedicalRecords(userId: string, formType: string): Promise<FetchRecordsResponse> {
  try {
    const response = await fetch(`/api/forms/user?userId=${userId}&formType=${formType}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch records: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${formType} records:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
} 