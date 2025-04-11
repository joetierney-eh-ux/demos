import React, { useEffect, useRef, useState } from 'react';
import { monthNames, getMaxDays, isLeapYear } from '../_helpers/dateHelpers';

const DateInputGroup = ({
	label = 'Enter text', 
	className = '', 
	helpText = '', 
	useMonthList = false, 
	useDayList = false
}) => {

	const monthRef = useRef(null);
	const dayRef = useRef(null);
	const yearRef = useRef(null);

	const [days, setDays] = useState([]);
	const [error, setError] = useState('');
	const [monthSelected, setMonthSelected] = useState(false);
	const [daySelected, setDaySelected] = useState(false);
	

	const handleMonthChange = (e) => {
		const month = e.target.value;

		setMonthSelected(!!month);

		if (!/^(0?[1-9]|1[0-2])$/.test(month)) {
			setError('Month must be a number between 1 and 12.');
			e.target.value = '';
			return;
		}

		updateDays(month);
		setError('');
		if (month.length === 2) {
			dayRef.current.focus();
		}
	};

	const handleMonthBlur = (e) => {
		const month = e.target.value;
		
		if (month.length === 1) {
			e.target.value = `0${month}`;
		}
	};

	const handleDayChange = (e) => {
		const day = e.target.value;
		const month = monthRef.current.value;
		const year = yearRef.current.value;
		const maxDays = getMaxDays(month);
		
		setDaySelected(!!day);
		
		if (day > maxDays) {
			setError(`"${day}" is invalid for ${monthNames[month]}. Please enter a day between 1 and ${maxDays}.`);
			e.target.value = '';
		} else {
			setError('');
			if (day.length === 2) {
			 	yearRef.current.focus();
			}
		}
	};

	const handleDayBlur = (e) => {
		const day = e.target.value;
		
		if (day.length === 1) {
			e.target.value = `0${day}`;
		}
	};
	
	const handleYearChange = (e) => {
		const year = e.target.value;
		
		if (year.length === 4 && /^\d{4}$/.test(year)) {
			const month = monthRef.current.value;
			const day = dayRef.current.value;

			if (month === '02' && day === '29' && !isLeapYear(year)) {
				setError(`"29" is invalid for February in a non-leap year. Please enter a day between 1 and 28.`);
				dayRef.current.value = '';
			} else {
				setError('');
			}
		}
	};

	const handleYearBlur = (e) => {
		const year = e.target.value;
		const month = monthRef.current.value;
		const day = dayRef.current.value;

		if(year.length && year.length < 4) {
			setError(`Year must be in "YYYY" format. You entered "${year}" for year.`);
			e.target.value = '';
			yearRef.current.focus();
		} else if (month === '02' && day === '29' && !isLeapYear(year)) {
			setError(`"29" is invalid for February in a non-leap year. Please enter a day between 1 and 28.`);
			dayRef.current.value = '';
		} else {
			setError('');
		}
	}

	const updateDays = (month) => {
		const maxDays = getMaxDays(month);
		const daysArray = Array.from({ length: maxDays }, (_, i) => i + 1);
		setDays(daysArray);
	};

	useEffect(() => {
		updateDays(monthRef.current.value);
	}, []);

	const handleMonthKeyDown = (e) => {
		const input = e.key.toLowerCase();
		let monthIndex;
	
		if (/^(0?[1-9]|1[0-2])$/.test(input)) {
			monthIndex = input.padStart(2, '0');
		} else {
			monthIndex = Object.keys(monthNames).find(key => monthNames[key].toLowerCase().startsWith(input));
		}
	
		if (monthIndex) {
			monthRef.current.value = monthIndex;
			updateDays(monthRef.current.value);
		}
	};

	const inputGroupInnerStyle = {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '.5rem'
	}

	return (
		<div className={`date-input-group ${className=''}`}>
			{label && <label className='field-label' style={{width: '100%'}}>{label}</label>}
			<div style={inputGroupInnerStyle}>
				<div className={`base-text-input`}>
					{useMonthList === false || useMonthList === undefined ?
						<input
							id="month"
							type="text"
							maxLength="2"
							placeholder="MM"
							ref={monthRef}
							onChange={handleMonthChange}
							onBlur={handleMonthBlur}
							aria-label='Month'
							className={error ? 'has-error' : ''}
							pattern="0?[1-9]|1[0-2]"
						/> :
						<select
							id="month"
							ref={monthRef}
							onChange={handleMonthChange}
							onKeyDown={handleMonthKeyDown}
							aria-label='Month'
							className={monthSelected ? '' : 'no-selection'}
						>
							<option value="null">Select month&hellip;</option>
							<option value="01">January</option>
							<option value="02">February</option>
							<option value="03">March</option>
							<option value="04">April</option>
							<option value="05">May</option>
							<option value="06">June</option>
							<option value="07">July</option>
							<option value="08">August</option>
							<option value="09">September</option>
							<option value="10">October</option>
							<option value="11">November</option>
							<option value="12">December</option>
						</select>
					}
				</div>
				<div className={`base-text-input`}>
					{useDayList === false || useDayList === undefined ?
						<input
							id="day"
							type="text"
							maxLength="2"
							placeholder="DD"
							ref={dayRef}
							onChange={handleDayChange}
							onBlur={handleDayBlur}
							aria-label='Day'
							className={error ? 'has-error' : ''}
						/> :
						<select
							id="day"
							ref={dayRef}
							onChange={handleDayChange}
							aria-label='Day'
							className={daySelected ? '' : 'no-selection'}
						>
							<option value="null">Select day&hellip;</option>
							{days.map(day => (
								<option key={day} value={day}>{day}</option>
							))}
						</select>
					}
				</div>
				<div className={`base-text-input`}>
					<input
						type="text"
						maxLength="4"
						placeholder="YYYY"
						ref={yearRef}
						onChange={handleYearChange}
						onBlur={handleYearBlur}
						aria-label='Year'
						pattern="\d{4}"
					/>
				</div>
			</div>
			{helpText && <span className='help-text' style={{width: '100%'}}>{helpText}</span>}
			{error && <span className='help-text error-message'>{error}</span>}
		</div>
	);
};

export default DateInputGroup;