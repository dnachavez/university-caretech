# Vercel Deployment Notes

## File Upload Fix

The application has been updated to use Vercel Blob Storage for file uploads in production, which resolves the 404 errors when viewing uploaded files.

### Required Environment Variables

Add these environment variables in your Vercel project settings:

```
BLOB_READ_WRITE_TOKEN=<your_vercel_blob_token>
```

### How to Get a Vercel Blob Token

1. Make sure you're logged into the Vercel CLI
2. Run: `npx vercel link` to link your local project to the Vercel project
3. Run: `npx vercel env pull .env.local` to pull existing environment variables
4. Run: `npx @vercel/blob-cli generate-token` to generate a new read/write token for Blob storage
5. Add this token to your Vercel project's environment variables

### Why This Change Was Needed

The previous implementation used in-memory storage for files in production, which doesn't work with Vercel's serverless architecture because:

1. Each API route runs in an isolated serverless function
2. When a file is uploaded, it's stored in memory for that specific function instance
3. When a subsequent request tries to access the file through the `/api/files/[filename]` route, it runs in a different function instance that doesn't have access to the same memory

By switching to Vercel Blob Storage, files are persistently stored in Vercel's cloud storage and can be accessed from any serverless function.

### Files Changed

All file upload routes have been updated to use Vercel Blob Storage:

1. `src/app/api/upload/route.ts` - Main file upload route
2. `src/app/api/admin/clearance/upload/route.ts` - Admin clearance document upload
3. `src/app/api/clearance/document/route.ts` - Clearance document upload
4. `src/app/api/fs/signature-upload/route.ts` - Faculty/staff signature upload
5. `src/app/api/student/signature-upload/route.ts` - Student signature upload
6. `src/app/api/admin/medical-records/route.ts` - Modified to work with Blob URLs

### Changes Made

1. Imported the Vercel Blob storage SDK: `import { put } from '@vercel/blob'`
2. Replaced in-memory storage in production with Vercel Blob Storage
3. Left development environment unchanged (using filesystem or in-memory storage)
4. Updated related API routes to work with Blob Storage URLs

### Packages Added

- `@vercel/blob`: Provides the API for using Vercel Blob Storage

### Next Steps After Deployment

After deploying to Vercel:

1. Test file uploads through all relevant interfaces
2. Verify you can view uploaded files
3. If using Vercel preview environments, note that each environment will need its own Blob token

### Notes About Existing Files

The `/api/files/[filename]/route.ts` endpoint is no longer needed for production file serving, but is kept for development mode. In production, Vercel Blob Storage provides direct URLs to access files. 