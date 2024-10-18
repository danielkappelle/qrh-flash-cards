'use client';

import { login } from '@/actions/actions';
import { EndOfPage } from '@/ui/end-of-page';
import { Note } from '@/ui/note';
import { Title } from '@/ui/title';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

export default function ValidateTokenPage() {
  const router = useRouter();

  const schema = yup.object().shape({
    token: yup
      .string()
      .matches(/^[a-zA-Z0-9]+$/)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await login({ token: values.token });
        router.push('/');
      } catch {
        console.error('Something went wrong');
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
    <>
      <Title title="Validate token" />
      <Note
        type="Note"
        content="If your email address is valid, you should have received an access token. Enter it below."
      ></Note>
      <Note
        type="Caution"
        content="It is possible the email landed in your spam folder, double check there and mark it as not spam."
      ></Note>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">
            Token
          </label>
          <input
            type="text"
            id="token"
            name="token"
            className="block w-full mt-2 p-2 border-2 border-black outline-none"
            required
            value={values.token}
            onChange={handleChange}
            onBlur={handleBlur}
          ></input>
          {touched.token && errors.token && (
            <p className="italic">Enter a valid token!</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="border-2 border-black p-2 cursor-pointer"
            disabled={!dirty || !isValid}
          >
            Validate
          </button>
        </div>
      </form>
      {/* <div hidden={!incorrectState}>
        <Note type="Error" content="Invalid credentials" />
      </div> */}
      <EndOfPage />
    </>
  );
}
