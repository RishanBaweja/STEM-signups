import Navbar from "@/components/Navbar";
import UsersTable from "@/components/UserTable";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">STEM Signups</h1>
        <div className="about">
          <div className="about-text">
            <p>
              This is a website for STEM Signups. You can sign up to be an educator or website admin. Educators can then
              RSVP for STEM events to volunteer for them.{" "}
            </p>{" "}
            {/*TODO: Change placeholder text*/}
          </div>
        </div>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
