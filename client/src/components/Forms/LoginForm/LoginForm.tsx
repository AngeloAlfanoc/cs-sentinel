import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useAuthentication } from '../../../hooks/useLoginAuthentication';
import { EmailField } from '../EmailField';
import { PasswordField } from '../PasswordField';
import { SubmitButton } from '../SubmitButton';

export type LoginFormValues = {
  email: string;
  password: string;
  data?: {
    user: string;
    token: string;
  };
};

export function LoginForm() {
  const { handleLogin } = useAuthentication();

  const initialValues = {
    email: '',
    password: '',
    data: {
      user: '',
      token: ''
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  return (
    <Formik<LoginFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleLogin.mutateAsync(values)}
    >
      <Form>
        <EmailField />
        <PasswordField />
        <SubmitButton />
      </Form>
    </Formik>
  );
}
