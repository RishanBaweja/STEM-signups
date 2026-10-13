"use client";
import Navbar from "@/components/Navbar";
import Event from "@/components/Event";
import { type FormEvent, useEffect, useState } from "react";

export type eventData = {
  _id: string;
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
  const [rsvpMessages, setRsvpMessages] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

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

  async function handleRsvp(e: FormEvent<HTMLFormElement>, eventId: string) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    setSubmittingId(eventId);
    setRsvpMessages((prev) => ({ ...prev, [eventId]: "" }));

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      setRsvpMessages((prev) => ({
        ...prev,
        [eventId]: response.ok ? result.message : (result.error ?? "Registration failed."),
      }));
    } catch {
      setRsvpMessages((prev) => ({
        ...prev,
        [eventId]: "Unable to register. Please try again.",
      }));
    } finally {
      setSubmittingId(null);
    }
  }

  if (error) return <p>{error}</p>;
  if (isLoading) return <p>Loading events...</p>;
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">Events</h1>

        {events.map((event) => (
          <div className="event" key={event._id}>
            <div className="event-name">
              <h2>{event.eventName}</h2>
            </div>
            <p className="event-description">
              <Event event={event} />
              <strong>Description: </strong>
              <div></div>
              {event.eventDescription}
            </p>
            <form onSubmit={(e) => void handleRsvp(e, event._id)}>
              <label htmlFor={`rsvp-email-${event._id}`}>Email address</label>

              <input type="email" id={`rsvp-email-${event._id}`} name="email" placeholder="you@example.com" required />

              <button type="submit" className="RSVP" disabled={submittingId !== null}>
                {submittingId === event._id ? "Registering..." : "RSVP"}
              </button>

              {rsvpMessages[event._id] && <p role="status">{rsvpMessages[event._id]}</p>}
            </form>
          </div>
        ))}
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
