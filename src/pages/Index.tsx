
import { useState } from "react";
import { EventCard } from "../components/EventCard";
import { EventDetails } from "../components/EventDetails";
import { EventFilters } from "../components/EventFilters";
import { EventSubmissionForm } from "../components/EventSubmissionForm";
import { Event, events as initialEvents } from "../data/eventsMockData";
import { filterEvents } from "../utils/eventUtils";

const Index = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleFilterChange = (filters: {
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    setFilteredEvents(filterEvents(events, filters));
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  };

  const handleEventSubmit = (newEvent: Event) => {
    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    setFilteredEvents(updatedEvents);
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

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={handleEventClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or add a new event.
            </p>
          </div>
        )}
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
