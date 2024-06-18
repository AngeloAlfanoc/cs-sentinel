import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Formik, Form } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { SuspectSubmissionData } from '../types/suspect';
import { ApiResponse } from '../types/api';
import { submitSuspect } from '../api/suspect';
import { toast } from 'react-toastify';
import StepperButtons from '../components/StepperButtons';
import { getValidationSchemas } from '../components/Forms/EvidenceForm/ValidationSchemas';
import { useTranslation } from 'react-i18next';
import EvidenceForm from '../components/Forms/EvidenceForm/EvidenceForm';

type ReturnType = {
  message: string;
  steamId: string;
};

export const Route = createLazyFileRoute('/submit')({
  component: Submit
});

function Submit() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const validationSchema = getValidationSchemas(t);

  const { mutateAsync } = useMutation({
    mutationFn: submitSuspect,
    onSuccess: (resp: ApiResponse<ReturnType>) => {
      toast.success('Submission successful!');
      setTimeout(() => {
        navigate({ to: `/suspect/${resp.data.steamId}` });
      }, 200);
    },
    onError: (error: Error) => {
      toast.error(`Submission failed: ${error.message}`);
    }
  });

  const handleSubmit = async (
    values: SuspectSubmissionData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    await mutateAsync(values);
    setSubmitting(false);
  };

  return (
    <>
      <div className='flex flex-col items-center bg-gray-800 p-4 min-h-screen text-white'>
        <Formik
          initialValues={{
            evidenceName: '',
            description: '',
            videoLink: '',
            type: '',
            steamLink: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnMount={false}
          validateOnBlur={false}
          isInitialValid
        >
          {({ isSubmitting }) => (
            <Form className='w-full max-w-lg'>
              <EvidenceForm />
              <StepperButtons isSubmitting={isSubmitting} />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Submit;
