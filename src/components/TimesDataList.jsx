import React from "react";
import PropTypes from 'prop-types';

export const TimesDataList = ({ id, incrementBy, onChange, onClick }) => {

	TimesDataList.propTypes = {
		id: PropTypes.string,
		incrementBy: PropTypes.number,
		onChange: PropTypes.func,
		onClick: PropTypes.func
	};

	const generateTimes = (increment) => {
		const times = [];

		for (let i = 0; i < 24 * 60; i += increment) {
			const hours = String(Math.floor(i / 60)).padStart(2, '0');
			const minutes = String(i % 60).padStart(2, '0');
			times.push(`${hours}:${minutes}`);
		}

		return times;
	};

	const times = generateTimes(incrementBy);

	return (
		<datalist id={id} onChange={onChange} onClick={onClick}>
			{times.map((time, index) => (
				<option key={index} value={time}></option>
			))}
		</datalist>
	)
}