import { Field, ErrorMessage } from 'formik';

export function PasswordField() {
  return (
    <div className='mb-6'>
      <label htmlFor='password' className='block text-sm font-medium text-gray-300'>
        Password
      </label>
      <Field
        id='password'
        name='password'
        type='password'
        autoComplete='current-password'
        placeholder='Your password'
        className='p-2 text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-600'
        required
      />
      <ErrorMessage name='password' component='div' className='text-red-500 text-sm mt-2' />
    </div>
  );
}
