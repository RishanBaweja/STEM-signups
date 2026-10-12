"use client";
import Navbar from "@/components/Navbar";
import Event from "@/components/Event";
import { useEffect, useState } from "react";

export type eventData = {
  eventId: string;
  eventName: string;
  eventDescription: string;
  hostName: string[];
  hostLocation: string;
  postDate: string;
  eventDate: string;
  eventTime: string;
  eventSubject: string[];
  attendees: string[];
};

// export function EventCard(props: Event) {
//   return (
//     <div className="card">
//       <h2>{props.}</h2>
//       <p>
//         {props.major}, Year {props.year}
//       </p>
//       <p>{props.hobbies}</p>
//     </div>
//   );
// }
export default function Events() {
  const [events, setEvents] = useState<eventData[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error("Unable to load events.");
        }
        setEvents(await response.json());
      } catch {
        setError("Unable to load events.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchEvents();
  }, []);

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading events...</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">Events</h1>

        {events.map((event, i) => (
          <>
            <div className="event">
              <div className="event-name">
                <h2>{event.eventName}</h2>
              </div>
              <p className="event-description">
                <Event key={event.eventId} event={event} />
              </p>
              <a href="" className="RSVP">
                RSVP
              </a>
            </div>
          </>
        ))}
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
