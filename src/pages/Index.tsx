
import { useState } from "react";
import { EventDetails } from "../components/EventDetails";
import { EventFilters } from "../components/EventFilters";
import { EventSubmissionForm } from "../components/EventSubmissionForm";
import { EventTabs } from "../components/EventTabs";
import { Event, events as initialEvents } from "../data/eventsMockData";

const Index = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filters, setFilters] = useState<{
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  }>({});
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleFilterChange = (filters: {
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setFilters(filters);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleEventSubmit = (newEvent: Event) => {
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Future Tech Gatherings
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover upcoming tech talks, hackathons, and workshops from top colleges and universities in one place.
          </p>
        </header>

        <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          <EventSubmissionForm onSubmit={handleEventSubmit} />
        </div>

        <div className="mb-8">
          <EventFilters events={events} onFilterChange={handleFilterChange} />
        </div>

        <EventTabs events={events} onClick={handleEventClick} filters={filters} />
      </div>

      <EventDetails
        event={selectedEvent}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Index;
