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

export default function Event({ event }: { event: eventData }) {
  const eventSplit = event.eventDate.split("T");
  const eventDate = eventSplit[0];
  return (
    <tr>
      <td>{event.eventName}</td>
      <td>{event.hostName.join(", ") ?? "—"}</td>
      <td>{event.hostLocation}</td>
      <td>{event.eventDescription}</td>
      <td>{eventDate}</td>
      <td>{event.eventSubject.join(", ") ?? "—"}</td>
    </tr>
  );
}
