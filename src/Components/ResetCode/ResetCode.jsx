import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validationSchemaReset } from "../Validation/Validation.jsx";

export default function ResetCode() {
  let [apiError, setApiError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  async function reset(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      if(data.status == 'Success'){
        window.location.href = '/reset-password';
      }
    } catch (error) {
      setApiError(error?.response.data.message);
    }
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchemaReset,
    onSubmit: reset,
  });

  return (
    <div data-aos="fade-left" className="mx-5 md:mx-0 my-28">
      <h2 className="text-center text-3xl my-12">Reset Code</h2>
      {apiError && (
        <div
          className="p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:text-red-400 w-1/2 mx-auto text-center text-xl"
          role="alert"
        >
          {apiError}
        </div>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className=" flex items-center flex-col"
      >
        <div className="mb-5 w-full md:w-1/2 flex justify-center">
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="resetCode"
              id="code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Code
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-main w-full md:w-1/2 rounded py-2 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
