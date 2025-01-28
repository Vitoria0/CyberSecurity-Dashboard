import { Button, Typography } from '@mui/material';

export const Secondary = ({ text, onClick }) => {
	return (
		<Button
			variant='outlined'
			onClick={onClick}
			sx={{
				px: 4,
				py: 0.5,
				border: '2px solid #AD61FF',
				background: 'transparent',
				borderRadius: '99px',
				transition: 'all 200ms ease-in-out',
				'&:hover': {
					transform: 'scale(1.1)',
					border: '2px solid #AD61FF',
					borderRadius: '99px',
				},
				'&:focus': {
					outline: 'none',
					border: '2px solid #AD61FF',
					borderRadius: '99px',
				},
			}}
		>
			<Typography
				variant='body1'
				sx={{
					fontFamily: 'Tektur, sans-serif',
					color: '#AD61FF',
					textAlign: 'center',
					fontSize: { xs: '0.5rem', md: '0.8rem', lg: '0.85rem', xl: '0.9rem' },
					fontWeight: 'bold',
				}}
			>
				{text}
			</Typography>
		</Button>
	);
};
