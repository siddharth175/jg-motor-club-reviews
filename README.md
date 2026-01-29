# J & G Motor Club Review System

A smart, AI-powered web app to help customers write great Google reviews.

## 🚀 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 🛠 Deployment & Setup

### 1. Host the App
We recommend deploying to **Vercel** (it's free and optimized for Next.js).
1.  Push this code to GitHub.
2.  Import the repo on Vercel.
3.  Deploy!

### 2. Generate Your Real QR Code
Once deployed, you will get a live URL (e.g., `https://jg-review-app.vercel.app`).
Use the included QR code or generate a new one for your specific URL:
1.  Go to [QR Code Generator](https://www.qr-code-generator.com/) or use the command line:
    ```bash
    curl "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=YOUR_LIVE_URL_HERE" -o qrcode.png
    ```
2.  Print the QR code and place it at the counter.

## 🤖 AI Customization
Currently, the system uses a **Smart Template Engine** to generate reviews without needing an expensive API subscription.

To enable **Real OpenAI Integration**:
1.  Get an OpenAI API Key.
2.  Add it to your environment variables (`.env`): `OPENAI_API_KEY=sk-...`
3.  Uncomment the OpenAI logic in `src/app/api/generate/route.ts`.

## 🔒 Privacy & Security
-   No customer data is stored.
-   No logs are kept.
-   CORS is restricted to your domain (by default in Next.js API routes).

## 📂 Project Structure
-   `src/app/page.tsx`: Main user interface.
-   `src/components/ReviewForm.tsx`: The input form.
-   `src/components/ReviewAction.tsx`: The "Post to Google" logic.
-   `src/app/api/generate/route.ts`: The backend logic for generating text.
