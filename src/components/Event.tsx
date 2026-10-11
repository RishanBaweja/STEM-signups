export type eventData = {
  hostName: string[];
  hostLocation: string;
  postDate: string;
  eventDate: string;
  eventTime: string;
  eventSubject: string[];
  attendees: string[];
};

export default function Event({ event }: { event: eventData }) {
  return (
    <tr>
      <td>{event.hostName.join(", ") ?? "—"}</td>
      <td>{event.hostLocation}</td>
      <td>{event.postDate}</td>
      <td>{event.eventDate}</td>
      <td>{event.eventTime}</td>
      <td>{event.eventSubject.join(", ") ?? "—"}</td>
      <td>{event.attendees?.join(", ") ?? "—"}</td>
    </tr>
  );
}
