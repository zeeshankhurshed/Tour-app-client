import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegThumbsUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likeTour } from '../redux/features/tourSlice';

const CardTour = ({ imageFile = '', description = '', title = '', tags = [], _id = '', name = '', likes = [], userId: propUserId }) => {
  const { user } = useSelector((state) => state.user);
  const userId = user?._id || user?.googleId || propUserId;
  const dispatch = useDispatch();

  const excerpt = (str) => (str.length > 45 ? `${str.substring(0, 45)}...` : str);
  const hasLikedTour = likes.includes(userId);

  const handleLike = () => {
    dispatch(likeTour(_id));
  };

  const renderLikes = () => {
    if (likes.length > 0) {
      if (hasLikedTour) {
        return likes.length === 1 ? (
          <>
            <FaRegThumbsUp />
            &nbsp;
            <span title="You like this">You like this</span>
          </>
        ) : (
          <>
            <FaRegThumbsUp />
            &nbsp;
            <span
              title={`You and ${likes.length - 1} other${likes.length - 1 > 1 ? 's' : ''} like this`}
            >
              You and {likes.length - 1} other{likes.length - 1 > 1 ? 's' : ''} like this
            </span>
          </>
        );
      } else {
        return (
          <>
            <FaRegThumbsUp />
            &nbsp;
            <span title={`${likes.length} ${likes.length > 1 ? 'Likes' : 'Like'}`}>
              {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
            </span>
          </>
        );
      }
    }

    return (
      <>
        <FaRegThumbsUp />
        &nbsp;
        <span title="Like">Like</span>
      </>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
      <img
        src={imageFile || 'default-image-path.jpg'} // Provide a default image if none is available
        alt={title || 'Tour Image'}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 absolute top-5 left-2">
            {name || 'Tour Name'}
          </h2>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">
                  <Link to={`/tours/tag/${tag}`}>#{tag}</Link>
                </span>
              ))
            ) : (
              <span className="bg-gray-200 px-2 py-1 rounded-full">No tags</span>
            )}
          </div>
        </div>
        <h4 className="text-xl font-bold text-gray-800">{title || 'Tour Title'}</h4>
        <p className="text-gray-600 mb-4">{excerpt(description)}</p>
        <div className="flex items-center justify-between">
          <Link to={`/tour/${_id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
            Read More
          </Link>
          <button
            onClick={handleLike}
            className={`flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 ${
              hasLikedTour ? 'text-blue-600' : ''
            }`}
          >
            {renderLikes()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardTour;
