import Navbar from "@/components/Navbar";

import Image from "next/image";

export default function Events() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">Events</h1>
        <div className="event">
          {/* TODO: Replace the placeholder image and alt text. */}
          <Image src="/placeholder.jpg" alt="Alt Text" id="event-image" width={612} height={612} />{" "}
          <div className="event-details">
            <div className="event-name">
              <h2>Event 1</h2> {/*TODO: Change placeholder text*/}
            </div>
            <p className="event-description">This is an event</p> {/*TODO: Change placeholder text*/}
            {/* TODO: Add the event RSVP destination. */}
            <a href="" className="RSVP">
              RSVP
            </a>
          </div>
        </div>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
