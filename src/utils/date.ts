export const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  const result = [year]

  if (month.length < 2) {
    result.push(`0${month}`);
  } else {
    result.push(month);
  }
  if (day.length < 2) {
    result.push(`0${day}`);
  } else {
    result.push(day);
  }

  return result.join('-')
}

/**
 * get date in file path
 */
export const formatDateForPath = (filePath: string) => {
	const fileArray = filePath.split('/');
	const fileName = fileArray[fileArray.length - 1];
	const [year, month, day] = fileName.split('-');

	const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	if (isNaN(Date.parse(date))) {
		throw new Error(`can't find date in file name`);
	}

	return date;
};