# EmailJS Setup Guide

All forms on your website are now configured to send emails to **futurescholars.contact@gmail.com**. Follow these steps to complete the setup:

## 📧 Forms Connected:
1. **Get Involved** (Team page) → sends to futurescholars.contact@gmail.com
2. **Newsletter Subscription** (Footer) → sends to futurescholars.contact@gmail.com
3. **Request Assistance** (Assistance page) → sends to futurescholars.contact@gmail.com

## 🚀 Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's FREE - 200 emails/month)
3. Verify your email

### Step 2: Add Email Service
1. In your EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended since your email is Gmail)
4. Click **"Connect Account"** and log in with **futurescholars.contact@gmail.com**
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

You need **2 templates**:

#### Template 1: Contact Form (for Get Involved & Assistance)
1. Go to **"Email Templates"** → **"Create New Template"**
2. **Template Name**: `Contact Form`
3. **Subject**: `New {{form_type}} Submission from {{from_name}}`
4. **Content**:
```
New {{form_type}} submission:

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

{{#school}}
School: {{school}}
{{/school}}

{{#role}}
Role Interest: {{role}}
{{/role}}

{{#assistance_type}}
Assistance Type: {{assistance_type}}
{{/assistance_type}}

Message/Description:
{{message}}{{description}}
```
5. Click **Save** and copy the **Template ID** (e.g., `template_xyz789`)

#### Template 2: Newsletter Subscription
1. Create another template
2. **Template Name**: `Newsletter Subscription`
3. **Subject**: `New Newsletter Subscription`
4. **Content**:
```
New newsletter subscription:

Email: {{subscriber_email}}
```
5. Click **Save** and copy the **Template ID**

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** (e.g., `a1b2c3d4e5f6`)
3. Copy it

### Step 5: Update Your Code
Open `/src/lib/emailjs.ts` and replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_abc123', // Your Service ID from Step 2
  TEMPLATE_ID_CONTACT: 'template_xyz789', // Template ID from Step 3 (Contact)
  TEMPLATE_ID_NEWSLETTER: 'template_abc456', // Template ID from Step 3 (Newsletter)
  PUBLIC_KEY: 'a1b2c3d4e5f6', // Your Public Key from Step 4
};
```

### Step 6: Test!
1. Restart your development server: `npm run dev`
2. Try submitting each form:
   - Team page → "Get Involved" button
   - Footer → Newsletter subscription
   - Assistance page → Request form
3. Check **futurescholars.contact@gmail.com** inbox for emails

## 🎯 What's Already Set Up

✅ All forms have email integration code  
✅ All submissions go to `futurescholars.contact@gmail.com`  
✅ Assistance page shows email (`futurescholars.contact@gmail.com`) and phone (`919-454-8249`)  
✅ Loading states and error handling  
✅ Success/failure toast notifications  

## 🔧 Troubleshooting

### Forms show "Submission Failed"
- Make sure you replaced ALL placeholder values in `emailjs.ts`
- Verify your Service ID, Template IDs, and Public Key are correct
- Check the browser console for detailed error messages

### Emails not arriving
- Check your spam/junk folder
- Verify the Gmail account is connected in EmailJS dashboard
- Make sure you're within the 200 emails/month free tier limit

### Need help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/contact/](https://www.emailjs.com/contact/)

## 📞 Direct Contact (Already Set Up)

The Assistance page now displays:
- **Email**: futurescholars.contact@gmail.com (clickable mailto: link)
- **Phone**: (919) 454-8249 (clickable tel: link)

Users can click these to email or call directly if forms don't work!

