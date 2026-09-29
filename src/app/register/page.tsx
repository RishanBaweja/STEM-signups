import Navbar from "@/components/Navbar";

export default function Register() {
  return (
    <>
      <Navbar />
      <main>
        <form id="register-form">
          <h1 className="page-title">Register</h1> {/*TODO: Implement form functionality*/}
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
          <input type="submit" value="Register" />
        </form>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
