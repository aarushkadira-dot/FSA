import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-subtle">
      <div className="container mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 pl-0 hover:pl-2 transition-all text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto rounded-3xl border border-primary/15 bg-white/95 shadow-card p-8 md:p-12 prose prose-lg prose-headings:text-foreground prose-h2:text-primary prose-h3:text-primary/90 prose-strong:text-foreground">
          <p className="inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-4">
            Legal
          </p>
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Effective Date:</strong> December 13, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Future Scholars Association ("we," "us," or "our") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <p>We may collect personal information that you provide to us, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>School or organization affiliation</li>
              <li>Information provided in forms (contact forms, assistance requests, volunteer applications)</li>
              <li>Donation information (processed securely through third-party payment processors)</li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-3">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Process assistance requests and volunteer applications</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and services (e.g., email services, payment processors)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where we rely on consent to process your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Effective Date" at the top.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-none pl-0 mb-4">
              <li><strong>Email:</strong> futurescholars.contact@gmail.com</li>
              <li><strong>Phone:</strong> (919) 454-8249</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
