export enum UploadMethod {
  SELECT,
  CAMERA,
  UPLOAD,
  REVIEWING
}

export enum CameraState {
  READY,
  CAPTURED,
  REVIEWING
}

export type FormType = "health" | "medical" | "vaccination" | "other" | "";

export interface CapturedImage {
  id: string;
  dataUrl: string;
  fileUrl?: string;
  formType: FormType;
  notes: string;
} 