import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MediaSlider = ({ mediaLinks, onOpenModal }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % mediaLinks.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + mediaLinks.length) % mediaLinks.length);
    };

    return (
        <div
            className="relative mt-4 h-[40vh] sm:h-[50vh] md:h-[50vh] lg:h-[60vh] xl:h-[75vh] overflow-hidden"
        >
            <AnimatePresence>
                <motion.div
                    key={currentSlide}
                    className="absolute w-full h-full"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={mediaLinks[currentSlide].url}
                        alt="Post Media"
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onOpenModal(mediaLinks[currentSlide].url)}
                    />
                </motion.div>
            </AnimatePresence>
            
            {/* Show arrows only if focused */}
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
                    >
                        <FaChevronRight />
                    </button>
                </>
        </div>
    );
};

export default MediaSlider;
