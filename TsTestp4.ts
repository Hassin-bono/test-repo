import { db } from './db';

export async function getUserById(id: string) {
  const user = await db.fetch(id);

  if (!user) {
    throw new Error(`User ${id} not found`);
  }

  return user;
}
