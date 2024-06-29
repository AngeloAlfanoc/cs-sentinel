import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchInput = () => {
  const [previousSearch, setPreviousSearch] = useState('');

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: (values) => {
      alert(`Searching for: ${values.search}`);
    }
  });

  // handle search
  const handleSearch = async () => {
    if (formik.values.search !== previousSearch) {
      await formik.submitForm();
      setPreviousSearch(formik.values.search);
    }
  };

  const handleBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleBlur(event);
    handleSearch();
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className='max-w-lg mx-auto bg-gray-800 text-white rounded-md'>
      <div className='relative'>
        <input
          id='search'
          name='search'
          type='text'
          placeholder='Search CS-Sentinel'
          onChange={formik.handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          value={formik.values.search}
          className='block w-full px-3 py-2 pl-10 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-md bg-gray-700 text-white'
        />
        <FontAwesomeIcon icon={faSearch} className='absolute left-3 top-2.5 text-gray-400' />
      </div>
    </div>
  );
};

export default SearchInput;
