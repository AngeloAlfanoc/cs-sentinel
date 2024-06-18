import React, { useEffect, useState, useMemo } from 'react';
import useEvidenceFormStore from '../../../stores/useEvidenceFormStore';
import { useTranslation } from 'react-i18next';
import { EvidenceSteps, EvidenceType } from './FormSteps';

const TypeSelectionForm: React.FC = () => {
  const { t } = useTranslation();
  const { selectedType, setType, setStepValidated, stepValidated } = useEvidenceFormStore();
  const [description, setDescription] = useState('');

  const typeDescriptions = useMemo(
    () => ({
      Image:
        'You are going to provide image evidence, this means ingame screenshots of infraction, or other relevant images.',
      Text: 'You have selected text, this means a description of infraction.',
      Video: 'You have selected video, this means a video of the infraction.',
      Demo: 'You have selected Demo. You will be providing a link of the demo file that will be reviewed.'
    }),
    []
  );

  useEffect(() => {
    if (selectedType) {
      setDescription(typeDescriptions[selectedType as EvidenceType]);
    } else {
      setType('Image');
    }
  }, [selectedType, setType, typeDescriptions]);

  const handleClick = (selectedType: EvidenceType) => {
    setType(selectedType);
    setDescription(typeDescriptions[selectedType]);
    if (!stepValidated.includes(EvidenceSteps.StepOne)) {
      setStepValidated([...stepValidated, EvidenceSteps.StepOne]);
    }
  };

  const baseButtonClasses =
    'py-2 px-4 mb-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const getButtonClasses = (buttonType: EvidenceType) => {
    const isSelected = selectedType === buttonType;
    return `${baseButtonClasses} ${
      isSelected
        ? 'bg-green-500 text-white ring-green-300 border-green-500'
        : 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500'
    }`;
  };

  return (
    <>
      <div className='mb-6 text-center'>
        <p className='text-lg font-semibold'>{t('select_type')}</p>
      </div>
      <div className='flex flex-col items-center p-6 bg-gray-900 text-white shadow-md rounded-lg max-w-lg mx-auto'>
        <div className='mb-6 text-center'>
          <p className='text-lg font-semibold'>{description}</p>
        </div>
        <div className='flex flex-wrap justify-center space-x-2'>
          <button className={getButtonClasses('Image')} onClick={() => handleClick('Image')}>
            Image
          </button>
          <button className={getButtonClasses('Video')} onClick={() => handleClick('Video')}>
            Video
          </button>
          <button className={getButtonClasses('Demo')} onClick={() => handleClick('Demo')}>
            Demo
          </button>
        </div>
      </div>
    </>
  );
};

export default TypeSelectionForm;
