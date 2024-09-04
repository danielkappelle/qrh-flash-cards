'use client';

import { addAircraft } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewAircraft() {
  const schema = yup.object().shape({
    name: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await addAircraft(values);
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
      <BackButton name="Admin" url="/admin" />
      <Title title="New aircraft"></Title>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="block w-full mt-2 p-2 border-2 border-black outline-none"
            required
            autoComplete="off"
          ></input>
          {touched.name && errors.name && (
            <p className="italic">Enter a valid name!</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="border-2 border-black p-2 cursor-pointer"
            disabled={!dirty || !isValid}
          >
            Add
          </button>
        </div>
      </form>
      <EndOfPage />
    </>
  );
}
