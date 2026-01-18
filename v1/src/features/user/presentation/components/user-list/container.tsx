import { getUsers } from "@/features/user/application/get-users";
import { diContainer } from "@/shared/lib/di-container";
import { Presenter } from "./presenter";

export const Container = async () => {
  const users = await getUsers({
    userRepository: diContainer.userRepository,
  });

  return <Presenter users={users} />;
};
