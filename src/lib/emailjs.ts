import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ to get your keys
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  TEMPLATE_ID_CONTACT: 'YOUR_CONTACT_TEMPLATE_ID', // For "Get Involved" and "Request Assistance"
  TEMPLATE_ID_NEWSLETTER: 'YOUR_NEWSLETTER_TEMPLATE_ID', // For newsletter subscriptions
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Send "Get Involved" form submission
 */
export const sendGetInvolvedEmail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  school: string;
  role: string;
  message: string;
}) => {
  try {
    const templateParams = {
      to_email: 'futurescholars.contact@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      school: formData.school,
      role: formData.role,
      message: formData.message,
      form_type: 'Get Involved',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

/**
 * Send newsletter subscription
 */
export const sendNewsletterSubscription = async (email: string) => {
  try {
    const templateParams = {
      to_email: 'futurescholars.contact@gmail.com',
      subscriber_email: email,
      form_type: 'Newsletter Subscription',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_NEWSLETTER,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send newsletter subscription:', error);
    return { success: false, error };
  }
};

/**
 * Send assistance request
 */
export const sendAssistanceRequest = async (formData: {
  name: string;
  email: string;
  phone: string;
  assistanceType: string;
  description: string;
}) => {
  try {
    const templateParams = {
      to_email: 'futurescholars.contact@gmail.com',
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      assistance_type: formData.assistanceType,
      description: formData.description,
      form_type: 'Assistance Request',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Failed to send assistance request:', error);
    return { success: false, error };
  }
};

