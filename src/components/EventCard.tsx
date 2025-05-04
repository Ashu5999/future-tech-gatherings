
import { Event } from "../data/eventsMockData";
import { formatDate } from "../utils/eventUtils";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventTypeColors = {
  'hackathon': 'bg-primary/90',
  'tech-talk': 'bg-accent/90',
  'workshop': 'bg-green-500/90',
};

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <Card className="event-card overflow-hidden h-full flex flex-col">
      {event.imageUrl && (
        <div className="relative h-40 w-full overflow-hidden">
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
          <Badge 
            className={`absolute top-2 right-2 ${EventTypeColors[event.type]} text-white`}
          >
            {event.type.replace('-', ' ')}
          </Badge>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.name}</CardTitle>
        </div>
        <Badge variant="outline" className="w-fit">
          {event.college}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <CardDescription className="line-clamp-3 mb-4">
          {event.description}
        </CardDescription>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => onClick(event)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
