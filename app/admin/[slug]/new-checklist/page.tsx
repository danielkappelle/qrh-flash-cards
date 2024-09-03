'use client';

import { addAircraft, addChecklist } from '@/actions/actions';
import { BackButton } from '@/ui/back-button';
import { EndOfPage } from '@/ui/end-of-page';
import { Title } from '@/ui/title';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewChecklist({ params }: { params: { slug: string } }) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    content: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await addChecklist({ ...values, aircraftSlug: params.slug });
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
      <div className="w-1/3 border-8 border-black bg-white p-4">
        <BackButton name={params.slug} url={`/admin/${params.slug}`} />
        <Title title="New memory items" />
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
            <label htmlFor="content" className="block">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={15}
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
              className="block w-full mt-2 p-2 border-2 border-black outline-none"
              required
              autoComplete="off"
            ></textarea>
            {touched.content && errors.content && (
              <p className="italic">Enter valid content!</p>
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
      </div>
    </>
  );
}
