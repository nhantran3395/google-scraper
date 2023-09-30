import { DatabaseClient } from "../infra";

export async function getUser(email: string) {
  return await DatabaseClient.user.findUnique({
    where: {
      email,
    },
  });
}

interface CreateUserProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
}: CreateUserProps) {
  await DatabaseClient.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });
}
