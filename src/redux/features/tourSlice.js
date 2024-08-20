import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tourSlice = createSlice({
  name: 'tour',
  initialState: {
    newTour: null,
    tour: null, // For a single tour
    tours: [], // For multiple tours
    userTours: [], // For tours by a specific user
    tagTours:[],
    relatedTours: [], // Corrected state name
    currentPage:1,
    numberOfPages:null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage:(state,action)=>{
      state.currentPage=action.payload;
    },
    createTourRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTourSuccess: (state, action) => {
      state.loading = false;
      state.newTour = action.payload;
      state.error = null;
    },
    createTourFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.newTour = null;
    },
    getToursRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getToursSuccess: (state, action) => {
      state.loading = false;
      state.tours = Array.isArray(action.payload.data) ? action.payload.data : [];
      state.error = null;
      state.numberOfPages = action.payload.numberOfPages; // Use the correct field name
      state.currentPage = action.payload.currentPage;
    },
    getToursFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.tours = [];
    },
    getTourRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getTourSuccess: (state, action) => {
      state.loading = false;
      state.tour = action.payload;  // Ensure you're setting the payload directly to the tour
      state.error = null;
    },
    getTourFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.tour = null;
    },
    getToursByUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getToursByUserSuccess: (state, action) => {
      state.loading = false;
      state.userTours = Array.isArray(action.payload) ? action.payload : [];  // Store user-specific tours
      state.error = null;
    },
    getToursByUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.userTours = [];  // Clear userTours on failure
    },
    deleteTourRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTourSuccess: (state, action) => {
      state.loading = false;
      state.tours = state.tours.filter(tour => tour._id !== action.payload);  // Remove deleted tour from tours list
      state.userTours = state.userTours.filter(tour => tour._id !== action.payload);  // Remove deleted tour from userTours list
      state.error = null;
    },
    deleteTourFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTourRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTourSuccess: (state, action) => {
      state.loading = false;
      state.tour = action.payload;  // Update the single tour
      state.tours = state.tours.map(tour => tour._id === action.payload._id ? action.payload : tour);  // Update the tours list
      state.userTours = state.userTours.map(tour => tour._id === action.payload._id ? action.payload : tour);  // Update the userTours list
      state.error = null;
    },
    updateTourFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    searchToursRequest: (state) => {
      state.loading = true;
      state.error=null;
    },
    searchToursSuccess: (state, action) => {
      state.tours = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchToursFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getToursByTagRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getToursByTagSuccess: (state, action) => {
      state.tagTours = action.payload;
      state.loading = false;
      state.error = null;
    },
    getToursByTagFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getRelatedToursRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRelatedToursSuccess: (state, action) => {
      state.relatedTours = action.payload; // Correctly update relatedTours
      state.loading = false;
      state.error = null;
    },
    getRelatedToursFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    likeTourRequest: (state) => {
      // state.loading = true;
      state.error = null;
    },
    likeTourSuccess: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
      state.tours = state.tours.map(tour =>
        tour._id === action.payload._id ? action.payload : tour
      );
      state.userTours = state.userTours.map(tour =>
        tour._id === action.payload._id ? action.payload : tour
      );
      state.error = null;
    },
    
    
    likeTourFailure: (state, action) => {
      // state.loading = false;
      state.error = action.payload;
    },
    clearAllToursError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  setCurrentPage,
  createTourRequest,
  createTourSuccess,
  createTourFailure,
  getToursRequest,
  getToursSuccess,
  getToursFailure,
  getTourRequest,
  getTourSuccess,
  getTourFailure,
  getToursByUserRequest,
  getToursByUserSuccess,
  getToursByUserFailure,
  deleteTourRequest,
  deleteTourSuccess,
  deleteTourFailure,
  updateTourRequest,
  updateTourSuccess,
  updateTourFailure,
  searchToursRequest,
  searchToursSuccess,
  searchToursFailure,
  getToursByTagRequest,
  getToursByTagSuccess,
  getToursByTagFailure,
  getRelatedToursRequest,
  getRelatedToursSuccess,
  getRelatedToursFailure,
  clearAllToursError,
  likeTourRequest,
  likeTourSuccess,
  likeTourFailure,
} = tourSlice.actions;

// Thunks
export const createTour = (data) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(createTourRequest());
  try {
    const response = await axios.post('http://localhost:4500/tour/create', data, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(createTourSuccess(response.data));
  } catch (error) {
    dispatch(createTourFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const getTours = (page) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(getToursRequest());
  try {
    const response = await axios.get(`http://localhost:4500/tour/getTours?page=${page}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(getToursSuccess(response.data));
  } catch (error) {
    dispatch(getToursFailure(error.response?.data?.message || "Something went wrong"));
  }
};


export const getTour = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(getTourRequest());
  try {
    const response = await axios.get(`http://localhost:4500/tour/getTour/${id}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    // console.log('API Response:', response.data); // Log the response
    dispatch(getTourSuccess(response.data)); // Adjust this based on the API response structure
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(getTourFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const getToursByUser = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(getToursByUserRequest());
  try {
    const response = await axios.get(`http://localhost:4500/tour/userTours/${id}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    // console.log('API Response:', response.data.userTours); // Log to verify data
    dispatch(getToursByUserSuccess(response.data.userTours));
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(getToursByUserFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const deleteTour = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(deleteTourRequest());
  try {
    await axios.delete(`http://localhost:4500/tour/deleteTour/${id}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(deleteTourSuccess(id)); // Pass the deleted tour's ID to remove it from the list
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(deleteTourFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const updateTour = (id, data) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(updateTourRequest());
  try {
    const response = await axios.patch(`http://localhost:4500/tour/updateTour/${id}`, data, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(updateTourSuccess(response.data)); // Pass the updated tour data
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(updateTourFailure(error.response?.data?.message || "Something went wrong"));
  }
};

// Thunk for searching tours
export const searchTours = (query) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(searchToursRequest());
  try {
    const response = await axios.get(`http://localhost:4500/tour/search?searchQuery=${query}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(searchToursSuccess(response.data));
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(searchToursFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const getToursByTag = (tag) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(getToursByTagRequest());
  try {
    const response = await axios.get(`http://localhost:4500/tour/tag/${tag}`, {
      withCredentials: true,
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(getToursByTagSuccess(response.data)); // Dispatch the successful fetch of tours by tag
  } catch (error) {
    console.log('Error:', error.response?.data?.message || error.message);
    dispatch(getToursByTagFailure(error.response?.data?.message || "Something went wrong"));
  }
};


export const getRelatedTours = (tags) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(getRelatedToursRequest());
  try {
    const response = await axios.post('http://localhost:4500/tour/relatedTours', { tags }, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    // console.log('Related Tours Response:', response.data); // Log the response
    dispatch(getRelatedToursSuccess(response.data));
  } catch (error) {
    dispatch(getRelatedToursFailure(error.response?.data?.message || "Something went wrong"));
  }
};

export const likeTour = (id) => async (dispatch) => {
  const token = localStorage.getItem('token');
  dispatch(likeTourRequest());
  try {
    const response = await axios.patch(`http://localhost:4500/tour/like/${id}`, {}, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    dispatch(likeTourSuccess(response.data));
  } catch (error) {
    dispatch(likeTourFailure(error.response?.data?.message || "Something went wrong"));
  }
};



export default tourSlice.reducer;
