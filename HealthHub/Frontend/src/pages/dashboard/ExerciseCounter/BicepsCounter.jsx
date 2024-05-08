import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@material-tailwind/react";
const socket = io("http://localhost:5000");

const BicepsCounter = () => {
  const [data, setData] = useState({
    leftReps: 0,
    leftStage: "down",
    rightReps: 0,
    rightStage: "down",
  });
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const startCamera = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    };

    const stopCamera = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (isRecording) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isRecording]);

  useEffect(() => {
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
    socket.emit("image_biceps", { image: image.split(",")[1] });
  };
  const handleResetCounter = () => {
    socket.emit("reset_biceps");
  };

  useEffect(() => {
    const interval = isRecording ? setInterval(captureFrame, 100) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className=" text-surface-light">
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl "
        style={{
          backgroundImage: "url('../../../public/img/ai_trainer.jpg')",
          backgroundPosition: "center 43%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-32 md:-mt-28 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center justify-center p-4">
        <div className="flex flex-col 3xl:flex-row gap-10">
          <div>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{ width: "640px", height: "480px", display: "none" }}
            />
            {!isRecording && (
              <div className="w-[640px] h-[480px] flex items-center justify-center border-2 border-dashed p-10">
                <FontAwesomeIcon
                  icon={faCameraRetro}
                  className="text-white text-6xl"
                  beat
                />
              </div>
            )}
            {isRecording && <canvas ref={canvasRef} width="640" height="480" />}
            <div className="flex gap-5">
              {!isRecording && (
                <button
                  className="w-20 h-10 p-2 bg-green-800 text-white rounded-md mt-4"
                  onClick={handleStartRecording}
                >
                  Start
                </button>
              )}
              {isRecording && (
                <button
                  className="w-20 h-10 p-2 bg-red-800 text-white rounded-md mt-4"
                  onClick={handleStopRecording}
                >
                  Stop
                </button>
              )}
              <button
                className="w-20 h-10 p-2 bg-green-800 text-white rounded-md mt-4"
                onClick={handleResetCounter}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="flex text-white gap-10">
            <div className="flex flex-col  items-start p-2 rounded-lg w-40 h-32 bg-[#306844]  shadow-md gap-2">
              <h2 className="mx-auto">Left Arm</h2>
              <div className="flex items-center bg-green-700 p-1 rounded-lg w-20">
                <p>Reps: {data.leftReps}</p>
              </div>
              <div className="flex items-center bg-green-700 p-1 rounded-lg w-24">
                <p>Stage: {data.leftStage}</p>
              </div>
            </div>
            <div className="flex flex-col  items-start p-2 rounded-lg w-40 h-32 bg-[#306844]  shadow-md gap-2">
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
      </Card>
    </div>
  );
};

export default BicepsCounter;
