"use client";

import { Dialog, Transition } from "@headlessui/react";
import { ReactElement, Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../inputs/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  body: ReactElement;
}

function Modal({ isOpen, onClose, title, body }: Props) {
  return (
    <Transition
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 items-center bg-black/50"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-start justify-center overflow-y-auto md:items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 -translate-y-full "
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={`flex flex-col w-full gap-8  bg-white rounded-lg md:w-[650px] transition duration-300 mb-6
    }`}
            >
              <Dialog.Title className="text-center">
                <div className="relative flex items-center justify-center font-semibold border-b-[1px] border-neutral-200 py-6">
                  <p className="text-lg">{title}</p>
                  <button
                    onClick={onClose}
                    className="absolute right-3 border-[1px] border-neutral-300 text-neutral-600 rounded-lg p-2"
                  >
                    <AiOutlineClose size={18} />
                  </button>
                </div>
              </Dialog.Title>

              {/* BODY */}
              <div className="px-6 pb-8">{body}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
