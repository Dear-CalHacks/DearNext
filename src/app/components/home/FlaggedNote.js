import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="border rounded-md p-2 flex flex-col items-center mb-4 hover:bg-neutral-100 transition-all duration-300 ease-in-out shadow-xs">
      <h2 className="font-bold ">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;



