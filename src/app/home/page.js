"use client";

import { useState, useEffect, useRef } from "react";
import FlaggedNote from "../components/home/FlaggedNote";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
  FolderIcon,
  HeartIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SiriCircle from "../components/home/SiriCircle";

const navigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: true },
  { name: "Family", href: "/family", icon: HeartIcon, current: false },
  { name: "Friends", href: "/friends", icon: UserGroupIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition. Please use Chrome or Edge.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcriptChunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptChunk;
        } else {
          interimTranscript += transcriptChunk;
        }
      }
      setTranscript(finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <>
      <div className="flex h-screen text-neutral-700">
        {/* Desktop Sidebar */}
        <div className="flex flex-col min-w-64">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex h-16 items-center">
              <Image
                src="/advait.jpeg"
                alt="Your Company"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                            "group flex gap-x-3 rounded-md p-6 text-sm font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              item.current
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0"
                            )}
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <Image
                      src="/advait.jpeg"
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Joe Biden</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Content Area 1 */}
        <div className="w-1/2 min-h-screen flex flex-col items-center justify-between p-10 bg-gray-50">
          <div className="w-full text-start flex justify-between">
            <h1 className="text-2xl font-bold">Conversation</h1>
            <PhoneIcon
              className={`h-7 w-7 mr-2 mt-1 cursor-pointer ${
                isRecording ? "text-red-500" : "text-green-400 hover:text-green-600"
              }`}
              aria-hidden="true"
              onClick={toggleRecording}
            />
          </div>

          <div className="flex-grow flex-col flex items-center justify-center">
            <SiriCircle sentence={transcript || "Say something..."} />
            <h1 className="pt-24 font-bold">
              {transcript ? `"${transcript}"` : 'Click the microphone to start speaking'}
            </h1>
          </div>
          <div className="h-20"></div>
        </div>

        {/* Content Area 2 */}
        <div className="w-1/2 border-l">
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Conversation Notes</h1>
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
            <FlaggedNote
              title="Important Note"
              description="This is an important note."
            />
          </div>
        </div>
      </div>
    </>
  );
}