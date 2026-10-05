import UsersTable from "components/UserTable";
import Navbar from "@/components/Navbar";

export default function Directory() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="page-title">Directory</h1>
        <div className="user-table">
          <UsersTable />
        </div>
      </main>
      <footer className="footer">© 2026 STEM Signups | All Rights Reserved</footer>
    </>
  );
}
