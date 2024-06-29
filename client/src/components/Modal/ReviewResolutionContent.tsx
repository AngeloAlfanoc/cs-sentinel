import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import useModalStore from '../../stores/useModalStore';

const ReviewResolutionContent = () => {
  const { t } = useTranslation();
  const { toggleModal } = useModalStore();
  return (
    <Formik
      initialValues={{
        aimAssistance: '',
        visionAssistance: '',
        externalAssistance: '',
        griefing: ''
      }}
      onSubmit={(values) => {
        console.log('Form values', values);
      }}
    >
      <Form
        className='p-2 bg-gray-800 text-white rounded-lg max-w-4xl mx-auto mt-10 overflow-auto'
        style={{ maxHeight: '60vh' }}
      >
        <p
          className='mb-4'
          dangerouslySetInnerHTML={{
            __html: t('review_resolution_content.intro')
          }}
        ></p>
        <p
          className='mb-6'
          dangerouslySetInnerHTML={{
            __html: t('review_resolution_content.postpone')
          }}
        ></p>

        <div className='mb-6'>
          <h3 className='font-bold mb-2'>{t('review_resolution_content.aim_assistance.title')}</h3>
          <p
            className='mb-2'
            dangerouslySetInnerHTML={{
              __html: t('review_resolution_content.aim_assistance.description')
            }}
          ></p>
          <div className='flex'>
            <label className='flex items-center mr-6'>
              <Field
                type='radio'
                name='aimAssistance'
                value='insufficient'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>
                {t('review_resolution_content.aim_assistance.insufficient')}
              </span>
            </label>
            <label className='flex items-center'>
              <Field
                type='radio'
                name='aimAssistance'
                value='evident'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>{t('review_resolution_content.aim_assistance.evident')}</span>
            </label>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-bold mb-2'>
            {t('review_resolution_content.vision_assistance.title')}
          </h3>
          <p
            className='mb-2'
            dangerouslySetInnerHTML={{
              __html: t('review_resolution_content.vision_assistance.description')
            }}
          ></p>
          <div className='flex'>
            <label className='flex items-center mr-6'>
              <Field
                type='radio'
                name='visionAssistance'
                value='insufficient'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>
                {t('review_resolution_content.vision_assistance.insufficient')}
              </span>
            </label>
            <label className='flex items-center'>
              <Field
                type='radio'
                name='visionAssistance'
                value='evident'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>
                {t('review_resolution_content.vision_assistance.evident')}
              </span>
            </label>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-bold mb-2'>
            {t('review_resolution_content.external_assistance.title')}
          </h3>
          <p
            className='mb-2'
            dangerouslySetInnerHTML={{
              __html: t('review_resolution_content.external_assistance.description')
            }}
          ></p>
          <div className='flex'>
            <label className='flex items-center mr-6'>
              <Field
                type='radio'
                name='externalAssistance'
                value='insufficient'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>
                {t('review_resolution_content.external_assistance.insufficient')}
              </span>
            </label>
            <label className='flex items-center'>
              <Field
                type='radio'
                name='externalAssistance'
                value='evident'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>
                {t('review_resolution_content.external_assistance.evident')}
              </span>
            </label>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-bold mb-2'>{t('review_resolution_content.griefing.title')}</h3>
          <p
            className='mb-2'
            dangerouslySetInnerHTML={{
              __html: t('review_resolution_content.griefing.description')
            }}
          ></p>
          <div className='flex'>
            <label className='flex items-center mr-6'>
              <Field
                type='radio'
                name='griefing'
                value='insufficient'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>{t('review_resolution_content.griefing.insufficient')}</span>
            </label>
            <label className='flex items-center'>
              <Field
                type='radio'
                name='griefing'
                value='evident'
                className='form-radio text-blue-500'
              />
              <span className='ml-2'>{t('review_resolution_content.griefing.evident')}</span>
            </label>
          </div>
        </div>
        <div className='flex justify-between w-full relative'>
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            Submit Verdict
          </button>
          <button
            onClick={toggleModal}
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          >
            Postpone Judgement
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ReviewResolutionContent;
