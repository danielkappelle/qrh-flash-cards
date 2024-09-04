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

export const getAircraftBySlug = async (slug: string) => {
  const data = await db.select().from(aircraft).where(eq(aircraft.slug, slug));
  return data[0];
};

export const getChecklists = async (aircraftId?: number) => {
  if (aircraftId) {
    const data = await db
      .select()
      .from(checklist)
      .where(eq(checklist.aircraftId, aircraftId));
    return data;
  } else {
    const data = await db.select().from(checklist);
    return data;
  }
};

export const getChecklistBySlug = async (slug: string) => {
  const data = await db
    .select()
    .from(checklist)
    .where(eq(checklist.slug, slug));
  return data[0];
};

export const addAircraft = async (data: { name: string }) => {
  const slug = slugify(data.name);
  await db.insert(aircraft).values({ name: data.name, slug });
  revalidatePath('/admin');
  redirect('/admin');
};

export const addChecklist = async (data: {
  aircraftSlug: string;
  name: string;
  content: string;
}) => {
  const ac = (
    await db.select().from(aircraft).where(eq(aircraft.slug, data.aircraftSlug))
  )[0];
  const slug = slugify(data.name);
  await db.insert(checklist).values({
    name: data.name,
    slug,
    content: data.content,
    aircraftId: ac.id,
  });
  revalidatePath(`/admin/${ac.slug}`);
  redirect(`/admin/${ac.slug}`);
};

export const updateChecklist = async (data: {
  aircraftSlug: string;
  checklistSlug: string;
  name: string;
  content: string;
}) => {
  await db
    .update(checklist)
    .set({ content: data.content, name: data.name })
    .where(eq(checklist.slug, data.checklistSlug));
  revalidatePath(`/admin/${data.aircraftSlug}`);
  redirect(`/admin/${data.aircraftSlug}`);
};

export const deleteChecklist = async (acSlug: string, clSlug: string) => {
  await db.delete(checklist).where(eq(checklist.slug, clSlug));
  revalidatePath(`/admin/${acSlug}`);
  redirect(`/admin/${acSlug}`);
};
