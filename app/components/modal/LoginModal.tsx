"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import LoginForm from "../forms/LoginForm";

function LoginModal() {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      loginModal.onClose();
      toast.success("Logged in");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Login"
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      body={
        <LoginForm
          onToggle={onToggle}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      }
    />
  );
}
export default LoginModal;
