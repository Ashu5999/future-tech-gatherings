
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Event } from "../data/eventsMockData";
import { EventCard } from "./EventCard";
import { filterEvents } from "../utils/eventUtils";

interface EventTabsProps {
  events: Event[];
  onClick: (event: Event) => void;
  filters: {
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  };
}

export const EventTabs: React.FC<EventTabsProps> = ({
  events,
  onClick,
  filters,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [tabEvents, setTabEvents] = useState<Record<string, Event[]>>({
    all: [],
    hackathon: [],
    "tech-talk": [],
    workshop: [],
  });

  useEffect(() => {
    // First filter events based on current filters (search, college, date)
    const baseFilteredEvents = filterEvents(events, {
      ...filters,
      eventType: undefined, // Remove eventType filter since we're handling it with tabs
    });

    // Then separate events by type for each tab
    const allEvents = baseFilteredEvents;
    const hackathonEvents = baseFilteredEvents.filter(
      (event) => event.type === "hackathon"
    );
    const techTalkEvents = baseFilteredEvents.filter(
      (event) => event.type === "tech-talk"
    );
    const workshopEvents = baseFilteredEvents.filter(
      (event) => event.type === "workshop"
    );

    setTabEvents({
      all: allEvents,
      hackathon: hackathonEvents,
      "tech-talk": techTalkEvents,
      workshop: workshopEvents,
    });
  }, [events, filters]);

  const displayEvents = tabEvents[activeTab] || [];

  return (
    <Tabs
      defaultValue="all"
      onValueChange={(value) => setActiveTab(value)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="all" className="text-center">
          All Events
          <span className="ml-2 text-xs bg-muted-foreground/20 rounded-full px-2">
            {tabEvents.all.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="hackathon" className="text-center">
          Hackathons
          <span className="ml-2 text-xs bg-muted-foreground/20 rounded-full px-2">
            {tabEvents.hackathon.length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="tech-talk" className="text-center">
          Tech Talks
          <span className="ml-2 text-xs bg-muted-foreground/20 rounded-full px-2">
            {tabEvents["tech-talk"].length}
          </span>
        </TabsTrigger>
        <TabsTrigger value="workshop" className="text-center">
          Workshops
          <span className="ml-2 text-xs bg-muted-foreground/20 rounded-full px-2">
            {tabEvents.workshop.length}
          </span>
        </TabsTrigger>
      </TabsList>

      {["all", "hackathon", "tech-talk", "workshop"].map((tabValue) => (
        <TabsContent key={tabValue} value={tabValue} className="mt-0">
          {tabEvents[tabValue].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tabEvents[tabValue].map((event) => (
                <EventCard key={event.id} event={event} onClick={onClick} />
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
        </TabsContent>
      ))}
    </Tabs>
  );
};
