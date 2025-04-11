import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ type, name, id, label, className, disabled, placeholder, helpText, hasError, pattern, title, list, min, max, onChange, onBlur, onFocus, onInput, onKeyDown, ref, value }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleChange = (event) => {
		setInputValue(event.target.value);
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<div className={`base-text-input ${type}-input ${hasError ? 'has-error' : ''} ${className=''}`}>
			<label className='field-label' htmlFor={id}>{label}</label>
			<input
				type={type}
				name={name}
				id={id}
				value={inputValue}
				placeholder={placeholder}
				pattern={pattern}
				title={title}
				disabled={disabled}
				onChange={handleChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onInput={onInput}
				onKeyDown={onKeyDown}
				list={list}
				min={min}
				max={max}
				ref={ref}
			/>
			{helpText && <span className='help-text'>{helpText}</span>}
		</div>
	);
};

TextInput.PropTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	pattern: PropTypes.string,
	title: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	label: PropTypes.string,
	helpText: PropTypes.string,
	hasError: PropTypes.bool,
	list: PropTypes.node,
	min: PropTypes.string,
	max: PropTypes.string,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onInput: PropTypes.func,
	onKeyDown: PropTypes.func
}

export default TextInput;