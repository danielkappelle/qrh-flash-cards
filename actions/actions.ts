'use server';
import { eq, not } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { db } from '@/db/drizzle';
import { aircraft, checklist } from '@/db/schema';
import slugify from 'slugify';
import { redirect } from 'next/navigation';

export const getAircraft = async () => {
  const data = await db.select().from(aircraft);
  return data;
};

export const getChecklists = async () => {
  const data = await db.select().from(checklist);
  return data;
};

export const addAircraft = async (data: { name: string }) => {
  const slug = slugify(data.name);
  await db.insert(aircraft).values({ name: data.name, slug });
  revalidatePath('/admin');
  redirect('/admin');
};
