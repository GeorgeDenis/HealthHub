import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ExerciseCounter = () => {
  const [data, setData] = useState({
    leftReps: 0,
    leftStage: "down",
    rightReps: 0,
    rightStage: "down",
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      videoRef.current.srcObject = stream;
    });

    socket.on("response", (data) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${data.image}`;
      image.onload = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(
          image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height,
        );
      };
      setData(data.data);
    });

    return () => {
      socket.off("response");
    };
  }, []);

  const captureFrame = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/jpeg");
    socket.emit("image", { image: image.split(",")[1] });
  };
  const handleResetCounter = () => {
    socket.emit("reset");
  };

  useEffect(() => {
    const interval = setInterval(captureFrame, 100);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    handleResetCounter();
  }, []);

  return (
    <div className="flex gap-10">
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "640px", height: "480px", display: "none" }}
        />
        <canvas ref={canvasRef} width="640" height="480" />
        <button
          className="w-20 h-10 p-2 bg-green-800 text-white rounded-md mt-4"
          onClick={handleResetCounter}
        >
          Reset
        </button>
      </div>
      <div className="flex text-white gap-10">
        <div className="flex flex-col  items-start p-2 rounded-lg w-40 h-32 bg-green-500 shadow-md gap-2">
          <h2 className="mx-auto">Left Arm</h2>
          <div className="flex items-center bg-green-700 p-1 rounded-lg w-20">
            <p cl>Reps: {data.leftReps}</p>
          </div>
          <div className="flex items-center bg-green-700 p-1 rounded-lg w-24">
            <p>Stage: {data.leftStage}</p>
          </div>
        </div>
        <div className="flex flex-col  items-start p-2 rounded-lg w-40 h-32 bg-green-500 shadow-md gap-2">
          <h2 className="mx-auto">Right Arm</h2>
          <div className="flex items-center bg-green-700 p-1 rounded-lg w-20">
            <p>Reps: {data.rightReps}</p>
          </div>
          <div className="flex items-center bg-green-700 p-1 rounded-lg w-24">
            <p>Stage: {data.rightStage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCounter;
