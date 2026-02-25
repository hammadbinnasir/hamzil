# Hamzil - Cat Eye Specialist Store

Luxury press-on nail artistry focused on trendy Cat Eye and Magnetic designs.

## Features
- **Shopify-Style Checkout**: Multi-step high-end checkout flow.
- **Email Notifications**: Automatic order details sent to Gmail via Nodemailer.
- **Dynamic Pricing**: Specialized pricing (Rs. 899) and delivery logic (Free shipping over Rs. 2000).
- **Cat Eye Specialized**: Curated product catalog for magnetic nail trends.

## Local Setup
1. `npm install`
2. Configure `.env` with:
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (for login)
   - `EMAIL_USER`, `EMAIL_APP_PASSWORD` (for order notifications)
   - `APP_URL=http://localhost:3000`
3. `npm run dev`

## Deployment (Vercel)
1. Push to GitHub.
2. Connect repository to Vercel.
3. **Environment Variables**: Add the following in Vercel Settings:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `EMAIL_USER` (Your Gmail)
   - `EMAIL_APP_PASSWORD` (Gmail App Password)
   - `APP_URL` (Your Vercel production URL, e.g., `https://hamzil.vercel.app`)
4. The backend logic is handled via Vercel Serverless Functions (see `/api/index.ts`).
