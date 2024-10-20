// components/SiriWaveform.js
import React, { useEffect, useRef } from 'react';

const SiriWaveform = ({ audioContext, mediaStream }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const analyserRef = useRef();

    useEffect(() => {
        if (!audioContext || !mediaStream) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;

        const source = audioContext.createMediaStreamSource(mediaStream);
        source.connect(analyser);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestRef.current = requestAnimationFrame(draw);

            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, average * 0.95, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(229, 229, 229, ${Math.min(1, average / 128)})`;  // Blue, opacity based on volume
            ctx.fill();
        };

        draw();
        return () => {
            cancelAnimationFrame(requestRef.current);
            analyser.disconnect();
            source.disconnect();
        };
    }, [audioContext, mediaStream]);

    return (
        <canvas ref={canvasRef} width="300" height="300" className="bg-black rounded-full"></canvas>
    );
};

export default SiriWaveform;