exports.convertDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
};