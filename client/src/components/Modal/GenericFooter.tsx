import React from 'react';
import useModalStore from '../../stores/useModalStore';

const GenericFooter = () => {
  const { toggleModal } = useModalStore();
  return (
    <div>
      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold'
        onClick={toggleModal}
      >
        Close
      </button>
    </div>
  );
};

export default GenericFooter;
