import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createTour, updateTour, clearAllToursError, getTour } from '../redux/features/tourSlice';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditTour = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [tags, setTags] = useState([]);
  const [imageBase64, setImageBase64] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, tour } = useSelector((state) => state.tour);
  const { user } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      tagInput: '',
      imageFile: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      imageFile: Yup.string().required('Image is required'),
    }),
    onSubmit: (values) => {
      const { title, description, imageFile } = values;
      if (title && description && tags.length > 0) {
        const tourData = {
          title,
          description,
          imageFile,
          tags,
          name: user?.name, // Include user's name from the state
        };

        if (id) {
          // Dispatching the action to update the tour
          dispatch(updateTour({ id, updatedTourData: tourData }));
        } else {
          // Dispatching the action to create a tour
          dispatch(createTour(tourData));
        }
      }
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(getTour(id)); // Fetch the tour data based on the ID
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (tour && id) {
      const { title, description, imageFile, tags: existingTags } = tour;
      setTags(existingTags); // Set the existing tags
      setImageBase64(imageFile); // Set the existing image
      // Set the form values
      formik.setValues({
        title,
        description,
        imageFile,
      });
    }
  }, [tour, id, formik]);


  useEffect(() => {
    if (tour) {
      toast.success('Tour saved successfully!');
      handleClear();
      // navigate('/');
    }
    if (error) {
      toast.error(error);
    }
    return () => {
      dispatch(clearAllToursError());
    };
  }, [tour, error, dispatch, navigate]);

  const handleAddTag = () => {
    if (formik.values.tagInput && !tags.includes(formik.values.tagInput)) {
      setTags([...tags, formik.values.tagInput]);
      formik.setFieldValue('tagInput', ''); // Clear input field after adding tag
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String);
        formik.setFieldValue('imageFile', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    formik.resetForm(); // Reset the form fields to their initial values
    setTags([]); // Clear the tags array
    setImageBase64(''); // Clear the image preview
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {id ? 'Edit Tour' : 'Add Tour'}
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Title..."
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Description..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="file"
              name="imageFile"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border ${
                formik.touched.imageFile && formik.errors.imageFile
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.imageFile && formik.errors.imageFile && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.imageFile}</p>
            )}
          </div>

          {imageBase64 && (
            <div className="mb-4">
              <img
                src={imageBase64}
                alt="Selected"
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              name="tagInput"
              placeholder="Add a tag..."
              value={formik.values.tagInput}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border ${
                formik.touched.tagInput && formik.errors.tagInput
                  ? 'border-red-500'
                  : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="mt-2 bg-blue-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
  {tags && tags.map((tag, index) => (
    <div
      key={index}
      className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
    >
      <span>{tag}</span>
      <button
        type="button"
        onClick={() => handleDeleteTag(tag)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        <FaTimes />
      </button>
    </div>
  ))}
</div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTour;
