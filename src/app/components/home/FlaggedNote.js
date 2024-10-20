import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div className="border rounded-md p-2 items-center mb-4 hover:bg-neutral-100 transition-all duration-300 ease-in-out shadow-xs w-4/5">
      <h2 className="px-1 flex justify-start font-bold">{title}</h2>
      <p className='px-1'>{description}</p>
    </div>
  );
};

export default Card;



