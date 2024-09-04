'use client';
import {
  addChecklist,
  deleteChecklist,
  updateChecklist,
} from '@/actions/actions';
import { ChecklistSelect } from '@/db/schema';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

export function NewChecklistForm({
  acSlug,
  checklist,
}: {
  acSlug: string;
  checklist?: ChecklistSelect;
}) {
  const isUpdate = !!checklist;

  const [deleteState, setDeleteState] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required(),
    content: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: checklist?.name || '',
      content: checklist?.content || '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (isUpdate) {
          await updateChecklist({
            ...values,
            aircraftSlug: acSlug,
            checklistSlug: checklist.slug,
          });
        } else {
          await addChecklist({ ...values, aircraftSlug: acSlug });
        }
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

  const onDeleteChecklist = async () => {
    await deleteChecklist(acSlug, checklist!.slug);
  };

  return (
    <>
      <form onSubmit={handleSubmit} hidden={deleteState}>
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
            {isUpdate ? 'Update' : 'Add'}
          </button>
          <button
            type="button"
            className="ms-4 border-2 border-black p-2 cursor-pointer"
            hidden={!isUpdate}
            onClick={() => setDeleteState(true)}
          >
            Delete
          </button>
        </div>
      </form>
      <div hidden={!deleteState}>
        <p>Delete?</p>
        <button
          className="border-2 border-black p-2 cursor-pointer mt-3"
          onClick={onDeleteChecklist}
        >
          Yes
        </button>
        <button
          className="ms-4 border-2 border-black p-2 cursor-pointer"
          hidden={!isUpdate}
          onClick={() => setDeleteState(false)}
        >
          No
        </button>
      </div>
    </>
  );
}
