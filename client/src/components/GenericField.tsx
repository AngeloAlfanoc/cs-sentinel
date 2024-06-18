import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';

interface GenericFieldProperties {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  as?: string; // For handling textarea
  required?: boolean;
}

const GenericField: React.FC<GenericFieldProperties> = ({
  label,
  name,
  type = 'text',
  placeholder,
  as,
  required
}) => {
  const { t } = useTranslation();

  return (
    <div className='mb-6'>
      <label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-300'>
        {t(label)}
        <span className='text-red-500'>{required && ' *'}</span>
      </label>
      <Field
        type={type}
        id={name}
        name={name}
        as={as}
        className='bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={t(placeholder)}
      />
      <ErrorMessage name={name} component='div' className='text-red-500 text-sm mt-2' />
    </div>
  );
};

export default GenericField;
