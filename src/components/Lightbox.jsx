const API_URL = import.meta.env.VITE_API_URL;

function Lightbox({ images, currentIndex, setCurrentIndex }) {
  if (!images || currentIndex === null) return null;

  const close = () => setCurrentIndex(null);

  const prev = () => {
    setCurrentIndex(
      currentIndex === 0 ? images.length - 1 : currentIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex(
      currentIndex === images.length - 1 ? 0 : currentIndex + 1
    );
  };

  const currentImage = images[currentIndex];

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.95)", zIndex: 9999 }}
    >
      {/* Close Button */}
      <button
        className="btn btn-light position-absolute top-0 end-0 m-4"
        onClick={close}
      >
        ✖
      </button>

      {/* Prev Button */}
      <button
        className="btn btn-light position-absolute start-0 m-4"
        onClick={prev}
      >
        ◀
      </button>

      {/* Image */}
      <img
        src={`${API_URL}/uploads/${currentImage.image}`}
        alt="gallery"
        style={{
          maxHeight: "75%",
          maxWidth: "85%",
          objectFit: "contain",
          borderRadius: "8px"
        }}
        className="mb-3"
      />

      {/* Description + Date */}
      <div
        className="text-white text-center px-4"
        style={{ maxWidth: "600px" }}
      >
        <h5>{currentImage.description}</h5>
        <small className="text-muted">
          {new Date(currentImage.createdAt).toLocaleString()}
        </small>
      </div>

      {/* Next Button */}
      <button
        className="btn btn-light position-absolute end-0 m-4"
        onClick={next}
      >
        ▶
      </button>
    </div>
  );
}

export default Lightbox;