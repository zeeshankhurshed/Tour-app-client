import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const { tours, loading, error, currentPage, numberOfPages } = useSelector((state) => state.tour);
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get('searchQuery');
  const location = useLocation();

  useEffect(() => {
    dispatch(getTours(currentPage)); // Fetch tours when component mounts
  }, [dispatch, currentPage]);

  if (loading) {
    return <h2 className="text-center mt-8"><Spinner /></h2>;
  }

  if (error) {
    return <h2 className="text-center mt-8 text-red-500">{error}</h2>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mt-20">
        {Array.isArray(tours) && tours.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">
              {location.pathname === '/' ? 
                (searchQuery ? 
                  `We couldn't find any matches for "${searchQuery}"` : 
                  'No Tours Found') 
                : 
                `We couldnt find any matches for "${searchQuery}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(tours) && tours.map((item) => (
              <CardTour
                key={item._id}
                imageFile={item.imageFile}
                description={item.description}
                title={item.title}
                tags={item.tags}
                _id={item._id}
                likes={item.likes}
                name={item.name}
              />
            ))}
          </div>
        )}
      </div>
      {tours.length > 0 && (
        <Pagination 
          setCurrentPage={setCurrentPage} 
          numberOfPages={numberOfPages} 
          currentPage={currentPage} 
          dispatch={dispatch} 
        />
      )}
    </div>
  );
};

export default Home;
