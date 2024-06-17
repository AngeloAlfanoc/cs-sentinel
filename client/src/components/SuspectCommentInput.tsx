import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { submitSuspectComment } from '../api/comment';
import useAuthStore from '../stores/useAuthStore';
import * as Yup from 'yup';
import queryClient from '../helpers/withQueryClient';
import { useTranslation } from 'react-i18next';

type Properties = {
  steamId: string;
};

interface CommentMessage {
  message: string;
}

export interface CommentSubmissionData {
  comment: CommentMessage;
}

const SuspectCommentSection: React.FC<Properties> = ({ steamId }) => {
  const { user: userData } = useAuthStore();
  const { t } = useTranslation();

  const { mutateAsync } = useMutation({
    mutationFn: submitSuspectComment,
    onSuccess: (data) => {
      console.log('Comment submitted successfully', data);
      queryClient.invalidateQueries({ queryKey: ['suspectComments', steamId] });
    },
    onError: (error) => {
      console.error('Error submitting comment:', error);
    }
  });

  const handleSubmit = async (values: CommentSubmissionData) => {
    let submitted = false;
    const comment = {
      comment: {
        message: values.comment.message,
        steamId,
        userId: userData?.user.id
      }
    };
    await mutateAsync(comment, {
      onSuccess: () => {
        submitted = true;
      }
    });
    return submitted;
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    comment: Yup.object({
      message: Yup.string()
        .required('Please enter a comment')
        .min(10, 'Comment must be at least 10 characters long')
    })
  });

  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow'>
      <h2 className='text-gray-300 font-semibold'>Comments</h2>
      <Formik<CommentSubmissionData>
        initialValues={{ comment: { message: '' } }}
        onSubmit={async (values, helpers: FormikHelpers<CommentSubmissionData>) => {
          const submit = await handleSubmit(values);
          if (submit) {
            helpers.resetForm();
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <Field
              type='text'
              name='comment.message'
              placeholder='Add a comment...'
              className='mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            />
            <ErrorMessage name='comment.message' component='div' className='text-red-400 text-sm' />
            <button
              type='submit'
              disabled={isSubmitting}
              className='px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold'
            >
              {t('post_comment')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SuspectCommentSection;
