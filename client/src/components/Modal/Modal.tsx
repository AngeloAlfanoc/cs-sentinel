import React, { useEffect, useState, useRef } from 'react';
import 'flowbite';
import useModalStore from '../../stores/useModalStore';

const ModalComponent = () => {
  const { isModalOpen, modalHeader, modalContent, modalFooter, toggleModal } = useModalStore();
  const [showModal, setShowModal] = useState(false);
  const modalReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isModalOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalReference.current && !modalReference.current.contains(event.target as Node)) {
        toggleModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleModal, showModal]);

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      {showModal && (
        <div
          className={`fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto w-full flex items-center justify-center transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
        >
          <div
            ref={modalReference}
            className={`relative m-5 p-5 border border-gray-700 shadow-lg rounded-md bg-gray-800 transition-all duration-300 transform ${isModalOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            <h3 className='text-lg leading-6 font-medium text-white'>{modalHeader}</h3>
            <div className='text-gray-300'>{modalContent}</div>
            <div className='flex items-center justify-center p-3 text-gray-300'>{modalFooter}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;
