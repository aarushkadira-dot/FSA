import { useId, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { titleOneSchools, type School } from "@/data/titleOneSchools";

const MAX_RESULTS = 8;

const cityOf = (address: string) => {
  const parts = address.split(", ");
  return parts[parts.length - 2] ?? "";
};

type Props = {
  value: School | null;
  onChange: (school: School | null) => void;
};

// Searchable list of NC Title I schools. Only schools on the list can be chosen.
const SchoolPicker = ({ value, onChange }: Props) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (term.length < 2) return [];
    return titleOneSchools
      .filter(
        (school) =>
          school.name.toLowerCase().includes(term) ||
          school.address.toLowerCase().includes(term) ||
          school.county.toLowerCase().includes(term),
      )
      .slice(0, MAX_RESULTS);
  }, [query]);

  const choose = (school: School) => {
    onChange(school);
    setQuery("");
    setOpen(false);
  };

  if (value) {
    return (
      <div className="flex items-start justify-between gap-4 rounded-md border border-input bg-secondary px-3 py-2.5">
        <div>
          <p className="font-semibold text-foreground">{value.name}</p>
          <p className="text-sm text-muted-foreground">
            {cityOf(value.address)} · {value.county} County
          </p>
        </div>
        <button type="button" onClick={() => onChange(null)} className="text-sm font-semibold text-primary hover:underline">
          Change
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Input
        id="school"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Start typing your school's name or city"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!results.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => Math.min(i + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            choose(results[active]);
          }
        }}
      />
      {open && query.trim().length >= 2 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-72 w-full overflow-auto rounded-md border border-border bg-white shadow-lg"
        >
          {results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted-foreground">
              No Title I school matches. Only North Carolina Title I schools can sign up.
            </li>
          ) : (
            results.map((school, index) => (
              <li
                key={school.id}
                role="option"
                aria-selected={index === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(school);
                }}
                onMouseEnter={() => setActive(index)}
                className={`cursor-pointer px-3 py-2 ${index === active ? "bg-secondary" : ""}`}
              >
                <p className="font-medium text-foreground">{school.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cityOf(school.address)} · {school.county} County
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SchoolPicker;
