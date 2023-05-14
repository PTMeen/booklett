"use client";

import { Formik, Form } from "formik";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { signIn } from "next-auth/react";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../inputs/Button";
import { loginSchema } from "@/app/utils/formValidation";

interface Props {
  onToggle: () => void;
  onSubmit: (values: { email: string; password: string }) => void;
  isLoading: boolean;
}

function LoginForm({ onToggle, onSubmit, isLoading }: Props) {
  return (
    <div>
      <Heading
        title="Welcome back"
        subtitle="Sign in to your account"
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
      >
        <Form
          className="flex flex-col gap-8 mt-10"
          autoComplete="off"
        >
          <Input
            id="email"
            label="Email"
          />
          <Input
            id="password"
            label="Password"
            type="password"
          />

          <div className="mt-2">
            <Button
              label="Submit"
              type="submit"
              className="w-full"
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </Form>
      </Formik>
      <hr className="my-4" />
      <div className="flex flex-col gap-2">
        <Button
          label="Continue with Google"
          outline
          className="flex-1"
          icon={FcGoogle}
          disabled={isLoading}
          onClick={() => signIn("google")}
        />
        <Button
          label="Continue with Github"
          outline
          className="flex-1"
          icon={BsGithub}
          disabled={isLoading}
          onClick={() => signIn("github")}
        />
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-neutral-500">
        <p>First time on Booklett?</p>
        <button
          onClick={onToggle}
          className="font-semibold underline text-neutral-900"
        >
          Create an account
        </button>
      </div>
    </div>
  );
}
export default LoginForm;
