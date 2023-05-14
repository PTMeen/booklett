"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import RegisterForm from "../forms/RegisterForm";
import useLoginModal from "@/app/hooks/useLoginModal";

function RegisterModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", values);
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      registerModal.onClose();
      toast.success("Account created");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Register"
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      body={
        <RegisterForm
          onSubmit={handleSubmit}
          onToggle={toggle}
          isLoading={isLoading}
        />
      }
    />
  );
}
export default RegisterModal;
