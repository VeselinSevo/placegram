import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Counter to ensure unique class names
let carouselCounter = 0;

const Carousel = ({ images }) => {
    const carouselId = useRef(`carousel-${carouselCounter++}`);

    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    renderBullet: (index, className) =>
                        `<span class="${className} bg-text dark:bg-text-dark"></span>`,
                }}
                navigation={{
                    nextEl: `.${carouselId.current}-next`,
                    prevEl: `.${carouselId.current}-prev`,
                }}
                className="rounded-lg shadow-lg"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Custom Navigation Buttons */}
            <div
                className={`${carouselId.current}-prev absolute top-1/2 hidden md:flex transform -translate-y-1/2 left-2 w-10 h-10  items-center justify-center rounded-full text-text dark:text-text-dark bg-opacity-50 dark:bg-opacity-60 bg-bg dark:bg-bg-dark cursor-pointer z-10`}
            >
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
            </div>
            <div
                className={`${carouselId.current}-next absolute top-1/2 hidden md:flex transform -translate-y-1/2 right-2 w-10 h-10 items-center justify-center rounded-full text-text dark:text-text-dark bg-opacity-50 dark:bg-opacity-60 bg-bg dark:bg-bg-dark cursor-pointer z-10`}
            >
                <FontAwesomeIcon icon={faAngleRight} size="lg" />
            </div>
        </div>
    );
};

export default Carousel;
