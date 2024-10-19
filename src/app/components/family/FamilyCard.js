import React from 'react';

const Card = ({ name, details, age, occupation, relationship }) => {
  return (
    <div className="border rounded-md p-2 flex flex-col mb-4 hover:bg-neutral-100 transition-all duration-300 ease-in-out shadow-xs">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold ">{name}</h2>
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-semi text-sm py-0.5 px-2 rounded-sm">
            edit
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-semi text-sm py-0.5 px-2 rounded-sm ml-2">
            add
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Occupation:</strong> {occupation}</p>
        <p><strong>Relationship:</strong> {relationship}</p>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default Card;

