import React, { useState } from 'react';
import DateInputGroup from '../components/DateInputGroup';
import TextInput from '../components/TextInput';
import Heading from '../components/Heading';
import { BackButton } from '../components/BackButton';

export const DOB_1 = () => {

  return (
    
      <div className="input-example">
        <DateInputGroup
          label={'Date of birth 1'}
        />
      </div>
      
  )
}

export const DOB_2 = () => {

  return (
    
      <div className="input-example">
        <DateInputGroup
          label={'Date of birth 2'}
          useMonthList
        />
      </div>
      
  )
}

export const DOB_3 = () => {

  return (
    
      <div className="input-example">
        <DateInputGroup
          label={'Date of birth 3'}
          useMonthList
          useDayList
        />
      </div>
      
  )
}

export const DOB_4 = () => {

  const [value, setValue] = useState('');
  const formatDateString = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    const formattedValue = input
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
      .substring(0, 10);
    setValue(formattedValue);
  };

  return (
    
      <div className="input-example">
        <TextInput 
          type="text" 
          placeholder={"mm/dd/yyyy"} 
          pattern={"\d{2}/\d{2}/\d{4}"} 
          onChange={formatDateString} 
          value={value}
          label={'Date of birth 4'}
        />
      </div>
    
  )
}

export const DOB_5 = () => {

  const [value, setValue] = useState('');
  const formatDateString = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    const formattedValue = input
      .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
      .substring(0, 10);
    setValue(formattedValue);
  };

  return (
    <div className="input-example">
      <TextInput 
        type="date" 
        placeholder={"mm/dd/yyyy"} 
        pattern={"\d{2}/\d{2}/\d{4}"}
        label={'Date of birth 5'}
        onChange={formatDateString}
      />
    </div>
  )
}

export const DOB_All = () => {
  return (
    <>
      <Heading displayClass={2}>Birth Date inputs</Heading>
			<div className="explanation-text">
				<p>In healthcare tools, entering a <i>known date</i> (e.g., birth date) 
        is very common. Below you will see five unique methods 
        to input a <i>date of birth</i>. Go through each method and enter the 
        same date for all five. While doing so, consider how intuitive each is 
        (or isn&rsquo;t). When you&rsquo;re finished, click &ldquo;I’m done&rdquo;.</p>	
				<p className="hint">Try using your mouse or keyboard (or a combination of both) as you move through each set of fields.</p>
			</div>
      <DOB_1/>
      <DOB_2/>
      <DOB_3/>
      <DOB_4/>
      <DOB_5/>
      <BackButton label={'I’m done'}/>
    </>
  )
}
