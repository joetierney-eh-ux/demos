import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ level = 1, children, displayClass = 1, className }) => {
	const Tag = `h${level}`;

	return <Tag className={`display-h${displayClass} ${className}`}>{children}</Tag>
};

Heading.propTypes = {
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	children: PropTypes.node.isRequired,
};

export default Heading;