import React, { useRef, useState } from 'react';
import TextInput from '../components/TextInput';
import { BackButton } from './BackButton';

export const TimesTextInputs = ({
	incrementBy = 15,
	min = '08:00',
	max = '18:00',
}) => {
	const [startTimeVal, setStartTime] = useState('');
	const [endTimeVal, setEndTime] = useState('');
	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const [startTimeError, setStartTimeError] = useState('');
	const [endTimeError, setEndTimeError] = useState('');
	const [isStartTimeSet, setIsStartTimeSet] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const updateEndTimeMin = () => {
		if (startTimeRef.current) {
			const startTimeValue = startTimeRef.current.value;
			setIsStartTimeSet(!!startTimeValue); 

			const [hours, minutes] = startTimeValue.split(':').map(Number);
			const startDate = new Date();
			startDate.setHours(hours, minutes, 0, 0);
			startDate.setMinutes(startDate.getMinutes() + incrementBy);
			endTimeRef.current.value = '';

			setEndTime('');
		}
	};

	const validateStartTime = (event) => {
		const startTimeValue = event.target.value;
		if (startTimeValue.length < 2) {
			event.target.setCustomValidity('');
			setStartTimeError('');
			return;
		}
		const [hours, minutes] = startTimeValue.split(':').map(Number);
		const totalMinutes = hours * 60 + minutes;
		if (totalMinutes % incrementBy !== 0) {
			const errorMessage = `Start time must be at a ${incrementBy}-minute mark.`;
			event.target.setCustomValidity(errorMessage);
			setStartTimeError(errorMessage);
		} else {
			event.target.setCustomValidity('');
			setStartTimeError('');
		}
	};

	const validateEndTime = (event) => {
		const endTimeValue = event.target.value;
		if (endTimeValue.length < 2) {
			event.target.setCustomValidity('');
			setEndTimeError('');
			setButtonDisabled(true);
			return;
		}
		const [endHours, endMinutes] = endTimeValue.split(':').map(Number);
		const endTotalMinutes = endHours * 60 + endMinutes;

		const [startHours, startMinutes] = startTimeVal.split(':').map(Number);
		const startTotalMinutes = startHours * 60 + startMinutes;

		if (endTotalMinutes % incrementBy !== 0) {
			const errorMessage = `Window must be in ${incrementBy}-minute increments.`;
			event.target.setCustomValidity(errorMessage);
			setEndTimeError(errorMessage);
			setButtonDisabled(true);
		} else if (endTotalMinutes <= startTotalMinutes) {
			const errorMessage = 'End time must be after the start time.';
			event.target.setCustomValidity(errorMessage);
			setEndTimeError(errorMessage);
			setButtonDisabled(true);
		} else {
			event.target.setCustomValidity('');
			setEndTimeError('');
			setButtonDisabled(false);
		}
	};

	return (
		<>
			<div className="input-example">
				<TextInput 
					id='startTime' 
					label={'Start time'} 
					type="time"
					value={startTimeVal}
					ref={startTimeRef} 
					min={min} 
					max={max}
					onInput={(e) => { validateStartTime(e); }} 
					onChange={(e) => { 
						updateEndTimeMin(e);
						setStartTime(e.target.value); 
					}} 
					helpText={startTimeError} 
					hasError={startTimeError !== '' ? true : false} 
				/>
				<TextInput 
					id='endTime' 
					label={'End time'} 
					type="time"
					value={endTimeVal}
					ref={endTimeRef} 
					min={min} 
					max={max}
					onInput={(e) => { 
						validateEndTime(e);
						setEndTime(e.target.value);
					}} 
					disabled={!isStartTimeSet} 
					helpText={endTimeError} 
					hasError={endTimeError !== '' ? true : false}
				/>
			</div>	
			<BackButton disabled={buttonDisabled}/>
		</>
	)
}