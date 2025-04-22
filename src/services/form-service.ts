import { CapturedImage } from "@/features/health/types/form-types"
import { useAuthStore } from "@/store/auth-store"

interface FormSubmissionData {
  userId?: string
  images: CapturedImage[]
}

interface FormSubmissionResult {
  success: boolean
  message: string
  submittedAt?: string
  formId?: string
  forms?: any[]
}

export async function submitHealthForm(data: FormSubmissionData): Promise<FormSubmissionResult> {
  try {
    // Validate that all images have fileUrls
    const missingFileUrls = data.images.some(img => !img.fileUrl);
    if (missingFileUrls) {
      throw new Error("Some images have not been properly uploaded");
    }
    
    // Get user ID from the provided data or from the auth store
    let userId = data.userId;
    
    if (!userId && typeof window !== 'undefined') {
      // Get user from Zustand store if we're in the browser
      const user = useAuthStore.getState().user;
      if (user && user.id) {
        userId = user.id;
      }
    }
    
    if (!userId) {
      throw new Error("User ID is required to submit forms");
    }
    
    console.log("Submitting form data with user ID:", userId);
    
    // Make actual API call to our backend
    const response = await fetch('/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        images: data.images,
        userId
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }
    
    const result = await response.json();
    
    return {
      success: result.success,
      message: result.message,
      submittedAt: new Date().toISOString(),
      formId: result.forms?.[0]?.id || Date.now().toString(),
      forms: result.forms
    };
  } catch (error) {
    console.error("Error submitting form:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit form"
    };
  }
} 