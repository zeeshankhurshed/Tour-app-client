import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getToursByTag } from '../redux/features/tourSlice';
import Spinner from '../components/Spinner';
import {excerpt} from '../utility/index.js';


const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag, dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='p-4 md:p-8 lg:p-12 mt-24'>
      <h3 className='text-2xl font-semibold mb-4'>Tours with tag: <span className='text-blue-500'>{tag}</span></h3>
      <hr className='border-t-2 border-gray-300 mb-8' />
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {tagTours && tagTours.map((item) => (
          <div key={item._id} className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <img src={item.imageFile} alt={item.title} className='w-full h-48 object-cover' />
            <div className='p-4'>
              <h4 className='text-xl font-semibold mb-2'>{item.title}</h4>
              <p className='text-gray-600 mb-4'>{excerpt(item.description)}</p>
              <button
                type='button'
                onClick={() => navigate(`/tour/${item._id}`)}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default TagTours;
