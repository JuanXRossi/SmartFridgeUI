"use client";
import { useState, useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";

const FEATURES = [
  {
    title: "Inventario Inteligente",
    desc: "Realiza un seguimiento automático de artículos y cantidades.",
  },
  {
    title: "Listas de Compra Automáticas",
    desc: "Genera listas de compra cuando los artículos se agotan.",
  },
  {
    title: "Uso Compartido Familiar",
    desc: "Comparte listas e inventario con los miembros de la familia.",
  },
];

const SLIDE_INTERVAL = 5000;
const SWIPE_THRESHOLD = 50;

const styles = {
  container: "w-full bg-[var(--color-lime-cream)] py-16",
  section: "max-w-6xl mx-auto px-6",
  carouselWrapper: "relative w-full overflow-hidden rounded-lg",
  
  slidesContainer: "relative w-full h-80 flex justify-center",
  slideInner: "w-full max-w-md",
  slide: "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out p-4 flex justify-center items-center",
  slideActive: "opacity-100 z-10",
  slideInactive: "opacity-0 z-0 pointer-events-none",
  buttonPrev: "hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-slate-700",
  buttonNext: "hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/80 hover:bg-white text-slate-700 rounded-full shadow-md transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-slate-700",
  dotsContainer: "flex justify-center gap-2 mt-6",
  dot: "w-3 h-3 rounded-full transition-colors duration-300 cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-slate-700",
  dotActive: "bg-slate-700",
  dotInactive: "bg-slate-300 hover:bg-slate-400",
};

export default function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (!isAutoPlaying || isHovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, isHovering]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
        setIsAutoPlaying(true);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
        setIsAutoPlaying(true);
      } else if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    setIsAutoPlaying(true);
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    setIsAutoPlaying(true);
  };
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(true);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <section className={styles.section}>
        <div className={styles.carouselWrapper}>
          <div className={styles.slidesContainer}>
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={`${styles.slide} ${
                  index === currentIndex ? styles.slideActive : styles.slideInactive
                }`}
              >
                <div className={styles.slideInner}>
                  <FeatureCard title={feature.title} desc={feature.desc} />
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={handlePrevious}
            className={styles.buttonPrev}
            aria-label="Slide anterior"
            title="Anterior (← o swipe derecha)"
          >
            ←
          </button>
          
          <button
            onClick={handleNext}
            className={styles.buttonNext}
            aria-label="Siguiente slide"
            title="Siguiente (→ o swipe izquierda)"
          >
            →
          </button>
        </div>
        
        <div className={styles.dotsContainer} role="tablist">
          {FEATURES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${
                index === currentIndex ? styles.dotActive : styles.dotInactive
              }`}
              aria-label={`Ir a slide ${index + 1} de ${FEATURES.length}`}
              aria-current={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
