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
            <p>This is the website for STEM Signups</p> {/*TODO: Change placeholder text*/}
          </div>
        </div>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
