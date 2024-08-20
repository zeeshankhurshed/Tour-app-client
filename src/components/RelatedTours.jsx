import React from 'react';
import { excerpt } from '../utility/index.js';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const RelatedTours = ({ relatedTours, tourId }) => {
  return (
    <div className="my-8">
      {relatedTours && relatedTours.length > 0 && (
        <>
          {relatedTours.length > 1 && (
            <h4 className="text-xl font-bold mb-4 text-center">Related Tours</h4>
          )}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="flex flex-wrap"
          >
            {relatedTours
              .filter((item) => item._id !== tourId)
              .map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
                    <Link to={`/tour/${item._id}`}>
                      <img
                        src={item.imageFile}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-3"
                      />
                    </Link>
                    <div className="flex flex-wrap mb-2">
                      {item.tags.map((tag) => (
                        <Link
                          key={tag}
                          to={`tours/tags/${tag}`}
                          className="text-blue-500 hover:underline mr-2"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-700">{excerpt(item.description, 45)}</p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

export default RelatedTours;
