import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Assistance from "./pages/Assistance";
import NotFound from "./pages/NotFound";
import ScholarsDriveEvent from "./pages/ScholarsDriveEvent";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import StartChapter from "./pages/StartChapter";
import Partners from "./pages/Partners";
import Impact from "./pages/Impact";
import { CLASSROOMS_PATH, FIND_SCHOOL_PATH, START_CHAPTER_PATH } from "./lib/links";

const queryClient = new QueryClient();

// The school map and its 1,600+ school list only load when someone opens this page.
const FindSchool = lazy(() => import("./pages/FindSchool"));
// Teacher accounts (sign-up, sign-in, dashboard, admin) load only when someone visits /teachers.
const TeacherApp = lazy(() => import("./teachers/TeacherApp"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* Classroom requests now live on the Find a School page */}
    <Route path="/classrooms" element={<Navigate to={CLASSROOMS_PATH} replace />} />
    <Route path="/projects/*" element={<Navigate to={CLASSROOMS_PATH} replace />} />
    <Route
      path="/teachers/*"
      element={
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <TeacherApp />
        </Suspense>
      }
    />
    <Route path="/submit-project" element={<Navigate to="/teachers" replace />} />
    <Route path="/team" element={<Team />} />
    <Route path="/partners" element={<Partners />} />
    <Route path="/impact" element={<Impact />} />
    <Route path={START_CHAPTER_PATH} element={<StartChapter />} />
    <Route
      path={FIND_SCHOOL_PATH}
      element={
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <FindSchool />
        </Suspense>
      }
    />
    <Route path="/assistance" element={<Assistance />} />
    <Route path="/events/scholars-drive" element={<ScholarsDriveEvent />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen w-full flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
