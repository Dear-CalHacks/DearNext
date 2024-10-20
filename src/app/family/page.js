"use client";

import { useState, useRef } from "react";
import {
  HomeIcon,
  HeartIcon,
  UserGroupIcon,
	BookmarkIcon,
	CogIcon,
  MicrophoneIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import SiriCircle from "../components/home/SiriCircle";

const navigation = [
	{ name: "Home", href: "/home", icon: HomeIcon, current: false },
	{ name: "Family", href: "/family", icon: HeartIcon, current: true },
	{
		name: "Saved Notes",
		href: "/bookmarks",
		icon: BookmarkIcon,
		current: false,
	},
	{ name: "Settings", href: "/settings", icon: CogIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  // State Variables
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [relation, setRelation] = useState("");
  const [memories, setMemories] = useState("");

  const [isRecording, setIsRecording] = useState(false);
  const [audioContext, setAudioContext] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const mediaRecorderRef = useRef(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData objects
    const formData = new FormData();
    const audioData = new FormData();

    // Append the audio file if available
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      audioData.append("audio", audioBlob, "voiceRecording.webm"); // Changed 'audiofile' to 'audio'
    }

    // Append patient_id (replace with actual patient ID or retrieve from context)
    const patient_id = "12345"; // Replace with actual patient ID or retrieve from context
    formData.append("patient_id", patient_id);
    audioData.append("patient_id", patient_id);

    // Append other form data
    formData.append("name", name);
    formData.append("age", age);
    formData.append("relation", relation);
    formData.append("memories", memories);

    try {
      console.log("Sending request to /cartesia/cloneVoice");
    
      const response = await fetch("http://localhost:5000/cartesia/cloneVoice", {
        method: "POST",
        body: audioData,
      });
    
      if (response.ok) {
        // Handle success case
        const responseData = await response.json(); // Parse JSON response
        console.log("Audio uploaded successfully", responseData);
        alert("Audio uploaded successfully!");
      } else {
        // Handle client (4xx) and server (5xx) errors
        try {
          const errorData = await response.json();
          console.error("Failed to upload audio:", errorData.error || errorData.details);
          alert(`Audio Upload Error: ${errorData.error || errorData.details}`);
        } catch (jsonError) {
          // Response isn't JSON, handle as plain text
          const errorText = await response.text();
          console.error("Failed to upload audio (non-JSON response):", errorText);
          alert(`Audio Upload Error: ${errorText}`);
        }
      }
    } catch (error) {
      // Handle unexpected errors like network failures
      console.error("Unexpected error uploading Audio:", error);
      alert("An unexpected error occurred during audio upload.");
    }
    
    try {
      const response = await fetch("/db/insertContent", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Content inserted successfully");
        // Reset form fields
        setName("");
        setAge("");
        setRelation("");
        setMemories("");
        setAudioChunks([]);
        alert("Family member added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error inserting content:", errorData.error);
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Unexpected error uploading Data:", error);
      alert("An unexpected error occurred during data upload.");
    }
  };

  // Handle recording
  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(audioCtx);
        setMediaStream(stream);

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          setAudioChunks(chunks);
          // Clean up
          stream.getTracks().forEach((track) => track.stop());
          setAudioContext(null);
          setMediaStream(null);

          // Create a Blob from the chunks
          const audioBlob = new Blob(chunks, { type: "audio/webm" });

          // Note: We're not uploading here; upload occurs on form submission
          console.log("Recording stopped and audio chunks saved.");
        };

        mediaRecorder.start();
        setIsRecording(true);
        console.log("Recording started.");
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone. Please check permissions.");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen text-neutral-700">
        {/* Desktop Sidebar */}
				<div className="flex flex-col min-w-64">
					<div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
					<div className="flex h-16 items-center justify-center pt-5">
							<Image
								src="/deer-image.avif"
								alt="Your Company"
								width={56}
								height={56}
								className="h-12 w-auto rounded-md"
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
															? "bg-gray-50 text-slate-900"
															: "text-gray-700 hover:bg-gray-50 hover:text-slate-900",
														"group flex gap-x-3 rounded-md p-6 text-sm font-semibold leading-6"
													)}
												>
													<item.icon
														aria-hidden="true"
														className={classNames(
															item.current
																? "text-slate-900"
																: "text-gray-400 group-hover:text-slate-900",
															"h-6 w-6 shrink-0"
														)}
													/>
													{item.name}
												</a>
											</li>
										))}
									</ul>
								</li>

								<li className="hidden -mx-6 mt-auto">
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
        <div className="w-1/2 min-h-screen flex flex-col items-center justify-start p-10 bg-[#F5F7F8]">
          <div className="w-full text-start flex justify-between mb-6">
            <h1 className="text-2xl font-bold">Add Family Member</h1>
          </div>
          <form
            className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            {/* Name Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Age Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="0"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Relation Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="relation"
              >
                Relation
              </label>
              <input
                id="relation"
                type="text"
                placeholder="Enter Relationship"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Memories Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="memories"
              >
                Memories
              </label>
              <textarea
                id="memories"
                placeholder="Enter memories associated with the patient"
                value={memories}
                onChange={(e) => setMemories(e.target.value)}
                required
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>

            {/* Recording Section */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Voice Recording
              </label>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={toggleRecording} // Ensure toggleRecording is defined
                  className={`${
                    isRecording
                      ? "bg-red-500 text-white"
                      : "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  } font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline inline-flex items-center`}
                  style={{ order: 1 }}
                >
                  {isRecording ? (
                    <>
                      <StopIcon className="h-5 w-5 mr-2" /> Stop Recording
                    </>
                  ) : (
                    <>
                      <MicrophoneIcon className="h-5 mr-2" /> Start Recording
                    </>
                  )}
                </button>
                {audioChunks.length > 0 && (
                  <span
                    className="text-green-600 font-semibold"
                    style={{ order: 2 }}
                  >
                    Recording Saved!
                  </span>
                )}
              </div>
              {/* Siri Waveform */}
              {isRecording && audioContext && mediaStream && (
                <div className="mt-4 flex justify-center">
                  <SiriCircle
                    audioContext={audioContext}
                    mediaStream={mediaStream}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Content Area 2 */}
        <div className="w-1/2 border-l p-10">
          <h1 className="text-2xl font-bold mb-6">Family Members</h1>
          {/* Existing Family Members Data */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">Age: 45</p>
              <p className="text-gray-600">Relation: Brother</p>
              <p className="text-gray-600 mt-2">
                Memories: Shared trips to the mountains.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Jane Smith</h2>
              <p className="text-gray-600">Age: 38</p>
              <p className="text-gray-600">Relation: Sister</p>
              <p className="text-gray-600 mt-2">
                Memories: Family gatherings during holidays.
              </p>
            </div>
            {/* Add more family member cards as needed */}
          </div>
        </div>
      </div>
    </>
  );
}
