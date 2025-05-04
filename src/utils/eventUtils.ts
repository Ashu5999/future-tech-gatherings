
import { Event } from '../data/eventsMockData';

export const filterEvents = (
  events: Event[],
  filters: {
    searchQuery?: string;
    eventType?: string;
    college?: string;
    startDate?: string;
    endDate?: string;
  }
) => {
  return events.filter((event) => {
    // Filter by search query
    if (
      filters.searchQuery &&
      !event.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.location.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !event.college.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by event type
    if (filters.eventType && filters.eventType !== 'all' && event.type !== filters.eventType) {
      return false;
    }

    // Filter by college
    if (filters.college && filters.college !== 'all' && event.college !== filters.college) {
      return false;
    }

    // Filter by date range
    if (filters.startDate && new Date(event.date) < new Date(filters.startDate)) {
      return false;
    }

    if (filters.endDate && new Date(event.date) > new Date(filters.endDate)) {
      return false;
    }

    return true;
  });
};

export const getUniqueColleges = (events: Event[]): string[] => {
  const colleges = events.map((event) => event.college);
  return [...new Set(colleges)].sort();
};

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
