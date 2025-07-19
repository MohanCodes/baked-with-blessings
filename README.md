# Baked With Blessings

A modern cookie ordering web app built with Next.js and React for Angie and Kayla at https://www.instagram.com/_bakedwithblessings/.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/baked-with-blessings.git
   cd baked-with-blessings
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**

   Create a `.env` file in the project root (do **not** commit this file; it is ignored by `.gitignore`).  
   Example:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

   > **Note:**  
   > `.env` files are ignored by git for security.  
   > Never commit secrets or API keys.

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `/app` — Main Next.js app directory
- `/components` — Reusable React components
- `.env` — Environment variables (not committed)
- `.gitignore` — Ignores `node_modules`, `.env*`, build output, and more

## Notes

- This project uses [EmailJS](https://www.emailjs.com/) for order notifications.  
  You must set up your own EmailJS account and configure the required environment variables.
- All sensitive configuration should be stored in `.env` files at the project root.

## License

MIT