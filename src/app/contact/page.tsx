import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />
      <main>
        <form id="contact-form">
          <h1 className="page-title">Contact</h1>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required></textarea>
          <input type="submit" value="Submit" />
        </form>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
