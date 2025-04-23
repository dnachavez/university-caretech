-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNVERIFIED',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHealthForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleInitial" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "birthPlace" TEXT NOT NULL,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "departmentId" TEXT,
    "yearLevel" TEXT,
    "guardianName" TEXT,
    "guardianContact" TEXT,
    "emergencyContact" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "emergencyNumber" TEXT NOT NULL,
    "bloodType" TEXT,
    "signaturePath" TEXT NOT NULL,
    "dateSigned" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pastIllnesses" TEXT,
    "hospitalization" TEXT,
    "medications" TEXT,
    "allergies" BOOLEAN NOT NULL DEFAULT false,
    "immunized" BOOLEAN NOT NULL DEFAULT false,
    "communicableDisease" BOOLEAN NOT NULL DEFAULT false,
    "asthmatic" BOOLEAN NOT NULL DEFAULT false,
    "chronicIllness" BOOLEAN NOT NULL DEFAULT false,
    "hiking" BOOLEAN NOT NULL DEFAULT false,
    "dancing" BOOLEAN NOT NULL DEFAULT false,
    "swimming" BOOLEAN NOT NULL DEFAULT false,
    "basketball" BOOLEAN NOT NULL DEFAULT false,
    "ballgames" BOOLEAN NOT NULL DEFAULT false,
    "jogging" BOOLEAN NOT NULL DEFAULT false,
    "football" BOOLEAN NOT NULL DEFAULT false,
    "badminton" BOOLEAN NOT NULL DEFAULT false,
    "calisthenics" BOOLEAN NOT NULL DEFAULT false,
    "wallclimbing" BOOLEAN NOT NULL DEFAULT false,
    "notFitActivities" TEXT,
    "medicationPermission" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserHealthForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedForm" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "formType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadedForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "consultationDateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "timeSlotId" TEXT NOT NULL,
    "consultationType" TEXT NOT NULL,
    "reasonForVisit" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClearanceRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "otherReason" TEXT,
    "purpose" TEXT NOT NULL,
    "dateNeeded" TIMESTAMP(3) NOT NULL,
    "additionalInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClearanceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_key" ON "PasswordResetToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserHealthForm_userId_key" ON "UserHealthForm"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_timeSlotId_key" ON "Appointment"("timeSlotId");

-- AddForeignKey
ALTER TABLE "UserHealthForm" ADD CONSTRAINT "UserHealthForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHealthForm" ADD CONSTRAINT "UserHealthForm_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedForm" ADD CONSTRAINT "UploadedForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_consultationDateId_fkey" FOREIGN KEY ("consultationDateId") REFERENCES "ConsultationDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_timeSlotId_fkey" FOREIGN KEY ("timeSlotId") REFERENCES "TimeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClearanceRequest" ADD CONSTRAINT "ClearanceRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClearanceRequest" ADD CONSTRAINT "ClearanceRequest_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
