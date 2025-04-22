import { CapturedImage } from "@/features/health/types/form-types"

export function generateUniqueId(): string {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9)
}

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string)
      } else {
        reject(new Error("Failed to read file"))
      }
    }
    
    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }
    
    reader.readAsDataURL(file)
  })
}

export async function uploadFile(file: File): Promise<string> {
  console.log("uploadFile called with:", file.name, file.type, file.size)
  
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })
  
  const result = await response.json()
  console.log("API upload response:", result)
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to upload file')
  }
  
  return result.fileUrl
}

export async function dataUrlToFile(dataUrl: string, fileName = 'capture.jpg'): Promise<File> {
  try {
    // Check if dataUrl is valid
    if (!dataUrl || !dataUrl.startsWith('data:')) {
      console.error("Invalid dataUrl format:", dataUrl?.substring(0, 30) + "...")
      throw new Error("Invalid data URL format")
    }
    
    // Split the data URL to get the mime type and the data
    const arr = dataUrl.split(',')
    if (arr.length !== 2) {
      console.error("Invalid dataUrl format - couldn't split properly:", dataUrl?.substring(0, 30) + "...")
      throw new Error("Invalid data URL format")
    }
    
    // Extract the mime type
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
    console.log("Extracted MIME type:", mime)
    
    try {
      // Convert base64 to raw binary data
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      
      // Convert binary to Uint8Array
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      
      // Create a File object
      const file = new File([u8arr], fileName, { type: mime })
      console.log("Successfully created File object:", file.name, file.type, file.size)
      return file
    } catch (e: any) {
      console.error("Error processing base64 data:", e)
      throw new Error("Failed to process image data: " + (e.message || 'Unknown error'))
    }
  } catch (error) {
    console.error("dataUrlToFile failed:", error)
    throw error
  }
}

export async function uploadDataUrl(dataUrl: string): Promise<string> {
  try {
    console.log("uploadDataUrl called with dataUrl length:", dataUrl?.length)
    const file = await dataUrlToFile(dataUrl)
    console.log("File created from dataUrl:", file.name, file.type, file.size)
    return await uploadFile(file)
  } catch (error) {
    console.error('Error uploading data URL:', error)
    throw error
  }
}

export async function filesToCapturedImages(files: FileList): Promise<CapturedImage[]> {
  const images: CapturedImage[] = []
  
  for (let i = 0; i < files.length; i++) {
    try {
      const file = files[i]
      const dataUrl = await fileToDataUrl(file)
      const fileUrl = await uploadFile(file)
      
      images.push({
        id: generateUniqueId(),
        dataUrl,
        fileUrl,
        formType: "",
        notes: ""
      })
    } catch (error) {
      console.error("Error processing file:", error)
    }
  }
  
  return images
} 