import { useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "../components/Lightbox";

function Gallery() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await axios.get("http://localhost:5000/api/gallery");
    setImages(res.data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gallery</h2>

      <div className="row">
        {images.map((item, index) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="card-text">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

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