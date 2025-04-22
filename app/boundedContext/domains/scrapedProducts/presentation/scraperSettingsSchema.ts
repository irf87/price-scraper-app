import * as yup from 'yup';

export const scraperSettingsSchema = yup.object().shape({
  url: yup.string().required('URL is required').url('Please enter a valid URL'),
  enabled: yup.boolean().default(false),
});

export type ScraperSettingsFormData = yup.InferType<
  typeof scraperSettingsSchema
>;
