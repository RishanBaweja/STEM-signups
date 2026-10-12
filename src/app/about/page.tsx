import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">About</h1>
        <p className="entry-info">
          The mission is to teach STEM classes to the youth and have volunteers sign up to educate the youth. The
          website posts events that you can register for.
        </p>{" "}
        {/*TODO: Change placeholder text*/}
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
