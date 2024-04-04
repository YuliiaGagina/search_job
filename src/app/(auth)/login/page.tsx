"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useState } from "react";
import Loginimg from "../../../assets/login.jpg";
import Image from "next/image";

interface LoginValue {
  userName: string;
}

export default function Login() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    userName: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
  });

  const onSubmit = (values: LoginValue, actions: FormikHelpers<LoginValue>) => {
    const userData = localStorage.getItem("userData");

    if (userData) {
      const { name } = JSON.parse(userData);
      if (name === values.userName) {
        router.push("/jobs");
      } else {
        setErrorMessage(
          `User with name ${values.userName} does not exist! Please register.`
        );
      }
      actions.resetForm();
    }
  };

  return (
    <div className="mb-12 pt-18 flex items-center justify-around ">
      <div>
        <Image className="w-96 h-full" src={Loginimg} alt="login" />
      </div>

      <div className="w-96 bg-stone-700 py-4 rounded-lg mb-8">
        <div>
          {errorMessage && <p>{errorMessage}</p>}
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="flex flex-col  justify-center gap-3 ">
                <label
                  className="px-12 mb-4 text-white text-bold"
                  htmlFor="userName"
                >
                  Name:
                </label>
                <Field
                  className="block w-8/12 mx-auto bg-gray-100 bg-opacity-50 rounded-md border-0 py-1.5 pl-7 pr-8 text-gray-900 ring-1 ring-inset  placeholder:text-gray focus:ring-2 ring-gray-10 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 "
                  id="userName"
                  name="userName"
                  type="text"
                />
                <ErrorMessage
                  className="px-12 text-red-700"
                  name="name"
                  component="div"
                />

                <button
                  className="rounded-md text-white mx-auto bg-orange-300 py-2 px-6 w-64 mb-4"
                  type="submit"
                >
                  Log in
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
