export const formatTime = (date) => {
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const am_pm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${formattedHours}:${formattedMinutes} ${am_pm}`;
};