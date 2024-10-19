import React from "react";
import {
	ClipboardIcon,
  DocumentPlusIcon
} from "@heroicons/react/24/outline";

const Card = ({ userID, patientID, name, occupation, relationship, cartesiaVoiceId }) => {
	return (
		<div className="border rounded-md p-2 flex flex-col mb-4 hover:bg-neutral-100 transition-all duration-300 ease-in-out shadow-xs">
			<div className="flex justify-between items-center">
				<h2 className="text-lg font-bold ">{name}<span className="font-light">{' - '}{relationship}</span></h2>
			<h2 className="text-lg font-semi">#{userID}</h2>
				<div className="flex">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-semi text-sm py-0.5 px-2 rounded-md">
						<ClipboardIcon className="h-5 w-5" aria-hidden="true" />
					</button>
					<button className="bg-green-500 hover:bg-green-700 text-white font-semi text-sm py-0.5 px-2 rounded-md ml-2">
          <DocumentPlusIcon className="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
			<div className="flex flex-col">
			</div>
		</div>
	);
};

export default Card;
