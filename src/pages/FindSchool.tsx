import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { titleOneSchools, School } from '@/data/titleOneSchools';
import { Compass, Search } from 'lucide-react';

// PERFORMANCE: Max markers to render at once (removed limit, using viewport filtering instead)
const MAX_MARKERS = 500; // Higher limit - viewport filtering prevents overload

// Pre-compute stats once (not on every render)
const SCHOOL_STATS = {
  total: titleOneSchools.length,
  elementary: titleOneSchools.filter((s) => s.type === 'elementary').length,
  middle: titleOneSchools.filter((s) => s.type === 'middle').length,
  high: titleOneSchools.filter((s) => s.type === 'high').length,
};

// Color mapping for school types
const getSchoolColor = (type: 'elementary' | 'middle' | 'high'): string => {
  switch (type) {
    case 'elementary':
      return '#3b82f6'; // Blue
    case 'middle':
      return '#2563eb'; // Deep blue
    case 'high':
      return '#1d4ed8'; // Dark blue
    default:
      return '#6b7280'; // Gray fallback
  }
};

const FindSchool = () => {
  const center: [number, number] = [35.5, -79.5]; // NC state center
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState<School | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [zoom, setZoom] = useState(7);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'denied' | 'error' | 'granted'>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  const [displayedSchools, setDisplayedSchools] = useState<School[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  // Debounce timer ref
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find matching schools
    const matches = titleOneSchools.filter((school) => {
      const nameMatch = searchName.trim() === '' || 
        school.name.toLowerCase().includes(searchName.toLowerCase());
      const locationMatch = searchLocation.trim() === '' || 
        school.address.toLowerCase().includes(searchLocation.toLowerCase());
      return nameMatch && locationMatch;
    });

    if (matches.length > 0) {
      // Center on first match
      const firstMatch = matches[0];
      setMapCenter([firstMatch.coordinates[1], firstMatch.coordinates[0]]);
      setZoom(11); // Zoom in to show the school
      setSelected(firstMatch);
    } else {
      alert('No schools found matching your search criteria.');
    }
  };

  // Debounced filter function - only updates after user stops moving
  const updateVisibleSchools = useCallback((centerLat: number, centerLng: number, currentZoom: number, immediate = false) => {
    // Clear previous timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const doFilter = () => {
      // More generous range calculation - shows wider area
      const latRange = 12 / Math.pow(2, currentZoom - 7);
      const lngRange = 12 / Math.pow(2, currentZoom - 7);

      const filtered: School[] = [];
      
      // Simple loop with early exit for performance
      for (let i = 0; i < titleOneSchools.length && filtered.length < MAX_MARKERS; i++) {
        const school = titleOneSchools[i];
        const latDiff = Math.abs(school.coordinates[1] - centerLat);
        const lngDiff = Math.abs(school.coordinates[0] - centerLng);
        
        if (latDiff < latRange && lngDiff < lngRange) {
          filtered.push(school);
        }
      }

      setDisplayedSchools(filtered);
    };

    if (immediate) {
      // No delay for initial load
      doFilter();
    } else {
      // Debounce: wait 150ms after last move before filtering
      debounceRef.current = setTimeout(doFilter, 150);
    }
  }, []);

  // Update schools when map moves
  const isInitialMount = useRef(true);
  
  useEffect(() => {
    if (isClient) {
      // Immediate update on first load, debounced after that
      const immediate = isInitialMount.current;
      if (isInitialMount.current) {
        isInitialMount.current = false;
      }
      updateVisibleSchools(mapCenter[0], mapCenter[1], zoom, immediate);
    }
  }, [mapCenter, zoom, isClient, updateVisibleSchools]);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationMessage("Your browser doesn't support location services.");
      return;
    }

    setLocationStatus('requesting');
    setLocationMessage('Locating nearby schools...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(nextCenter);
        setMapCenter(nextCenter);
        setZoom(11);
        setLocationStatus('granted');
        setLocationMessage('Showing schools near you.');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
          setLocationMessage('Location permission denied. You can still browse schools manually.');
        } else {
          setLocationStatus('error');
          setLocationMessage('We could not determine your location. Please try again.');
        }
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 },
    );
  }, []);

  // Only request location once on mount
  useEffect(() => {
    if (isClient) {
      // Small delay to not block initial render
      const timer = setTimeout(requestLocation, 500);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Find a School</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            North Carolina School Map
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Find a School
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Explore {SCHOOL_STATS.total.toLocaleString()} Title I schools across North Carolina
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex-1">
            <p className="text-sm text-foreground/70 mb-2">
              Showing {displayedSchools.length} of {SCHOOL_STATS.total.toLocaleString()} schools in this area
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-foreground/60">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Elementary</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                <span>Middle</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Your Location</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={requestLocation}
            disabled={locationStatus === 'requesting'}
          >
            <Compass className="h-4 w-4 mr-2" />
            {locationStatus === 'requesting' ? 'Locating…' : 'Use my location'}
          </Button>
        </div>

        {locationMessage && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              locationStatus === 'denied' || locationStatus === 'error'
                ? 'border-destructive/40 bg-destructive/10 text-destructive'
                : 'border-primary/30 bg-primary/5 text-primary'
            }`}
          >
            {locationMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card border border-primary/15 overflow-hidden mb-8">
          <Map
            center={mapCenter}
            defaultCenter={center}
            zoom={zoom}
            defaultZoom={7}
            height={500}
            onBoundsChanged={({ center: nextCenter, zoom: nextZoom }) => {
              setMapCenter(nextCenter as [number, number]);
              setZoom(nextZoom);
            }}
          >
            {displayedSchools.map((school, index) => (
              <Marker
                key={`${school.coordinates[0]}-${school.coordinates[1]}-${index}`}
                width={zoom > 10 ? 32 : 20}
                anchor={[school.coordinates[1], school.coordinates[0]]}
                color={getSchoolColor(school.type)}
                onClick={() => setSelected(school)}
              />
            ))}

            {userLocation && (
              <Marker anchor={userLocation} width={40} color="#22c55e" />
            )}

            {selected && (
              <Overlay
                anchor={[selected.coordinates[1], selected.coordinates[0]]}
                offset={[0, 30]}
              >
                <div 
                  className="bg-white rounded-md border border-primary/20 shadow-lg p-3 text-sm max-w-[250px] cursor-pointer"
                  onClick={() => setSelected(null)}
                >
                  <div className="font-semibold mb-1">{selected.name}</div>
                  <div className="capitalize text-muted-foreground text-xs">{selected.type} school</div>
                  <div className="text-muted-foreground text-xs mt-1">{selected.address}</div>
                  <div className="text-primary text-xs mt-2 italic">Click to close</div>
                </div>
              </Overlay>
            )}

            <ZoomControl />
          </Map>
        </div>

        {/* Stats Cards - Using pre-computed values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white border border-primary/15">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="font-semibold text-foreground">Elementary Schools</h3>
            </div>
            <p className="text-foreground/70">{SCHOOL_STATS.elementary} schools</p>
          </Card>

          <Card className="p-6 bg-white border border-primary/15">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <h3 className="font-semibold text-foreground">Middle Schools</h3>
            </div>
            <p className="text-foreground/70">{SCHOOL_STATS.middle} schools</p>
          </Card>

          <Card className="p-6 bg-white border border-primary/15">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-700"></div>
              <h3 className="font-semibold text-foreground">High Schools</h3>
            </div>
            <p className="text-foreground/70">{SCHOOL_STATS.high} schools</p>
          </Card>
        </div>

        {/* Search CTA */}
        <Card className="mt-12 border border-primary/20 shadow-xl bg-white">
          <CardContent className="p-6 md:p-8 space-y-4">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Search schools by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="md:col-span-2 h-12 text-base border border-primary/30"
              />
              <Input 
                placeholder="City or county" 
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="h-12 text-base border border-primary/30" 
              />
              <Button type="submit" className="md:col-span-3 h-12 text-base bg-primary hover:bg-primary/90">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindSchool;
