import { Map as PigeonMap, Marker, Overlay, ZoomControl } from "pigeon-maps";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Compass, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PARTNER_SCHOOL_LOCATIONS } from "@/data/organization";
import { TITLE_I_SCHOOL_YEAR, titleOneSchools, type School, type SchoolType } from "@/data/titleOneSchools";

// Viewport filtering keeps the marker count manageable; this caps it.
const MAX_MARKERS = 500;
const NC_CENTER: [number, number] = [35.5, -79.5];

const PARTNER_COLOR = "#f2b705";
const SCHOOL_TYPES: { type: SchoolType; label: string; color: string }[] = [
  { type: "elementary", label: "Elementary", color: "#2563eb" },
  { type: "middle", label: "Middle", color: "#0d9488" },
  { type: "high", label: "High", color: "#7c3aed" },
  { type: "combined", label: "K–8 / K–12 / 6–12", color: "#475569" },
];

const TYPE_COUNTS = Object.fromEntries(
  SCHOOL_TYPES.map(({ type }) => [type, titleOneSchools.filter((school) => school.type === type).length]),
) as Record<SchoolType, number>;

const colorFor = (type: SchoolType) => SCHOOL_TYPES.find((entry) => entry.type === type)?.color ?? "#6b7280";

// "PK:05" -> "PK–5", "0K:12" -> "K–12"
const formatGrades = (span: string) =>
  span
    .split(":")
    .map((grade) => (grade === "0K" ? "K" : grade.replace(/^0(?=\d)/, "")))
    .join("–");

const PARTNER_IDS = new Set(PARTNER_SCHOOL_LOCATIONS.map((partner) => partner.id));
const TITLE_I_BY_ID = new Map(titleOneSchools.map((school) => [school.id, school]));

const BLOCKED_MESSAGE =
  "Location is blocked for this site. To use Near me, click the icon to the left of the web address, set Location to Allow, then press Near me again. You can also search by city or county.";

const milesBetween = (lat1: number, lng1: number, lat2: number, lng2: number) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(a));
};

const closestSchools = (lat: number, lng: number, count = 5) =>
  titleOneSchools
    .map((school) => ({ school, miles: milesBetween(lat, lng, school.coordinates[1], school.coordinates[0]) }))
    .sort((a, b) => a.miles - b.miles)
    .slice(0, count);

type Selected =
  | { kind: "school"; school: School }
  | { kind: "partner"; partner: (typeof PARTNER_SCHOOL_LOCATIONS)[number] };

const anchorOf = (selected: Selected): [number, number] => {
  const [lng, lat] = selected.kind === "school" ? selected.school.coordinates : selected.partner.coordinates;
  return [lat, lng];
};

type LocationStatus = "idle" | "requesting" | "denied" | "error" | "granted";

