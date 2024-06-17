import { TFunction } from 'i18next';
import * as Yup from 'yup';

export const getValidationSchema = (t: TFunction) =>
  Yup.object({
    selectedOption: Yup.string().required(t('required_option')),
    linkUrl: Yup.string().url(t('invalid_url')).required(t('required_link'))
  });
