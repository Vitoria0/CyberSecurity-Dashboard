import { Typography } from '@mui/material';

const Title = ({ text }) => {
	return (
		<Typography 
			sx={{
				fontFamily: 'Tektur, sans-serif',
				backgroundImage: 'linear-gradient(to bottom, #AD61FF, #14F194)',
				color: 'transparent',
				backgroundClip: 'text',
				WebkitBackgroundClip: 'text',
				WebkitTextFillColor: 'transparent',
				textAlign: 'center',
				fontWeight: 'bold',
				lineHeight: '1.1',
				fontSize: {xs: '2.8rem', sm: '3rem', md: '3.5rem', lg: '4rem', xl: '4.5rem'}
			}}
		>
			{text}
		</Typography>
	);
};

export default Title;
