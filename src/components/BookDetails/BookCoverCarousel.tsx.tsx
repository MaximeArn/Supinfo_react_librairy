interface BookCoverCarouselProps {
  covers: number[];
}

export default function BookCoverCarousel({ covers }: BookCoverCarouselProps) {
  if (!covers.length) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-2">Covers</h3>
      <div className="carousel w-full max-w-xl mx-auto rounded-box">
        {covers.map((coverId, index) => (
          <div
            key={coverId}
            id={`cover-${index}`}
            className="carousel-item w-full justify-center"
          >
            <img
              src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
              alt={`Cover ${index + 1}`}
              className="w-auto max-h-[400px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
