import { useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "../components/Lightbox";

const API_URL = import.meta.env.VITE_API_URL;

function Gallery() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/gallery`);
      setImages(res.data);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gallery</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center text-muted">
          No Images Available
        </div>
      ) : (
        <div className="row">
          {images.map((item, index) => (
            <div className="col-md-4 col-sm-6 mb-4" key={item._id}>
              <div
                className="card shadow-sm"
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={`${API_URL}/uploads/${item.image}`}
                  alt="gallery"
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <p className="card-text text-truncate">
                    {item.description || "No description"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
}

export default Gallery;