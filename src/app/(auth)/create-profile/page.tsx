"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../../../assets/login.jpg";
import Image from "next/image";

interface FormValues {
  name: string;
  desiredJob: string;
  description: string;
}

export default function CreateProfile() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues: FormValues = {
    name: "",
    desiredJob: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    desiredJob: Yup.string().required("Desired Job is required"),
    description: Yup.string().required("Description is required"),
  });

  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    localStorage.setItem("userData", JSON.stringify(values));
    setSuccessMessage("Registration successful!");

    actions.resetForm();

    setTimeout(() => {
      router.push("/login");
    }, 500);
  };
  return (
    <div className="mb-12 pt-18 flex items-center justify-around ">
      <div>
        <Image className="w-96 h-full" src={Login} alt="login" />
      </div>
      <div>
        <div className="w-96 bg-stone-700 py-4 rounded-lg mb-8">
          <p className="px-12 mb-4 text-orange-300 text-bold text-xl">
            Create an account
          </p>

          {successMessage && <p className="pl-12">{successMessage}</p>}
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="flex flex-col  justify-center gap-3 ">
                <label
                  className="px-12 mb-4 text-white text-bold "
                  htmlFor="name"
                >
                  Name:
                </label>
                <Field
                  className="block w-8/12 mx-auto bg-gray-100 bg-opacity-50 rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-900 ring-1 ring-inset  placeholder:text-gray focus:ring-2 ring-gray-10 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 "
                  id="name"
                  name="name"
                  type="text"
                />
                <ErrorMessage
                  className="px-12 text-red-700"
                  name="name"
                  component="div"
                />

                <label
                  className="px-12 mb-4 text-white text-bold "
                  htmlFor="desiredJob"
                >
                  Desired Job:
                </label>
                <Field
                  className="block w-8/12 mx-auto bg-gray-100 bg-opacity-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset  placeholder:text-gray focus:ring-2 ring-gray-10 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 "
                  id="desiredJob"
                  name="desiredJob"
                  type="text"
                />
                <ErrorMessage
                  className="px-12 text-red-700"
                  name="desiredJob"
                  component="div"
                />

                <label
                  className="px-12 mb-4 text-white text-bold "
                  htmlFor="description"
                >
                  Description:
                </label>

                <Field
                  className="block w-8/12 mx-auto bg-gray-100 bg-opacity-50 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset  placeholder:text-gray focus:ring-2 ring-gray-10 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 "
                  id="description"
                  name="description"
                  as="textarea"
                />
                <ErrorMessage
                  className="px-12 text-red-700"
                  name="description"
                  component="div"
                />

                <button
                  className="rounded-md text-white mx-auto bg-orange-300 py-2 px-6 w-64 mb-4"
                  type="submit"
                >
                  Register
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
