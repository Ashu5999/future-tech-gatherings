
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
    search: [],
  });

  useEffect(() => {
    // For the search tab, use all filters including event type
    const searchFilteredEvents = filters.searchQuery
      ? filterEvents(events, filters)
      : [];

    // For the other tabs, filter by event type but exclude the eventType from filters
    // as we're handling it with tabs
    const baseFilteredEvents = filterEvents(events, {
      ...filters,
      eventType: undefined,
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
      search: searchFilteredEvents,
    });

    // If search query is active, automatically switch to search tab
    if (filters.searchQuery && activeTab !== "search") {
      setActiveTab("search");
    } else if (!filters.searchQuery && activeTab === "search") {
      setActiveTab("all");
    }
  }, [events, filters, activeTab]);

  const displayEvents = tabEvents[activeTab] || [];

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-5 mb-6">
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
        <TabsTrigger value="search" className="text-center">
          Search
          <span className="ml-2 text-xs bg-muted-foreground/20 rounded-full px-2">
            {tabEvents.search.length}
          </span>
        </TabsTrigger>
      </TabsList>

      {["all", "hackathon", "tech-talk", "workshop", "search"].map((tabValue) => (
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
                {tabValue === "search"
                  ? "Try adjusting your search query or filters."
                  : "Try adjusting your filters or add a new event."}
              </p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
