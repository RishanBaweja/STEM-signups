type UserData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: "educator" | "admin";
  educatorInfo?: {
    isVerified: boolean;
    stemSubjects: string[];
  };
};

export default function User({ user }: { user: UserData }) {
  return (
    <tr>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.educatorInfo?.stemSubjects.join(", ") ?? "—"}</td>
    </tr>
  );
}
