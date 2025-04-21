import * as yup from 'yup';

export const scraperRulesSchema = yup.object().shape({
  priceLessThan: yup
    .string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .test('is-number', 'Must be a number', value => {
      if (value === null) {
        return true;
      }
      return !isNaN(Number(value));
    }),
  priceGreaterThan: yup
    .string()
    .nullable()
    .transform(value => (value === '' ? null : value))
    .test('is-number', 'Must be a number', value => {
      if (value === null) {
        return true;
      }
      return !isNaN(Number(value));
    }),
  notifyAvailability: yup.boolean().default(false),
  notifyPrice: yup.boolean().default(false),
  notifyStock: yup.boolean().default(false),
});

export type ScraperRulesFormData = {
  priceLessThan: string | null;
  priceGreaterThan: string | null;
  notifyAvailability: boolean;
  notifyPrice: boolean;
  notifyStock: boolean;
};
