import React from "react";
import { Link } from "react-router";

function Anchor({
	to = "/", 
	label = "Label",
	className = "",
	disabled = false
}) {

	return (
		<Link to={to} className={`anchor-link ${className}`} aria-disabled={disabled}>{label}</Link>
	)
}

export default Anchor;