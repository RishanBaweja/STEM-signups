import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        <Link href="/">STEM Signups</Link>
      </h1>
      <ul className="nav-list">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/events">Events</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
