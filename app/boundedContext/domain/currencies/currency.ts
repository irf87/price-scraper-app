export const convertToPrice = (number: number) => {
  if (isNaN(number)) {
    return "Número inválido";
  }
  const formatCurrency = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
  });

  return formatCurrency.format(number);
}