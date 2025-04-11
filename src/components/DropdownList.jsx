import React from "react";

export const DropdownList = (
	{
		maxHeight = '360px', 
		dropdownPosition = '',
		onKeyDown = () => {},
		ref = '',
		children
	}) =>  {
	return (
		<ul className={`dropdown-list ${dropdownPosition}`} style={{maxHeight: maxHeight}} ref={ref} onKeyDown={onKeyDown}>
			{children}
		</ul>
	)
}