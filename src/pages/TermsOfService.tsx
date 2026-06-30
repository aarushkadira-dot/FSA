import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-muted-foreground mb-8">
            <strong>Effective Date:</strong> December 13, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Future Scholars Association website ("Service"), you accept and agree 
              to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of 
              Service, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p>
              Future Scholars Association provides educational support services, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Connecting donors with educational projects and schools</li>
              <li>Facilitating assistance requests from students and educators</li>
              <li>Organizing educational events and programs</li>
              <li>Providing information about Title I schools and educational resources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p>As a user of our Service, you agree to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not impersonate any person or entity</li>
              <li>Not interfere with or disrupt the Service</li>
              <li>Not upload or transmit viruses or malicious code</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Donations and Payments</h2>
            <p>
              Donations made through our Service are processed by third-party payment processors. 
              All donations are final and non-refundable unless required by law. We reserve the right 
              to refuse or cancel any donation at our discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the 
              property of Future Scholars Association or its content suppliers and is protected by copyright 
              and intellectual property laws. You may not reproduce, distribute, or create derivative works 
              without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. User-Generated Content</h2>
            <p>
              By submitting content to our Service (e.g., project proposals, assistance requests), you grant 
              Future Scholars Association a non-exclusive, worldwide, royalty-free license to use, reproduce, 
              and display such content for the purpose of operating and promoting our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
              EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR 
              ERROR-FREE.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, FUTURE SCHOLARS ASSOCIATION SHALL NOT BE LIABLE FOR 
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS 
              OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites or services. We are not responsible for 
              the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to the Service immediately, without 
              prior notice, for any reason, including violation of these Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of 
              any material changes by posting the new Terms of Service on this page and updating the 
              "Effective Date."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of 
              North Carolina, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul className="list-none pl-0 mb-4">
              <li><strong>Email:</strong> futurescholars.contact@gmail.com</li>
              <li><strong>Phone:</strong> (919) 454-8249</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Entire Agreement</h2>
            <p>
              These Terms of Service constitute the entire agreement between you and Future Scholars Association 
              regarding the use of the Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
