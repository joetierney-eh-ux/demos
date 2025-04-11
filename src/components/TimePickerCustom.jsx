import React, { useRef, useState, useEffect } from 'react';
import TextInput from '../components/TextInput';
import { BackButton } from './BackButton';
import { DropdownList } from './DropdownList';
import { formatTime } from '../_helpers/timeHelpers';

const TimePickerCustom = ({
	incrementBy = 15,
	min = '08:00',
	max = '18:00',
	optionsListMaxHeight = '336px'
}) => {
	const [startTimeVal, setStartTime] = useState('');
	const [endTimeVal, setEndTime] = useState('');
	const [showStartDropdown, setShowStartDropdown] = useState(false);
	const [showEndDropdown, setShowEndDropdown] = useState(false);
	const [dropdownPosition, setDropdownPosition] = useState('below');

	const startTimeRef = useRef(null);
	const endTimeRef = useRef(null);
	const dropdownRef = useRef(null);
	const [startTimeError, setStartTimeError] = useState('');
	const [endTimeError, setEndTimeError] = useState('');
	const [isStartTimeSet, setIsStartTimeSet] = useState(false);
	const [startTimeOptions, setStartTimeOptions] = useState([]);
	const [endTimeOptions, setEndTimeOptions] = useState([]);

	const [buttonDisabled, setButtonDisabled] = useState(true);

	const generateTimeOptions = (min, max, increment) => {
		const options = [];
		let currentTime = new Date();
		const [minHours, minMinutes] = min.split(':').map(Number);
		const [maxHours, maxMinutes] = max.split(':').map(Number);
		currentTime.setHours(minHours, minMinutes, 0, 0);

		const endTime = new Date();
		endTime.setHours(maxHours, maxMinutes, 0, 0);

		while (currentTime <= endTime) {
			options.push({
				value: currentTime.toTimeString().substr(0, 5),
				display: formatTime(currentTime)
			});
			currentTime.setMinutes(currentTime.getMinutes() + increment);
		}

		return options;
	};

	const updateEndTimeMin = () => {
		if (startTimeRef.current) {
			const startTimeValue = startTimeRef.current.value;
			setIsStartTimeSet(!!startTimeValue); 

			const [hours, minutes] = startTimeValue.split(':').map(Number);
			const startDate = new Date();
			startDate.setHours(hours, minutes, 0, 0);
			startDate.setMinutes(startDate.getMinutes() + incrementBy);
			const endTimeFormatted = startDate.toTimeString().substr(0, 5);
			endTimeRef.current.value = '';

			const options = generateTimeOptions(endTimeFormatted, max, incrementBy);
			setEndTimeOptions(options);
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

	const handleOptionClick = (ref, value) => {
		ref.current.value = value;
		if (ref === startTimeRef) {
			setStartTime(value); 
			updateEndTimeMin();
			setStartTimeError('');
		} else if (ref === endTimeRef) {
			setEndTime(value);
			setEndTimeError('');
			setButtonDisabled(false);
		}
		setShowStartDropdown(false);
		setShowEndDropdown(false);
	};

	const handleListKeyDown = (event) => {
		const { key, keyCode } = event;
		const buttons = dropdownRef.current.querySelectorAll('button');
		const currentIndex = Array.from(buttons).indexOf(document.activeElement);

		if (key === 'ArrowDown') {
			event.preventDefault();
			const nextIndex = (currentIndex + 1) % buttons.length;
			buttons[nextIndex].focus();
		} else if (key === 'ArrowUp') {
			event.preventDefault();
			if (currentIndex === 0) {
				if (showStartDropdown) {
					startTimeRef.current.focus();
				} else if (showEndDropdown) {
					endTimeRef.current.focus();
				}
			} else {
				const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
				buttons[prevIndex].focus();
			}
		} else if (key === 'Escape' || keyCode === 27) {
			buttons[currentIndex].blur();
		}
	};

	const startOptions = generateTimeOptions(min, max, incrementBy);

	const calculateDropdownPosition = (inputRef) => {
		const inputRect = inputRef.current.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const spaceAbove = inputRect.top;
		const spaceBelow = viewportHeight - inputRect.bottom;

		if (spaceBelow < parseInt(optionsListMaxHeight) && spaceAbove > spaceBelow) {
			setDropdownPosition('above');
		} else {
			setDropdownPosition('below');
		}
	};

	useEffect(() => {
		const handleScrollOrResize = () => {
			if (showStartDropdown) {
				calculateDropdownPosition(startTimeRef);
			}
			if (showEndDropdown) {
				calculateDropdownPosition(endTimeRef);
			}
		};
	
		const handleKeyDown = (event) => {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				if (showStartDropdown && dropdownRef.current) {
					const firstButton = dropdownRef.current.querySelector('button');
					if (firstButton) {
						firstButton.focus();
					}
				} else if (showEndDropdown && dropdownRef.current) {
					const firstButton = dropdownRef.current.querySelector('button');
					if (firstButton) {
						firstButton.focus();
					}
				}
			}
		};
	
		const startInput = startTimeRef.current;
		const endInput = endTimeRef.current;
	
		window.addEventListener('scroll', handleScrollOrResize);
		window.addEventListener('resize', handleScrollOrResize);
		if (startInput) {
			startInput.addEventListener('keydown', handleKeyDown);
		}
		if (endInput) {
			endInput.addEventListener('keydown', handleKeyDown);
		}
	
		if (showStartDropdown) {
			calculateDropdownPosition(startTimeRef);
		}
		if (showEndDropdown) {
			calculateDropdownPosition(endTimeRef);
		}
	
		return () => {
			window.removeEventListener('scroll', handleScrollOrResize);
			window.removeEventListener('resize', handleScrollOrResize);
			if (startInput) {
				startInput.removeEventListener('keydown', handleKeyDown);
			}
			if (endInput) {
				endInput.removeEventListener('keydown', handleKeyDown);
			}
		};
	}, [showStartDropdown, showEndDropdown]);

	return (
		<>
			<div className="input-example">
				<div className="custom-dropdown">
					<TextInput 
						label={'Start time'} 
						type='time' 
						id='startTime' 
						ref={startTimeRef} 
						min={min} 
						max={max} 
						value={startTimeVal}
						onFocus={() => { 
							setStartTimeOptions(startOptions); 
							setShowStartDropdown(true); 
						}} 
						onInput={(e) => { validateStartTime(e); }} 
						onChange={(e) => { updateEndTimeMin(e); }} 
						helpText={startTimeError} 
						hasError={startTimeError !== '' ? true : false} 
					/>
					{showStartDropdown && (
						<DropdownList maxHeight={optionsListMaxHeight} dropdownPosition={dropdownPosition}ref={dropdownRef} onKeyDown={handleListKeyDown}>
							{startOptions.map((option, index) => (
								<li key={index}>
									<button type='button' onClick={() => handleOptionClick(startTimeRef, option.value, option.display)}>
										{option.display}
									</button>
								</li>
							))}
						</DropdownList>
					)}
				</div>
				<div className="custom-dropdown">
					<TextInput 
						label={'End time'} 
						type='time' 
						id='endTime' 
						ref={endTimeRef} 
						min={min} 
						max={max} 
						value={endTimeVal} 
						onFocus={() => { 
							setEndTimeOptions(endTimeOptions); 
							setShowEndDropdown(true);  
						}} 
						onInput={(e) => { validateEndTime(e); }} 
						disabled={!isStartTimeSet} 
						helpText={endTimeError} 
						hasError={endTimeError !== '' ? true : false} 
					/>
					{isStartTimeSet && showEndDropdown && (
						<DropdownList maxHeight={optionsListMaxHeight} dropdownPosition={dropdownPosition}ref={dropdownRef} onKeyDown={handleListKeyDown}>
							{endTimeOptions.map((option, index) => (
								<li key={index}>
									<button type="button" onClick={() => handleOptionClick(endTimeRef, option.value, option.display)}>
										{option.display}
									</button>
								</li>
							))}
						</DropdownList>
					)}
				</div>
			</div>
			<BackButton disabled={buttonDisabled}/>
		</>
	);
};

export default TimePickerCustom;