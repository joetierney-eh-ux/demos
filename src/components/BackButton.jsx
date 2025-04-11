import Anchor from '../components/Anchor';

export const BackButton = ({disabled = false, label= 'Submit'}) => { 
	return (
		<Anchor 
			to="/demos/thanks" 
			label={label} 
			className={`button button-primary button-lg button-submit ${disabled == true ? 'disabled' : ''}`} 
			disabled={disabled}
		/>
	) 
}