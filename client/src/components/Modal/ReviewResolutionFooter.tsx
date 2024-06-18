import React from 'react';
import useModalStore from '../../stores/useModalStore';

const ReviewResolutionFooter = () => {
  const { toggleModal } = useModalStore();
  return (
    <div className='flex justify-between w-full'>
      <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
        Submit Verdict
      </button>
      <button
        onClick={toggleModal}
        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
      >
        Postpone Judgement
      </button>
    </div>
  );
};

export default ReviewResolutionFooter;
