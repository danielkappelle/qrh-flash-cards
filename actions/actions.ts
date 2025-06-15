'use server';
import { auth, signIn, signOut } from '@/auth';
import { getDb } from '@/db/drizzle';
import { accessToken, aircraft, checklist, user } from '@/db/schema';
import * as bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'slugify';
import { randomBytes } from 'node:crypto';
import { sendTokenMail } from './mail';
import { validateRecaptcha } from './captcha';
import { adminLoginTelegram, requestAccessTokenTelegram } from './telegram';

const checkAuth = async () => {
  const session = await auth();
  if (!session || session.user?.name !== 'admin') {
    redirect('/');
    return false;
  }
  return true;
};

export const getAircraft = async () => {
  const data = await getDb().select().from(aircraft);
  return data;
};

export const getAircraftBySlug = async (slug: string) => {
  const data = await getDb()
    .select()
    .from(aircraft)
    .where(eq(aircraft.slug, slug));
  return data[0];
};

export const getChecklists = async (aircraftId?: number) => {
  if (aircraftId) {
    const data = await getDb()
      .select()
      .from(checklist)
      .where(eq(checklist.aircraftId, aircraftId));
    return data;
  } else {
    const data = await getDb().select().from(checklist);
    return data;
  }
};

export const getChecklistBySlug = async (slug: string) => {
  const data = await getDb()
    .select()
    .from(checklist)
    .where(eq(checklist.slug, slug));
  return data[0];
};

export const addAircraft = async (data: { name: string }) => {
  if (!(await checkAuth())) return;
  const slug = slugify(data.name);
  await getDb().insert(aircraft).values({ name: data.name, slug });
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
    await getDb()
      .select()
      .from(aircraft)
      .where(eq(aircraft.slug, data.aircraftSlug))
  )[0];
  const slug = `${data.aircraftSlug}-${slugify(data.name)}`;
  await getDb().insert(checklist).values({
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
  await getDb()
    .update(checklist)
    .set({ content: data.content, name: data.name })
    .where(eq(checklist.slug, data.checklistSlug));
  revalidatePath(`/admin/${data.aircraftSlug}`);
  redirect(`/admin/${data.aircraftSlug}`);
};

export const deleteChecklist = async (acSlug: string, clSlug: string) => {
  if (!(await checkAuth())) return;
  await getDb().delete(checklist).where(eq(checklist.slug, clSlug));
  revalidatePath(`/admin/${acSlug}`);
  redirect(`/admin/${acSlug}`);
};

export const validateUserLogin = async (email: string, password: string) => {
  const result = await getDb().select().from(user).where(eq(user.email, email));
  if (!result.length) return null;

  //compare password
  const loginUser = result[0];
  if (await bcrypt.compare(password, loginUser.password)) {
    await adminLoginTelegram();
    return loginUser;
  } else {
    return null;
  }
};

export const login = async (credentials: {
  email?: string;
  password?: string;
  token?: string;
}) => {
  return signIn('credentials', credentials);
};

export const logout = async () => {
  await signOut();
};

export const generateAccessToken = async (
  email: string,
  reCaptchaToken: string
) => {
  // Validate recaptcha
  if (!validateRecaptcha(reCaptchaToken)) {
    return redirect('/');
  }

  if (!email.match(/^[a-zA-Z0-9\.\-_]+@(st\.klmfa\.nl|klm\.com)$/)) {
    throw new Error("Email doesn't end in @st.klmfa.nl or @klm.com");
  }
  const token = randomBytes(3).toString('hex');

  await requestAccessTokenTelegram(email, token);
  await getDb().insert(accessToken).values({ email, token });

  await sendTokenMail(token, email);
  redirect('/validate-token');
};

export const validateToken = async (token: string) => {
  const result = await getDb()
    .select()
    .from(accessToken)
    .where(eq(accessToken.token, token));

  if (!result.length || result[0].used) {
    return null;
  }

  await getDb()
    .update(accessToken)
    .set({ used: true })
    .where(eq(accessToken.token, token));
  return true;
};
