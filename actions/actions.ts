'use server';
import { auth, signIn, signOut } from '@/auth';
import { db } from '@/db/drizzle';
import { aircraft, checklist, user } from '@/db/schema';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';

const checkAuth = async () => {
  const session = await auth();
  if (!session) {
    redirect('/');
    return false;
  }
  return true;
};

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
  if (!(await checkAuth())) return;
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
  if (!(await checkAuth())) return;
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
  if (!(await checkAuth())) return;
  await db
    .update(checklist)
    .set({ content: data.content, name: data.name })
    .where(eq(checklist.slug, data.checklistSlug));
  revalidatePath(`/admin/${data.aircraftSlug}`);
  redirect(`/admin/${data.aircraftSlug}`);
};

export const deleteChecklist = async (acSlug: string, clSlug: string) => {
  if (!(await checkAuth())) return;
  await db.delete(checklist).where(eq(checklist.slug, clSlug));
  revalidatePath(`/admin/${acSlug}`);
  redirect(`/admin/${acSlug}`);
};

export const validateUserLogin = async (email: string, password: string) => {
  const result = await db.select().from(user).where(eq(user.email, email));
  if (!result.length) return null;

  //compare password
  const loginUser = result[0];
  if (await bcrypt.compare(password, loginUser.password)) {
    return loginUser;
  } else {
    return null;
  }
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return signIn('credentials', credentials);
};

export const logout = async () => {
  await signOut();
};
