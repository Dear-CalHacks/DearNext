// components/AudioStreamer.js
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const AudioStreamer = ({ isRecording, setAudioContext, setMediaStream }) => {
    const audioContextRef = useRef(null);
    const mediaStreamRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io('ws://localhost:3000'); // Adjust URL to your server
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        const startRecording = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('Your browser does not support audio input!');
                return;
            }
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStreamRef.current = stream;
            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;

            // Pass audioContext and mediaStream to parent component
            setAudioContext(audioContext);
            setMediaStream(stream);

            // Here you can handle sending audio data to the server via WebSocket if needed
        };

        const stopRecording = () => {
            if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach(track => track.stop());
                mediaStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }

            // Reset audioContext and mediaStream in parent component
            setAudioContext(null);
            setMediaStream(null);
        };

        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }

        // Cleanup on unmount
        return () => {
            stopRecording();
        };
    }, [isRecording]);

    return null; // No need to render anything
};

export default AudioStreamer;