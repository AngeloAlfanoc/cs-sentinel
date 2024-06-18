import { ErrorMessage, Field } from 'formik';

export function EmailField() {
  return (
    <div className='mb-4'>
      <label htmlFor='email' className='block text-sm font-medium text-gray-300'>
        Email
      </label>
      <Field
        id='email'
        name='email'
        type='email'
        autoComplete='email'
        placeholder='Your email address'
        className='p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-600'
        required
      />
      <ErrorMessage name='email' component='div' className='text-red-500 text-sm mt-2' />
    </div>
  );
}
