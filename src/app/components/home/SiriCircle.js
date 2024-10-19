import { useEffect, useState } from 'react';

export default function SiriDonuts({ sentence }) {
  const [scales, setScales] = useState([1, 1, 1, 1, 1]);
  const words = sentence.split(' ');

  useEffect(() => {
    let wordIndex = 0;

    const interval = setInterval(() => {
      const currentWord = words[wordIndex % words.length];
      const transitionSpeed = Math.max(200, currentWord.length * 100); // Longer word -> slower transition

      setScales((prevScales) =>
        prevScales.map((_, index) => Math.sin(Date.now() / transitionSpeed + index) * 0.25 + 1)
      );

      wordIndex++;
    }, 10); // Switch word every 500ms

    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="relative flex items-center justify-center w-96 h-96">
      {scales.map((scale, index) => (
        <div
          key={index}
          className={`absolute border-2 border-black rounded-full opacity-70`}
          style={{
            width: `${150 + index * 30}px`,
            height: `${150 + index * 30}px`,
            transform: `scale(${scale})`,
            transition: `transform 0.3s ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}