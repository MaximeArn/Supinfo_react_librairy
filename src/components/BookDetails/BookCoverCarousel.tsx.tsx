import { useRef, useState, useEffect } from "react";

interface BookCoverCarouselProps {
  covers: number[];
}

export default function BookCoverCarousel({ covers }: BookCoverCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setVisibleIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  if (!covers.length) return null;

  const scrollBy = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth;

    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      <div
        ref={carouselRef}
        className="carousel w-full rounded-box h-[420px] overflow-x-auto scroll-smooth flex gap-4"
      >
        {covers.map((coverId, index) => (
          <div
            key={coverId}
            className="carousel-item w-full flex justify-center items-center shrink-0"
          >
            <img
              src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
              alt={`Cover ${index + 1}`}
              className="w-auto h-[400px] object-contain"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-4">
        <button
          className="btn btn-sm btn-outline rounded-full"
          onClick={() => scrollBy("left")}
        >
          &lt;
        </button>
        <span className="text-sm text-base-content font-medium">
          Cover {visibleIndex + 1} of {covers.length}
        </span>
        <button
          className="btn btn-sm btn-outline rounded-full"
          onClick={() => scrollBy("right")}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
