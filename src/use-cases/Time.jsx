import React from 'react';
import { TimesTextInputs } from '../components/Times';
import Heading from '../components/Heading';

export const Time_1 = () => {

	const incrementBy = 30;

	return (
		<>
			<Heading level={1} displayClass={2}>Blocking time</Heading>
			<div className="explanation-text">
				<p>Imagine you are scheduling an availability window for a service provider. 
				Service rules require availability windows be in <b><i>{incrementBy}-minute 
				increments</i></b>, during normal business hours.</p>
				<p>Use the fields below to set an availability window to start 
				no earlier than 9:00 AM and end at any {incrementBy}-minute increment after that.
				When you&rsquo;re finished, click the &ldquo;Submit&rdquo; button.</p>
				<p className="hint">Try using your mouse or keyboard (or a combination of both) to set the times.</p>
			</div>
			<Heading level={2} displayClass={3}>Set availability window</Heading>
			<TimesTextInputs incrementBy={incrementBy}/>
		</>
	)
}