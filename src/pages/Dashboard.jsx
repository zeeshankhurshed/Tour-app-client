import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToursByUser, deleteTour } from '../redux/features/tourSlice';
import { toast } from 'react-toastify'; // Import toast
import CardTour from '../components/CardTour';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { userTours } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId, dispatch]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this tour?');
    if (confirmDelete) {
      dispatch(deleteTour(id))
        .then(() => {
          toast.success('Tour deleted successfully!');
        })
        .catch((error) => {
          toast.error('Failed to delete tour: ' + error.message);
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard:{user.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTours.length > 0 ? (
          userTours.map((tour) => (
            <div key={tour._id} className="relative">
              <CardTour
                imageFile={tour.imageFile}
                description={tour.description}
                title={tour.title}
                tags={tour.tags}
                _id={tour._id}
                name={tour.name}
              />
              <div className="absolute top-2 right-2 flex items-center gap-2 text-xl">
                <button className="text-red-600" onClick={() => handleDelete(tour._id)}>
                  <FaRegTrashAlt />
                </button>
                <Link to={`/editTour/${tour._id}`} className="text-blue-600">
                  <FaEdit />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h4>No tours available with the user:{user?.name}</h4>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
