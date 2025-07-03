import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar, FaTicketAlt } from 'react-icons/fa';
import '../../styles/featured-events.css';

const FeaturedEventsCarousel = ({ events = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      prevIndex + newDirection < 0 
        ? events.length - 1 
        : prevIndex + newDirection >= events.length 
          ? 0 
          : prevIndex + newDirection
    ));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  if (!events.length) return null;

  return (
    <div className="featured-events-carousel">
      <div className="carousel-container">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className="carousel-slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <div className="event-content">
              <div className="event-image-container">
                <img src={events[currentIndex].image} alt={events[currentIndex].title} />
                <div className="event-overlay">
                  <span className="featured-badge">
                    <FaStar /> Destacado
                  </span>
                </div>
              </div>
              <div className="event-info">
                <h3>{events[currentIndex].title}</h3>
                <p className="event-date">{events[currentIndex].date}</p>
                <p className="event-location">{events[currentIndex].location}</p>
                <div className="event-price">
                  <FaTicketAlt />
                  <span>{events[currentIndex].price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="carousel-button prev"
          onClick={() => paginate(-1)}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button next"
          onClick={() => paginate(1)}
        >
          <FaChevronRight />
        </button>

        <div className="carousel-dots">
          {events.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEventsCarousel; 