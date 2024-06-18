import React from 'react';

type Properties = {
  isSubmitting: boolean;
};

const StepperButtons: React.FC<Properties> = ({ isSubmitting }) => {
  return (
    <div className='flex justify-between mt-4'>
      <button
        type='submit'
        className={
          'py-2 px-4 bg-green-600 text-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 hover:bg-green-700'
        }
        disabled={isSubmitting}
      >
        Submit
      </button>
    </div>
  );
};

export default StepperButtons;
