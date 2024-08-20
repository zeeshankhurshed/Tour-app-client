import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import { getRelatedTours, getTour } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import RelatedTours from '../components/RelatedTours';
import DisqusThread from '../components/DisqusThread';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SingleTour = () => {
  const { tour, loading, error } = useSelector((state) => ({ ...state.tour.tour }));
  const { relatedTours } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  const { id } = useParams();

  const tags = tour?.tags || [];

  useEffect(() => {
    if (tags.length > 0) {
      dispatch(getRelatedTours(tags)); // Pass tags to get related tours
    }
  }, [tags, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <p><Spinner /></p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!tour) {
    return <p>Tour not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto my-28 p-6 bg-white rounded-lg shadow-md">
      {tour && (
        <>
          <div className="relative h-64">
            <img
              src={tour.imageFile || 'default-image-path.jpg'} // Provide a default image if none is available
              alt={tour.title || 'Tour Image'}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </div>
          <div className="mt-6">
            <div className='flex justify-between items-center my-6'>
            <h3 className="text-3xl font-bold text-gray-800">{tour.title || 'Tour Title'}</h3>
        <Link to='/' className='text-4xl'><FaArrowAltCircleLeft className='animate-pulse'/></Link>
      </div>
            <p className="mt-2 text-sm text-gray-600">
              Created by: <span className="font-semibold">{tour.name || 'Unknown'}</span>
            </p>
            <div className="mt-4">
              {tour.tags?.map((item, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  #{item}
                </span>
              )) || <span>No tags</span>}
            </div>
            <div className="flex items-center mt-4 text-gray-500 text-sm">
              <svg
                className="h-5 w-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 0v4M5 8h14M7 21h10a2 2 0 002-2V8H5v11a2 2 0 002 2z"
                ></path>
              </svg>
              <small>{moment(tour.createdAt).fromNow()}</small>
            </div>
            <div className="mt-6 text-gray-700">
              <p className="text-lg">{tour.description || 'No description available'}</p>
            </div>
          </div>
        </>
      )}
      <hr className='mt-16' />
      <RelatedTours relatedTours={relatedTours} tourId={id} />
     
      <DisqusThread id={id} title={tour?.title || 'Untitled'} path={`/tour/${id}`} />

    
    </div>
  );
};

export default SingleTour;
