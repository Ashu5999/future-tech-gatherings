
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Event } from "../data/eventsMockData";
import { getUniqueColleges } from "../utils/eventUtils";
import { Search, Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventFiltersProps {
  events: Event[];
  onFilterChange: (filters: {
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  events,
  onFilterChange,
}) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("all");
  const [college, setCollege] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const colleges = ["all", ...getUniqueColleges(events)];
  const eventTypes = [
    { value: "all", label: "All Types" },
    { value: "hackathon", label: "Hackathon" },
    { value: "tech-talk", label: "Tech Talk" },
    { value: "workshop", label: "Workshop" },
  ];

  const handleResetFilters = () => {
    setSearchQuery("");
    setEventType("all");
    setCollege("all");
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    onFilterChange({
      searchQuery,
      eventType: eventType === "all" ? undefined : eventType,
      college: college === "all" ? undefined : college,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  }, [searchQuery, eventType, college, startDate, endDate, onFilterChange]);

  const DesktopFilters = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div className="relative md:col-span-2">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={eventType} onValueChange={setEventType}>
        <SelectTrigger>
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          {eventTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={college} onValueChange={setCollege}>
        <SelectTrigger>
          <SelectValue placeholder="College" />
        </SelectTrigger>
        <SelectContent>
          {colleges.map((c) => (
            <SelectItem key={c} value={c}>
              {c === "all" ? "All Colleges" : c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        onClick={handleResetFilters}
        className="flex items-center gap-1"
      >
        <X className="h-4 w-4" /> Clear
      </Button>
    </div>
  );

  const MobileFilters = () => (
    <div className="flex gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader className="mb-5">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Filter events by type, college, and date.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>College</Label>
              <Select value={college} onValueChange={setCollege}>
                <SelectTrigger>
                  <SelectValue placeholder="College" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c === "all" ? "All Colleges" : c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button 
                onClick={() => setIsFilterSheetOpen(false)}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  return isMobile ? <MobileFilters /> : <DesktopFilters />;
};
