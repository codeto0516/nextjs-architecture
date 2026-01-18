import { User } from "@/features/user/domain/user.types";

interface PresenterProps {
  users: User[];
}

export const Presenter = ({ users }: PresenterProps) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
