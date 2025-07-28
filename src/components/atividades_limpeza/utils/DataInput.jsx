const DateInput = ({ field, form, ...props }) => {
  const handleChange = (e) => {
    // Converte de AAAA-MM-DD (input date) para DD/MM/AAAA
    const isoDate = e.target.value;
    if (isoDate) {
      const [year, month, day] = isoDate.split('-');
      form.setFieldValue(field.name, `${day}/${month}/${year}`);
    } else {
      form.setFieldValue(field.name, '');
    }
  };

  // Converte de DD/MM/AAAA para AAAA-MM-DD (input date)
  const formatForInput = (brDate) => {
    if (!brDate) return '';
    if (!brDate.includes('/')) return brDate; // Já está no formato certo?
    const [day, month, year] = brDate.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  return (
    <input
      type="date"
      {...field}
      {...props}
      value={formatForInput(field.value)}
      onChange={handleChange}
      className="w-full border border-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default DateInput;