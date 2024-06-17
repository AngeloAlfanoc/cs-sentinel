import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { addSuspectLink } from '../../api/suspect';
import queryClient from '../../helpers/withQueryClient';
import { getValidationSchema } from '../Forms/AddLinkForm/validationScheme';
import useModalStore from '../../stores/useModalStore';
import { toast } from 'react-toastify';

type Properties = {
  steamId: string;
  existingLinks: Array<{ type: string }>;
};

const LinkModalContent: React.FC<Properties> = ({ steamId, existingLinks }) => {
  const { t } = useTranslation();
  const { toggleModal } = useModalStore();
  const { mutateAsync } = useMutation({
    mutationFn: (data: { steamId: string; linkData: { link: string; type: string } }) =>
      addSuspectLink(data.steamId, data.linkData),
    onSuccess: (data) => {
      console.log('Link successfully added', data);
      queryClient.invalidateQueries({ queryKey: ['suspect', steamId] });
      toggleModal();
      toast.success(t('link successfully added'));
    },
    onError: (error) => {
      console.error('Error submitting link:', error);
      toast.error(`${t('problem_adding_this_link')} ${error.message}`);
    }
  });

  const availableOptions = ['Faceit'].filter(
    (option) => !existingLinks.some((link) => link.type === option)
  );

  if (availableOptions.length === 0) {
    return <p className='text-center text-white'>{t('no_more_links_available')}</p>;
  }
  return (
    <Formik
      initialValues={{ selectedOption: '', linkUrl: '' }}
      validationSchema={getValidationSchema(t)}
      onSubmit={(values, { setSubmitting }) => {
        mutateAsync({
          steamId,
          linkData: { link: values.linkUrl, type: values.selectedOption }
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className='space-y-4'>
          <div>
            <label htmlFor='selectedOption' className='block text-sm font-medium text-gray-300'>
              Select an Option
            </label>
            <Field
              as='select'
              id='selectedOption'
              name='selectedOption'
              className='mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              {availableOptions.length > 0 ? (
                <option value='' disabled>
                  Select an option
                </option>
              ) : (
                <option value='not-able' disabled>
                  No options avaiable
                </option>
              )}
              {availableOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name='selectedOption'
              component='div'
              className='text-red-500 text-sm mt-1'
            />
          </div>
          <div>
            <label htmlFor='linkUrl' className='block text-sm font-medium text-gray-300'>
              Enter URL
            </label>
            <Field
              id='linkUrl'
              name='linkUrl'
              type='text'
              className='mt-1 block w-full py-2 px-3 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
            <ErrorMessage name='linkUrl' component='div' className='text-red-500 text-sm mt-1' />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LinkModalContent;
