import { db } from './db';

export async function getUserById(id: string) {
  const user = await db.users.findUnique({
    where: { id },
  });

  return user;
}
