import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, BookOpen, ExternalLink, GraduationCap, Heart, Laptop, Users, Package } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ProjectCategory = "education" | "healthcare" | "technology" | "community" | "other";

const CATEGORY_OPTIONS: { value: ProjectCategory; label: string; icon: React.ReactNode }[] = [
  { value: "education", label: "Education & Learning", icon: <GraduationCap className="w-4 h-4" /> },
  { value: "healthcare", label: "Health & Wellness", icon: <Heart className="w-4 h-4" /> },
  { value: "technology", label: "Technology & Innovation", icon: <Laptop className="w-4 h-4" /> },
  { value: "community", label: "Community Impact", icon: <Users className="w-4 h-4" /> },
  { value: "other", label: "Other Needs", icon: <Package className="w-4 h-4" /> },
];

const projectSchema = z.object({
  title: z.string().trim().min(10, "Title must be at least 10 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().trim().min(50, "Description must be at least 50 characters").max(2000, "Description must be less than 2000 characters"),
  gofundme_link: z.string().trim().url("Must be a valid URL").refine((url) => url.includes("gofundme.com"), "Must be a GoFundMe link"),
  image_url: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  contact_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  contact_email: z.string().trim().email("Must be a valid email"),
  contact_phone: z.string().trim().optional(),
  category: z.enum(["education", "healthcare", "technology", "community", "other"]),
  goal_amount: z.number().min(1, "Goal amount must be at least $1").max(1000000, "Goal amount must be less than $1,000,000"),
});

const SubmitProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    gofundme_link: "",
    image_url: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    category: "education" as ProjectCategory,
    goal_amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      projectSchema.parse({
        ...formData,
        goal_amount: parseFloat(formData.goal_amount) || 0,
      });

      toast({
        title: "Project Submitted for Review!",
        description: "Your campaign will be reviewed by our team. We'll be in touch at the email you provided.",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit a Project</h1>
          <p className="text-muted-foreground text-lg">
            Add your GoFundMe campaign to reach more donors
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">Moderation Notice</h3>
              <p className="text-sm text-yellow-700">
                All campaign submissions are reviewed by our team to ensure quality and legitimacy.
                You'll receive a notification once your campaign is approved or if we need more information.
              </p>
            </div>
          </div>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              All submissions are carefully reviewed to maintain platform quality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input id="title" name="title" placeholder="E.g., Books for Our Reading Corner" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea id="description" name="description" placeholder="Describe your project and how it will help students..." value={formData.description} onChange={handleChange} rows={6} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gofundme_link">GoFundMe Link *</Label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="gofundme_link" name="gofundme_link" type="url" placeholder="https://www.gofundme.com/f/your-campaign" value={formData.gofundme_link} onChange={handleChange} className="pl-10" required />
                </div>
                <p className="text-sm text-muted-foreground">Paste the full URL of your GoFundMe campaign</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Project Image URL (optional)</Label>
                <Input id="image_url" name="image_url" type="url" placeholder="https://example.com/image.jpg" value={formData.image_url} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as ProjectCategory })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          {option.icon} {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal_amount">Funding Goal *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                  <Input id="goal_amount" name="goal_amount" type="number" placeholder="5000" value={formData.goal_amount} onChange={handleChange} className="pl-7" required min="1" step="0.01" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We need your contact details to verify your campaign and notify you of its status.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_name">Your Full Name *</Label>
                    <Input id="contact_name" name="contact_name" placeholder="John Doe" value={formData.contact_name} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_email">Your Email *</Label>
                    <Input id="contact_email" name="contact_email" type="email" placeholder="john@school.edu" value={formData.contact_email} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_phone">Your Phone (optional)</Label>
                    <Input id="contact_phone" name="contact_phone" type="tel" placeholder="(555) 123-4567" value={formData.contact_phone} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow text-lg py-6" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit for Review"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  By submitting, you agree to our moderation guidelines
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitProject;
