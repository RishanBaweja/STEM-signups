import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">About</h1>
        <p className="entry-info">Here is some info about STEM Signups</p> {/*TODO: Change placeholder text*/}
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
