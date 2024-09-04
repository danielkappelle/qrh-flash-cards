'use client';
import { login } from '@/actions/actions';
import { EndOfPage } from '@/ui/end-of-page';
import { Note } from '@/ui/note';
import { Title } from '@/ui/title';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get('callbackUrl') || '/admin';
  const [incorrectState, setIncorrectState] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        setIncorrectState(false);
        await login(values);
        router.push(redirectUrl);
      } catch {
        console.error('Something went wrong');
        setIncorrectState(true);
      }
    },
  });

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    dirty,
    isValid,
  } = formik;

  return (
    <div className="w-1/3 border-8 border-black bg-white p-4">
      <Title title="Login" />
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full mt-2 p-2 border-2 border-black outline-none"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.email && errors.email && (
            <p className="italic">Enter a valid email!</p>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="name" className="block">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="block w-full mt-2 p-2 border-2 border-black outline-none"
            required
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.password && errors.password && (
            <p className="italic">Enter a password!</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="border-2 border-black p-2 cursor-pointer"
            disabled={!dirty || !isValid}
          >
            Login
          </button>
        </div>
      </form>
      <div hidden={!incorrectState}>
        <Note type="Error" content="Invalid credentials" />
      </div>
      <EndOfPage />
    </div>
  );
}
