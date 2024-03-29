import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useUser } from "@/context/LoginRequired";
import api, { s3 } from "../../../services/api";
import { toast } from "react-toastify";

const MeasurementsPhotos = () => {
  const currentUser = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await api.get(
          `/api/v1/LoggedMeasurements/get-photos/${currentUser.userId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          },
        );
        if (response.status === 200) {
          setPhotos(response.data.photos);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch photo metadata");
      }
    };

    fetchPhotos();
  }, [currentUser]);

  useEffect(() => {
    const sortedMeasurements = photos.sort((a, b) => {
      return new Date(b.dateLogged) - new Date(a.dateLogged);
    });
    setPhotos(sortedMeasurements);
    const fetchPhotosAws = async () => {
      const fetchPromises = photos.map((photo) => {
        return new Promise((resolve, reject) => {
          if (photo.cloudUrl) {
            s3.getObject(
              {
                Bucket: "ergo-project",
                Key: photo.cloudUrl,
              },
              (err, data) => {
                if (err) {
                  console.error("Error fetching from AWS S3", err);
                  toast.error("Failed to fetch image from AWS S3");
                  reject(err);
                } else if (data.Body) {
                  resolve({
                    ...photo,
                    photo: URL.createObjectURL(new Blob([data.Body])),
                  });
                }
              },
            );
          } else {
            resolve(null);
          }
        });
      });

      Promise.all(fetchPromises)
        .then((data) => {
          const validPhotos = data.filter((file) => file !== null);
          setPhotos(validPhotos);
        })
        .catch((error) => {
          console.error("Failed to fetch one or more files from AWS S3", error);
          toast.error("Failed to fetch one or more files from AWS S3");
        });
    };

    if (photos.length > 0) {
      fetchPhotosAws();
    }
  }, [photos.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <>
      {photos.length !== 0 && (
        <div className="flex flex-col items-center">
          <div className="max-w-[1400px] h-[320px] md:h-[500px] lg:h-[780px] w-[75%] m-auto py-16 px-4 relative group bg-cover">
            <div className="w-full h-full rounded-2xl bg-center bg-cover duration-500 bg-surface-dark">
              <div
                style={{
                  backgroundImage: `url(${photos[currentIndex].photo})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
                className="rounded-2xl duration-500"
              ></div>
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronLeftIcon onClick={prevSlide} />
            </div>
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronRightIcon onClick={nextSlide} />
            </div>
          </div>
          <div className="flex items-center -mt-8 text-surface-light bg-surface-dark rounded-md p-2">
            {photos[currentIndex].dateLogged.split("T")[0]}
          </div>
        </div>
      )}
    </>
  );
};

export default MeasurementsPhotos;
