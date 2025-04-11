export const monthNames = {
	'01': 'January',
	'02': 'February',
	'03': 'March',
	'04': 'April',
	'05': 'May',
	'06': 'June',
	'07': 'July',
	'08': 'August',
	'09': 'September',
	'10': 'October',
	'11': 'November',
	'12': 'December'
};

export const getMaxDays = (month) => {
	const monthDays = {
		'01': 31,
		'02': 29,
		'03': 31,
		'04': 30,
		'05': 31,
		'06': 30,
		'07': 31,
		'08': 31,
		'09': 30,
		'10': 31,
		'11': 30,
		'12': 31
	};
	return monthDays[month] || 31;
};

export const isLeapYear = (year) => {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};