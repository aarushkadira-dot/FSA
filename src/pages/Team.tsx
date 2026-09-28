import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ADVISORY_BOARD as advisoryBoard, STUDENT_BOARD as studentBoard } from "@/data/team";
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

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

const Team = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openTutor, setOpenTutor] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // Each tutor's card opens a list of their accomplishments.
  const tutors: {
    name: string;
    subject: string;
    image?: string;
    accomplishments: string[];
  }[] = [
    { name: "Vedhanth", subject: "Chemistry Tutor", image: "/vedhanth.jpg", accomplishments: [] },
    { name: "Arvin Gupta", subject: "Chemistry Tutor", image: "/arvin.jpg", accomplishments: [] },
    { name: "Femi", subject: "Math Tutor", accomplishments: [] },
    { name: "Ashvik Pal", subject: "Math Tutor", accomplishments: [] },
    { name: "Lalit", subject: "Physics Tutor", accomplishments: [] },
    { name: "Aaron Gim", subject: "English Tutor", image: "/aaron.jpg", accomplishments: [] },
    { name: "Adi", subject: "Speech & Communication Tutor", image: "/adi.jpg", accomplishments: [] },
    { name: "Yash Bafna", subject: "CAD Tutor", accomplishments: [] },
    { name: "Joel Manuel", subject: "AI/ML Tutor", accomplishments: [] },
  ];

  const photo = (name: string, image?: string, size = "h-28 w-28") => (
    <div className={`mx-auto ${size} overflow-hidden rounded-full bg-secondary`}>
      {image ? (
        <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
      ) : (
        // No photo yet: show initials until one is added
        <div className="flex h-full w-full items-center justify-center bg-primary font-display text-3xl font-bold text-primary-foreground">
          {initials(name)}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <section className="border-b border-border bg-secondary">
        <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
          <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">Our team</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The students and advisors who run FSA, and the tutors who volunteer with us.
          </p>
        </div>
      </section>

      {/* Student Board */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Student board</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentBoard.map((member) => (
              <li key={member.name} className="rounded-lg border border-border bg-white p-6 text-center">
                {photo(member.name, member.image)}
                <h3 className="mt-4 text-xl font-bold text-primary">{member.name}</h3>
                <p className="mt-1 font-semibold text-primary">{member.role}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Advisory Board */}
      <section className="border-y border-border bg-secondary py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Advisory board</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {advisoryBoard.map((member) => (
              <li key={member.name} className="rounded-lg border border-border bg-white p-6 text-center">
                {photo(member.name, member.image)}
                <h3 className="mt-4 text-xl font-bold text-primary">{member.name}</h3>
                <p className="mt-1 font-semibold text-primary">{member.role}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{member.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tutors */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-primary md:text-4xl">Tutors</h2>
          <p className="mt-2 text-lg text-muted-foreground">Select a tutor to see their accomplishments.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <button
                key={tutor.name}
                type="button"
                onClick={() => setOpenTutor(tutor.name)}
                className="group rounded-lg border border-border bg-white p-6 text-center transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-haspopup="dialog"
              >
                {photo(tutor.name, tutor.image)}
                <h3 className="mt-4 text-xl font-bold text-primary">{tutor.name}</h3>
                <p className="mt-1 font-semibold text-primary">{tutor.subject}</p>
                <p className="mt-3 text-sm font-semibold text-muted-foreground group-hover:text-primary group-hover:underline">
                  View accomplishments
                </p>
              </button>
            ))}
          </div>
        </div>

        {tutors.map((tutor) => (
          <Dialog
            key={tutor.name}
            open={openTutor === tutor.name}
            onOpenChange={(open) => setOpenTutor(open ? tutor.name : null)}
          >
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="shrink-0">{photo(tutor.name, tutor.image, "h-16 w-16")}</div>
                  <div className="text-left">
                    <DialogTitle className="text-2xl">{tutor.name}</DialogTitle>
                    <DialogDescription className="font-semibold text-primary">{tutor.subject}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div>
                <h4 className="font-semibold text-primary">Accomplishments</h4>
                {tutor.accomplishments.length > 0 ? (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/85">
                    {tutor.accomplishments.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-muted-foreground">Coming soon.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </section>

      {/* Join Team CTA */}
      <section className="bg-primary py-14 text-primary-foreground md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Want to join the team?</h2>
              <p className="mt-2 text-lg text-white/80">
                We're always looking for students who want to help Title I classrooms.
              </p>
            </div>
            <Button
              size="lg"
              className="shrink-0 bg-gold text-gold-foreground hover:brightness-95"
              onClick={() => setIsDialogOpen(true)}
            >
              Get involved
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
                      className="flex-1 bg-gold text-gold-foreground hover:brightness-95"
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
