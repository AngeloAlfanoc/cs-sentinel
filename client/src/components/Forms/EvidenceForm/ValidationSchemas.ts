import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const getValidationSchemas = (t: TFunction) =>
  Yup.object().shape({
    description: Yup.string().required(t('required_description')),
    videoLink: Yup.string().url(t('invalid_url')).required(t('required_videoLink')),
    evidenceName: Yup.string().required(t('required_evidenceName')),
    steamLink: Yup.string().url(t('invalid_url')).required(t('required_steamLink')),
    type: Yup.string().required(t('required_type'))
  });

export type ValidationSchemaKeys = keyof ReturnType<typeof getValidationSchemas>;
