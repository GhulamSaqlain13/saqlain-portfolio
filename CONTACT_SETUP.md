# Contact Page Setup Guide

## Overview

Your portfolio now has a professional contact page at `/contact` with:

- ✅ Professional contact form with validation
- ✅ WhatsApp integration (Direct message link)
- ✅ Email contact option
- ✅ Response time information
- ✅ Supabase backend for form submissions

## Setting Up Supabase

### Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Choose your region (closer to your users = faster)

### Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL** (your `VITE_SUPABASE_URL`)
   - **Anon Public Key** (your `VITE_SUPABASE_ANON_KEY`)

### Step 3: Create the Database Table

In your Supabase dashboard, go to **SQL Editor** and run this query:

```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public can submit forms)
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Only you can read (view submissions in dashboard)
CREATE POLICY "Only authenticated users can read" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Never commit this file** - it's already in `.gitignore`

### Step 5: Verify Setup

1. Run `npm run dev`
2. Go to `http://localhost:5173/contact`
3. Fill out the form and submit
4. Check your Supabase dashboard → **Table Editor** → **contacts** to see submissions

## Contact Information

Your contact details are configured in:

- **WhatsApp**: +92 3448698452
- **Email**: saqlainghulam78@gmail.com

To update these, edit `src/routes/contact.tsx` and change:

```typescript
const WHATSAPP_NUMBER = "+923448698452";
const EMAIL = "saqlainghulam78@gmail.com";
```

## Features

### Contact Form

- Real-time validation with Zod
- Error messages for each field
- Loading state during submission
- Toast notifications for success/error
- All fields are required

### WhatsApp Integration

- Direct WhatsApp messaging link
- Opens WhatsApp Web or mobile app
- Customizable message format

### Email Option

- Direct mailto link
- Shows response time

### Response Time Information

- WhatsApp: Within 2-4 hours
- Email: Within 24 hours
- Contact Form: Within 12 hours

## Database Fields

The `contacts` table stores:

- `id` - Auto-generated unique ID
- `name` - Client name
- `email` - Client email
- `phone` - Client phone
- `subject` - Project subject/type
- `message` - Project description
- `created_at` - Submission timestamp

## Troubleshooting

### "Supabase credentials are missing"

- Check `.env.local` file exists
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart your dev server after adding env vars

### Form submission fails silently

1. Check browser console for errors
2. Verify Supabase credentials are correct
3. Check that the `contacts` table exists
4. Verify RLS policies allow INSERT

### WhatsApp link doesn't work

- Make sure the phone number is in international format with + symbol
- Remove all spaces from the number in the URL

## Next Steps

1. **Enhance notifications**: Customize toast messages in `src/routes/contact.tsx`
2. **Add email notifications**: Set up Supabase Edge Functions to send you emails
3. **Add form fields**: Modify the schema and form validation
4. **Style customization**: Update Tailwind classes to match your brand

## Security Notes

✅ **Already implemented:**

- Anon key is public (intentional) - only allows INSERT
- Row Level Security prevents unauthorized reads
- Client-side validation prevents most spam
- Credentials in `.env.local` (not committed to git)

**Recommended additions:**

- Add CAPTCHA for spam prevention
- Rate limiting on form submissions
- Email verification
- Admin email notifications
