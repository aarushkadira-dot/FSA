import ClassroomRequests from "@/components/ClassroomRequests";
import SchoolMap from "@/components/SchoolMap";
import { TITLE_I_SCHOOL_COUNT } from "@/data/titleOneSummary";

const FindSchool = () => (
  <div>
    <section className="border-b border-border bg-secondary">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-14">
        <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">Find a school</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Explore {TITLE_I_SCHOOL_COUNT.toLocaleString()} Title I schools across North Carolina, then see which
          classrooms need supplies.
        </p>
      </div>
    </section>

    <SchoolMap />
    <ClassroomRequests />
  </div>
);

export default FindSchool;
