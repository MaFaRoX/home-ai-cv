
  # CV Template

  This is a code bundle for CV Template. The original project is available at https://www.figma.com/design/d4hlRAslinT0v1ckZI8pfb/CV-Template.

  ## Setup

  ### 1. Install Dependencies

  Run `npm i` to install the dependencies.

  ### 2. Environment Variables

  Create a `.env.local` file in the root directory with the following variables:

  ```env
  # API Configuration
  NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

  # Google OAuth (for frontend)
  NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
  ```

  **Note:** The Google Client ID should be the same as the one configured in the backend. See `backend/.env.example` for backend environment variables.

  ### 3. Backend Setup

  Make sure the backend is running. See `backend/README.md` for backend setup instructions.

  ## Running the code

  Run `npm run dev` to start the development server.

  The application will be available at `http://localhost:3000` (or the port configured in Next.js).
  