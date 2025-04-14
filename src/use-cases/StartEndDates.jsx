import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Heading from '../components/Heading';
import { BackButton } from '../components/BackButton';
import DatePicker from 'react-datepicker';

export const StartEnd_1 = () => {
	
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	
	const formatDateString = (e, setValue) => {
		let input = e.target.value.replace(/\D/g, '');
		const formattedValue = input
			.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
			.substring(0, 10);
		setValue(formattedValue);
	};

	return (
		<>
			<div className="input-example">
				<Heading level={2} displayClass={4} className={'group-label'}>Method 1</Heading>
				<TextInput 
					type="text" 
					id={'startDate'}
					label={'Start date'}
					placeholder={"mm/dd/yyyy"} 
					pattern={"\d{2}/\d{2}/\d{4}"} 
					onChange={(e) => formatDateString(e, setStartDate)} 
					value={startDate}
				/>
		 		<TextInput 
					type="text" 
					id={'endDate'}
					label={'End date'}
					placeholder={"mm/dd/yyyy"} 
					pattern={"\d{2}/\d{2}/\d{4}"} 
					onChange={(e) => formatDateString(e, setEndDate)} 
					value={endDate}
				/>
			</div>
		</>
	)
}

export const StartEnd_2 = () => {

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [endDateHelpText, setEndDateHelpText] = useState('');

	const today = new Date().toISOString().split('T')[0];

	const handleStartDateChange = (e) => {
		const selectedDate = e.target.value;
		setStartDate(selectedDate);
		setEndDate('');
		setEndDateHelpText('');
	};

	const handleEndDateChange = (e) => {
		const selectedDate = e.target.value;
		if (new Date(selectedDate) >= new Date(startDate)) {
			setEndDate(selectedDate);
			setEndDateHelpText('');
		} else {
			setEndDateHelpText('End Date must be equal to or after the Start Date');
		}
	};

	return (
		<>
			<div className="input-example">
				<Heading level={2} displayClass={4} className={'group-label'}>Method 2</Heading>
				<TextInput 
					type="date" 
					id={'startDate'}
					label={'Start date'} 
					min={today}
					onChange={handleStartDateChange}
					value={startDate}
				/>
				<TextInput 
					type="date" 
					id={'endDate'}
					label={'End date'}
					min={startDate || today}
					onChange={handleEndDateChange}
					value={endDate}
					helpText={endDateHelpText}
				/>
			</div>
		</>
	)
}

export const StartEnd_3 = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	return (
		<>
		<div className="input-example ">
			<Heading level={2} displayClass={4} className={'group-label'}>Method 3</Heading>
			<div className='react-datepicker-container'>
				<label className='field-label' htmlFor='start-date-3'>Start date</label>
				<DatePicker 
					id='start-date-3'
					selected={startDate} 
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat="MM/dd/yyyy"
					placeholderText="mm/dd/yyyy"
				/>
			</div>
			<div className='react-datepicker-container'>
				<label className='field-label' htmlFor='end-date-3'>End date</label>
				<DatePicker 
					id='end-date-3'
					selected={endDate} 
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					dateFormat="MM/dd/yyyy"
					placeholderText="mm/dd/yyyy"
				/>
			</div>
		</div>
		</>
	)
}

export const StartEnd_Range_1 = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleChange = ([newStartDate, newEndDate]) => {
		setStartDate(newStartDate);
		setEndDate(newEndDate);
	};

	return (
		<>
		<div className="input-example">
			<Heading level={2} displayClass={4} className={'group-label'}>Method 4</Heading>
			<div className='react-datepicker-container'>
				<label className='field-label' htmlFor='date-range-field'>Enter date range</label>
				<DatePicker 
					id='date-range-field'
					selected={startDate}
					onChange={handleChange}
					selectsRange
					swapRange
					startDate={startDate}
					endDate={endDate}
					dateFormat="MM/dd/yyyy"
					isClearable
					placeholderText="mm/dd/yyyy - mm/dd/yyyy"
				/>
			</div>
		</div>
		</>
	)
}

export const StartEnd_All = () => {
	return (
		<>
			<Heading displayClass={2}>Defining a date range</Heading>
			<div className="explanation-text">
				<p>In administrative applications, entering or searching dates and date ranges 
				is a very common occurrence. Below you&rsquo;ll find four unique methods 
				to define Start and End dates.</p>
				<p>Go through each method and enter the 
				same  1-week date range for all four. While doing so, consider how intuitive each set-up is 
				(or isn&rsquo;t). When you&rsquo;re finished, click the &ldquo;I’m done&rdquo; button.</p>	
				<p className="hint">Try using your mouse or keyboard (or a combination of both) as you move through each set of fields.</p>
			</div>
			<StartEnd_1/>
			<StartEnd_2/>
			<StartEnd_3/>
			<StartEnd_Range_1/>
			<BackButton label={'I’m done'}/>
		</>
	)
}
