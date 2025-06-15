'use client';
import { generateAccessToken } from '@/actions/actions';
import { EndOfPage } from '@/ui/end-of-page';
import { Note } from '@/ui/note';
import { Title } from '@/ui/title';
import { useFormik } from 'formik';
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from 'react-google-recaptcha-v3';
import toast from 'react-hot-toast';
import * as yup from 'yup';

export default function RequestTokenForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const schema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9\.\-_]+@(st\.klmfa\.nl|klm\.com)$/)
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (!executeRecaptcha) {
          console.error('ReCAPTCHA not available');
          return;
        }

        const gRecaptchaToken = await executeRecaptcha('requestToken');
        await generateAccessToken(values.email, gRecaptchaToken);
      } catch (e) {
        toast.error('Something went wrong');
        console.error('Something went wrong');
        console.error(e);
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
      <Title title="Request access" />
      <Note
        type="Note"
        content="The content of this website is only available to KLM FA students / KLM employees. If you are one, please request an access token below. Make sure your email address ends in @st.klmfa.nl or @klm.com."
      ></Note>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label htmlFor="name" className="block">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="block w-full mt-2 p-2 border-2 border-black outline-none"
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john.doe@st.klmfa.nl or john.doe@klm.com"
          ></input>
          {touched.email && errors.email && (
            <p className="italic">Enter a valid email!</p>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="border-2 border-black p-2 cursor-pointer"
            disabled={!dirty || !isValid}
          >
            Request access
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