const SchoolMap = () => {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(NC_CENTER);
  const [zoom, setZoom] = useState(7);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");
  const [message, setMessage] = useState<{ text: string; tone: "info" | "error" } | null>(null);
  const [displayedSchools, setDisplayedSchools] = useState<School[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [nearest, setNearest] = useState<{ school: School; miles: number }[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const name = searchName.trim().toLowerCase();
    const place = searchLocation.trim().toLowerCase();
    // Place matches a county name ("Wake", "Wake County") or a city, never a street name.
    const placeKey = place.replace(/\s+county$/, "");
    const cityOf = (address: string) => {
      const parts = address.split(", ");
      return (parts[parts.length - 2] ?? "").toLowerCase();
    };
    const nameMatches = (candidate: string) => !name || candidate.toLowerCase().includes(name);

    const partner = PARTNER_SCHOOL_LOCATIONS.find(
      (p) => nameMatches(p.name) && (!placeKey || cityOf(p.address).includes(placeKey)),
    );
    const candidates = titleOneSchools.filter((s) => nameMatches(s.name));
    const school = !placeKey
      ? candidates[0]
      : (candidates.find((s) => s.county.toLowerCase() === placeKey) ??
        candidates.find((s) => cityOf(s.address).includes(placeKey)));

    const match: Selected | null = partner
      ? { kind: "partner", partner }
      : school
        ? { kind: "school", school }
        : null;

    if (match) {
      setNearest([]);
      setMapCenter(anchorOf(match));
      setZoom(13);
      setSelected(match);
      setMessage(null);
    } else {
      setSelected(null);
      setMessage({ text: "No schools match that search. Try a shorter name or a different city or county.", tone: "error" });
    }
  };

  const updateVisibleSchools = useCallback((lat: number, lng: number, currentZoom: number, immediate = false) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const filter = () => {
      const range = 12 / Math.pow(2, currentZoom - 7);
      const visible: School[] = [];
      for (let i = 0; i < titleOneSchools.length && visible.length < MAX_MARKERS; i++) {
        const school = titleOneSchools[i];
        if (PARTNER_IDS.has(school.id)) continue;
        if (Math.abs(school.coordinates[1] - lat) < range && Math.abs(school.coordinates[0] - lng) < range) {
          visible.push(school);
        }
      }
      setDisplayedSchools(visible);
    };

    if (immediate) filter();
    else debounceRef.current = setTimeout(filter, 150);
  }, []);

  useEffect(() => {
    const immediate = isInitialMount.current;
    isInitialMount.current = false;
    updateVisibleSchools(mapCenter[0], mapCenter[1], zoom, immediate);
  }, [mapCenter, zoom, updateVisibleSchools]);

  const showLocation = useCallback((lat: number, lng: number) => {
    const here: [number, number] = [lat, lng];
    setUserLocation(here);
    setMapCenter(here);
    setZoom(12);
    setSelected(null);
    setNearest(closestSchools(lat, lng));
    setLocationStatus("granted");
    setMessage({ text: "Showing Title I schools near you.", tone: "info" });
  }, []);

  // Only ever called from the button, so the browser's permission prompt appears
  // right after the visitor asks for it.
  const requestLocation = useCallback(async () => {
    if (!window.isSecureContext || !navigator.geolocation) {
      setLocationStatus("error");
      setMessage({ text: "Your browser can't share your location here. Search by city or county instead.", tone: "error" });
      return;
    }

    // If the site is already blocked, say how to unblock it instead of failing silently.
    try {
      const permission = await navigator.permissions?.query({ name: "geolocation" });
      if (permission?.state === "denied") {
        setLocationStatus("denied");
        setMessage({ text: BLOCKED_MESSAGE, tone: "error" });
        return;
      }
    } catch {
      // Permissions API not available (older Safari); fall through to the request.
    }

    setLocationStatus("requesting");
    setMessage({ text: "Finding your location… If your browser asks, choose Allow.", tone: "info" });

    const onError = (error: GeolocationPositionError) => {
      if (error.code === error.PERMISSION_DENIED) {
        setLocationStatus("denied");
        setMessage({ text: BLOCKED_MESSAGE, tone: "error" });
      } else {
        setLocationStatus("error");
        setMessage({
          text:
            error.code === error.TIMEOUT
              ? "Finding your location took too long. Try again, or search by city or county."
              : "We couldn't get your location. Check that location services are on for your device and browser, or search by city or county.",
          tone: "error",
        });
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => showLocation(position.coords.latitude, position.coords.longitude),
      onError,
      // Wi-Fi/IP location is plenty for "schools near me" and much faster than GPS.
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 5 * 60 * 1000 },
    );
  }, [showLocation]);

  return (
    <section className="py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <form onSubmit={handleSearch} className="grid gap-3 md:grid-cols-12">
          <Input
            aria-label="School name"
            placeholder="School name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="h-11 md:col-span-5"
          />
          <Input
            aria-label="City or county"
            placeholder="City or county"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="h-11 md:col-span-3"
          />
          <Button type="submit" className="h-11 md:col-span-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={requestLocation}
            disabled={locationStatus === "requesting"}
            className="h-11 border-primary text-primary hover:bg-primary hover:text-primary-foreground md:col-span-2"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            {locationStatus === "requesting" ? "Locating…" : "Near me"}
          </Button>
        </form>

        {message && (
          <p
            role="status"
            className={`mt-4 flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm ${
              message.tone === "error"
                ? "border-destructive/30 bg-destructive/5 text-destructive"
                : "border-border bg-secondary text-foreground"
            }`}
          >
            {message.text}
            <button type="button" aria-label="Dismiss" onClick={() => setMessage(null)} className="shrink-0 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {displayedSchools.length.toLocaleString()} of {titleOneSchools.length.toLocaleString()} schools in
            this area
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {SCHOOL_TYPES.map(({ type, label, color }) => (
              <li key={type} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                {label} ({TYPE_COUNTS[type].toLocaleString()})
              </li>
            ))}
            <li className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PARTNER_COLOR }} />
              Our partner schools
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              You
            </li>
          </ul>
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <PigeonMap
            center={mapCenter}
            defaultCenter={NC_CENTER}
            zoom={zoom}
            defaultZoom={7}
            height={520}
            onBoundsChanged={({ center, zoom: nextZoom }) => {
              setMapCenter(center as [number, number]);
              setZoom(nextZoom);
            }}
          >
            {displayedSchools.map((school, index) => (
              <Marker
                key={`${school.coordinates[0]}-${school.coordinates[1]}-${index}`}
                width={zoom > 10 ? 32 : 20}
                anchor={[school.coordinates[1], school.coordinates[0]]}
                color={colorFor(school.type)}
                onClick={() => setSelected({ kind: "school", school })}
              />
            ))}

            {PARTNER_SCHOOL_LOCATIONS.map((partner) => (
              <Marker
                key={partner.id}
                width={zoom > 10 ? 40 : 30}
                anchor={[partner.coordinates[1], partner.coordinates[0]]}
                color={PARTNER_COLOR}
                onClick={() => setSelected({ kind: "partner", partner })}
              />
            ))}

            {userLocation && <Marker anchor={userLocation} width={40} color="#22c55e" />}

            {selected && (
              <Overlay anchor={anchorOf(selected)} offset={[0, 30]}>
                <div className="w-[260px] rounded-md border border-border bg-white p-3 text-sm shadow-lg">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-foreground">
                      {selected.kind === "school" ? selected.school.name : selected.partner.name}
                    </p>
                    <button type="button" aria-label="Close" onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  {selected.kind === "partner" ? (
                    <>
                      <p className="mt-1 inline-block rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-foreground">
                        FSA partner school
                      </p>
                      {(() => {
                        const listed = TITLE_I_BY_ID.get(selected.partner.id);
                        return listed ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Title I · Grades {formatGrades(listed.grades)} · {listed.county} County
                          </p>
                        ) : null;
                      })()}
                      <p className="mt-1 text-xs text-muted-foreground">{selected.partner.address}</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Title I · Grades {formatGrades(selected.school.grades)}
                        {selected.school.charter ? " · Charter" : ""}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selected.school.address} · {selected.school.county} County
                      </p>
                    </>
                  )}
                </div>
              </Overlay>
            )}

            <ZoomControl />
          </PigeonMap>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Title I schools for the {TITLE_I_SCHOOL_YEAR} school year, from NC DPI school report card data, plus partner
          schools that became Title I in 2025–26. Locations from the U.S. Department of Education (NCES).
        </p>

        {nearest.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">Closest Title I schools to you</h2>
            <ol className="mt-3 divide-y divide-border rounded-lg border border-border">
              {nearest.map(({ school, miles }) => (
                <li key={school.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMapCenter([school.coordinates[1], school.coordinates[0]]);
                      setZoom(14);
                      setSelected(
                        PARTNER_IDS.has(school.id)
                          ? { kind: "partner", partner: PARTNER_SCHOOL_LOCATIONS.find((p) => p.id === school.id)! }
                          : { kind: "school", school },
                      );
                    }}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-secondary"
                  >
                    <span>
                      <span className="font-semibold text-foreground">{school.name}</span>
                      {PARTNER_IDS.has(school.id) && (
                        <span className="ml-2 inline-block whitespace-nowrap rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-foreground">
                          FSA partner
                        </span>
                      )}
                      <span className="block text-sm text-muted-foreground">
                        {school.address} · Grades {formatGrades(school.grades)}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-medium text-muted-foreground">
                      {miles < 10 ? miles.toFixed(1) : Math.round(miles)} mi
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolMap;
