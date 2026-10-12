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

export default function Event({ event }: { event: eventData }) {
  const eventSplit = event.eventDate.split("T");
  const eventDate = eventSplit[0];
  return (
    <>
      <tr>
        <th>Host</th>
        <th>Location</th>
        <th>Date</th>
        <th>STEM subjects</th>
      </tr>
      <tr>
        <td>{event.hostName.join(", ") ?? "—"}</td>
        <td>{event.hostLocation}</td>
        <td>{eventDate}</td>
        <td>{event.eventSubject.join(", ") ?? "—"}</td>
      </tr>
    </>
  );
}
