/* eslint-disable unicorn/consistent-function-scoping */
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchUserDetails, submitProfileUpdate } from '../api/user';
import { UserInfoResponse } from '../types/user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useJwtToken from '../hooks/useJwtToken';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/profile')({
  component: Profile
});

function Profile() {
  const { t } = useTranslation();
  const token = useJwtToken();

  const validationSchema = Yup.object({
    email: Yup.string().email(t('invalid_email')).required(t('required_field')),
    firstName: Yup.string(),
    lastName: Yup.string(),
    phoneNumber: Yup.string().matches(/^\d+$/, t('must_be_digits')).min(10, t('must_be_10_digits')),
    nickName: Yup.string()
  });

  const { mutateAsync } = useMutation({
    mutationFn: submitProfileUpdate,
    onSuccess: () => {
      toast.success(t('profile_updated_success'));
    },
    onError: (error: Error) => {
      toast.error(`${t('update_failed')} ${error.message}`);
    }
  });

  const handleUpdateProfile = (values: any) => {
    mutateAsync(values);
  };

  const {
    data: userInfo,
    error: userError,
    isLoading: userIsLoading,
    isError: userIsError
  } = useQuery<UserInfoResponse, Error>({
    queryKey: ['user', String(token?.user.id)],
    queryFn: () => fetchUserDetails(String(token?.user.id)),
    select: (data) => {
      return data;
    },
    enabled: !!token?.user.id
  });

  if (!token) {
    return <>{t('no_user')}</>;
  }

  if (userIsLoading) {
    return <p>{t('profile_loading')}</p>;
  }

  if (userIsError) {
    return <p>{`${t('profile_error')} ${userError?.message}`}</p>;
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Formik
        initialValues={{
          email: userInfo?.data.user.email || '',
          firstName: userInfo?.data.user.firstName || '',
          lastName: userInfo?.data.user.lastName || '',
          phoneNumber: userInfo?.data.user.phoneNumber || '',
          nickName: userInfo?.data.user.nickName || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleUpdateProfile}
      >
        <Form className='space-y-6'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-200'>
              {t('email')}
            </label>
            <Field
              name='email'
              type='email'
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-800 text-white shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm'
              disabled
            />
            <ErrorMessage name='email' component='div' className='text-red-400 text-sm' />
          </div>
          <div>
            <label htmlFor='nickName' className='block text-sm font-medium text-gray-200'>
              {t('nickName')}
            </label>
            <Field
              name='nickName'
              type='text'
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm'
            />
            <ErrorMessage name='phoneNumber' component='div' className='text-red-400 text-sm' />
          </div>
          <div>
            <label htmlFor='firstName' className='block text-sm font-medium text-gray-200'>
              {t('first_name')}
            </label>
            <Field
              name='firstName'
              type='text'
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm'
            />
            <ErrorMessage name='firstName' component='div' className='text-red-400 text-sm' />
          </div>
          <div>
            <label htmlFor='lastName' className='block text-sm font-medium text-gray-200'>
              {t('last_name')}
            </label>
            <Field
              name='lastName'
              type='text'
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm'
            />
            <ErrorMessage name='lastName' component='div' className='text-red-400 text-sm' />
          </div>
          <div>
            <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-200'>
              {t('phone_number')}
            </label>
            <Field
              name='phoneNumber'
              type='text'
              className='mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-indigo-300 focus:ring-indigo-300 sm:text-sm'
            />
            <ErrorMessage name='phoneNumber' component='div' className='text-red-400 text-sm' />
          </div>

          <button
            type='submit'
            className='py-2 px-4 bg-blue-600 hover:bg-blue-700 transition duration-300 rounded text-white'
          >
            {t('update_profile')}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
