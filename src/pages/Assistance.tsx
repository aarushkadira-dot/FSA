import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { sendAssistanceRequest } from "@/lib/emailjs";
import { CONTACT_EMAIL } from "@/lib/forms";

const PHONE = "(919) 454-8249";

const assistanceTypes = [
  {
    title: "Financial support",
    description: "Scholarships and emergency funds to help cover tuition, books, and living expenses.",
  },
  {
    title: "Academic mentorship",
    description: "One-on-one tutoring and study support from experienced mentors.",
  },
  {
    title: "Career guidance",
    description: "Resume reviews, interview prep, and professional networking opportunities.",
  },
];

const faqs = [
  {
    question: "How long does the review process take?",
    answer: "We typically review applications within 48 hours and will reach out via email with next steps.",
  },
  {
    question: "Who is eligible for assistance?",
    answer:
      "All students facing financial, academic, or career-related challenges are welcome to apply. We evaluate each case individually.",
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes. Anything you share is kept confidential and only used for your assistance application.",
  },
];

const Assistance = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    assistanceType: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await sendAssistanceRequest(formData);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      toast({
        title: "Submission failed",
        description: `Please contact us directly at ${CONTACT_EMAIL} or ${PHONE}.`,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
          <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">Request assistance</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Facing financial or academic challenges? Tell us what's going on and we'll see how we can help.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">How we can help</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {assistanceTypes.map((type) => (
              <li key={type.title} className="border-l-4 border-gold pl-5">
                <h3 className="text-xl font-semibold text-primary">{type.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{type.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-14 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Apply</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">Prefer to reach out directly?</p>
            <ul className="mt-3 space-y-2 text-lg">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-words font-semibold text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href="tel:+19194548249" className="font-semibold text-primary hover:underline">
                  {PHONE}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-white p-6 md:p-8 lg:col-span-8">
            {isSubmitted ? (
              <div role="status">
                <h3 className="text-2xl font-bold text-primary">Application received</h3>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  Thank you for reaching out. Our team will review your request and reply by email within 48 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6 border-primary text-primary hover:bg-primary/5"
                  onClick={() => {
                    setFormData({ name: "", email: "", phone: "", assistanceType: "", description: "" });
                    setIsSubmitted(false);
                  }}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required autoComplete="name" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assistanceType">Type of assistance</Label>
                  <Select value={formData.assistanceType} onValueChange={(value) => handleChange("assistanceType", value)} required>
                    <SelectTrigger id="assistanceType">
                      <SelectValue placeholder="Select assistance type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial support</SelectItem>
                      <SelectItem value="academic">Academic mentorship</SelectItem>
                      <SelectItem value="career">Career guidance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Tell us your story</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe your situation and how we can best support you."
                    className="min-h-[140px]"
                    required
                  />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gold text-gold-foreground hover:bg-[hsl(43_90%_45%)] sm:w-auto">
                  {isSubmitting ? "Sending…" : "Submit application"}
                </Button>
                <p className="text-sm text-muted-foreground">Everything you share is kept confidential.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Questions</h2>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="text-lg font-semibold text-foreground">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
};

export default Assistance;
