import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaUser } from 'react-icons/fa';
import '../../styles/testimonials.css';

const TestimonialsCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5
    })
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  if (!testimonials.length) return null;

  return (
    <div className="testimonials-section">
      <motion.div
        className="testimonials-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Lo que dicen nuestros usuarios</h2>
        <p>Experiencias reales de la comunidad TicketSafer</p>
      </motion.div>

      <div className="testimonials-carousel">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className="testimonial-card neural-glass"
            custom={direction}
            variants={testimonialVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
          >
            <div className="quote-icon start">
              <FaQuoteLeft />
            </div>
            
            <div className="testimonial-content">
              <div className="testimonial-text">
                {testimonials[currentIndex].text}
              </div>

              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < testimonials[currentIndex].rating ? 'active' : ''}
                  />
                ))}
              </div>

              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonials[currentIndex].avatar ? (
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className="author-info">
                  <div className="author-name">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="author-role">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="quote-icon end">
              <FaQuoteRight />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel; 