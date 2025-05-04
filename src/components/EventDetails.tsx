
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Event } from "../data/eventsMockData";
import { formatDate } from "../utils/eventUtils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, ExternalLink, MapPin, Clock } from "lucide-react";

interface EventDetailsProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-2xl">
        {event.imageUrl && (
          <div className="relative h-56 w-full overflow-hidden -mt-6 -mx-6 mb-4 rounded-t-lg">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${event.imageUrl})` }}
            />
          </div>
        )}
        <DialogHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge className="bg-primary/90 text-white">
              {event.type.replace('-', ' ')}
            </Badge>
            <Badge variant="outline">{event.college}</Badge>
          </div>
          <DialogTitle className="text-2xl">{event.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p className="text-foreground">{event.description}</p>
          
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <Button className="w-full" asChild>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Visit Event Page <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
