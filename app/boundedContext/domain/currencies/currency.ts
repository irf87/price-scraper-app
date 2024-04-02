export const convertToPrice = (number: number | string, returnOrigin = true) => {
  let numberConverted = 0;
  if (typeof number === 'string') numberConverted = Number(number);
  else numberConverted = number;
 
  if (isNaN(numberConverted)) {
    return returnOrigin ? number : 'Número inválido';
  }
  const formatCurrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  return formatCurrency.format(numberConverted);
}