import { Mail, Phone, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import aarushImg from "@/assets/aarush.jpg";
import { useState } from "react";
import { sendGetInvolvedEmail } from "@/lib/emailjs";
import { useToast } from "@/hooks/use-toast";

type GetInvolvedFormElements = HTMLFormControlsCollection & {
  name: HTMLInputElement;
  email: HTMLInputElement;
  phone: HTMLInputElement;
  school: HTMLInputElement;
  role: HTMLInputElement;
  message: HTMLTextAreaElement;
};

type GetInvolvedForm = HTMLFormElement & {
  elements: GetInvolvedFormElements;
};

const Team = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const studentBoard = [
    {
      name: "Aarush Kadira",
      role: "Founder",
      bio: "Visionary leader dedicated to empowering students and creating opportunities for the next generation of scholars.",
      image: aarushImg,
    },
    {
      name: "Joshua Castelino",
      role: "Secretary",
      bio: "Organizational expert ensuring smooth operations and effective communication across all initiatives.",
      image: "/FSA/joshua.jpeg",
    },
    {
      name: "Saatvik Santosh",
      role: "Vice President",
      bio: "Vice President and lead architect behind FSA's digital ecosystem, pairing strategic leadership with polished execution to scale outreach, fundraising, and student impact.",
      image: "/FSA/saatvik.jpeg",
    },
    {
      name: "Ketav Karthikeyan",
      role: "Community and Partnership Manager",
      bio: "Building meaningful relationships and strategic partnerships to expand our reach and community impact.",
      image: "/FSA/ketav.png",
      position: "object-top",
    },
    {
      name: "Aarit Srivastava",
      role: "Social Media Co-Manager",
      bio: "Supporting social media strategy and content creation to expand FSA's digital presence and community engagement.",
      image: "/FSA/aarit.png",
      position: "object-top",
    },
  ];

  const advisoryBoard = [
    {
      name: "TJ Cawley",
      role: "Advisory Board Member",
      bio: "Bringing expertise and mentorship to guide FSA's initiatives and strategic growth.",
      image: "/FSA/tjcawley.png",
    },
  ];

  const interns = [
    {
      name: "Vedhanth",
      role: "Educational Support Intern",
      bio: "Providing tutoring and educational support to students, helping them achieve academic success and reach their full potential.",
      image: "/FSA/vedhanth.png",
      position: "object-center",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-slide-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium border border-gold/20">
                Leadership Team
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground">
              Meet the{" "}
              <span className="text-5xl md:text-6xl font-bold text-primary-foreground">
                Dreamers & Doers
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Passionate individuals working together to make education accessible
              and empower the next generation of leaders.
            </p>
          </div>
        </div>
      </section>

      {/* Student Board */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Student Board</h2>
            <p className="text-xl text-muted-foreground">
              The passionate students driving FSA's mission forward
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {studentBoard.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-glow bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="p-8 space-y-5">
                  {/* Profile Image Container */}
                  <div className="relative mx-auto w-32 h-32">
                    {/* Decorative rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-accent/20 animate-pulse" />
                    <div className="absolute inset-2 rounded-full border-2 border-accent/40" />
                    
                    {/* Profile Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-elegant">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${member.position || ''}`}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advisory Board</h2>
            <p className="text-xl text-muted-foreground">
              Expert guidance and mentorship for our organization
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {advisoryBoard.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-gold/50 transition-all duration-300 hover:shadow-gold bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="p-6 space-y-4">
                  {/* Profile Image Container */}
                  <div className="relative mx-auto w-32 h-32">
                    {/* Decorative rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-pulse" />
                    <div className="absolute inset-2 rounded-full border-2 border-gold/40" />
                    
                    {/* Profile Image */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-elegant">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-gold uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interns */}
      {interns.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Interns</h2>
              <p className="text-xl text-muted-foreground">
                Rising talent learning and contributing to our mission
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {interns.map((member, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 hover:border-primary/35 transition-all duration-300 hover:shadow-card bg-card/80 backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  
                  <div className="p-6 space-y-4">
                    {/* Profile Image Container */}
                    <div className="relative mx-auto w-32 h-32">
                      {/* Decorative rings */}
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
                      <div className="absolute inset-2 rounded-full border-2 border-accent/45" />
                      
                      {/* Profile Image */}
                      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-elegant">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${member.position || ''}`}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-semibold text-sm">N/A</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Join Team CTA */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold">
              Want to{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Join Our Team?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              We're always looking for passionate individuals who want to make a
              difference in students' lives.
            </p>
            <Button
              size="lg"
              className="bg-gradient-accent text-accent-foreground hover:shadow-glow transition-all"
              onClick={() => setIsDialogOpen(true)}
            >
              Get Involved
            </Button>
            
            {/* Join Form Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Join the FSA Team</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and we'll get back to you about opportunities to get involved.
                  </DialogDescription>
                </DialogHeader>
                
                <form className="space-y-4 mt-4" onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);

                  const form = e.currentTarget as GetInvolvedForm;
                  
                  const formData = {
                    name: form.elements.name.value,
                    email: form.elements.email.value,
                    phone: form.elements.phone.value,
                    school: form.elements.school.value,
                    role: form.elements.role.value,
                    message: form.elements.message.value,
                  };
                  
                  const result = await sendGetInvolvedEmail(formData);
                  
                  if (result.success) {
                    toast({
                      title: "Application Submitted!",
                      description: "Thank you for your interest! We'll be in touch soon.",
                    });
                    setIsDialogOpen(false);
                    form.reset();
                  } else {
                    toast({
                      title: "Submission Failed",
                      description: "Please try emailing us directly at futurescholars.contact@gmail.com",
                      variant: "destructive",
                    });
                  }
                  
                  setIsSubmitting(false);
                }}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school">School/Organization</Label>
                    <Input
                      id="school"
                      name="school"
                      placeholder="Green Hope High School"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">What role are you interested in?</Label>
                    <Input
                      id="role"
                      name="role"
                      placeholder="e.g., Volunteer, Board Member, Partner School"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Share your interests, skills, and why you want to join FSA..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-accent text-accent-foreground hover:shadow-glow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
