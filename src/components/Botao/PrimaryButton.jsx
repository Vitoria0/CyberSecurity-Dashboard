import { Button, Typography } from '@mui/material';

export const Primary = ({ page, text, onClick, disable }) => {
	return (
		<Button
			variant='outlined'
			onClick={disable ? () => {} : onClick}
			disabled={disable}
			sx={{
				px: 6,
				py: 1.5,
				border: '2px solid #AD61FF',
				background: '#030012',
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
					backgroundImage: 'linear-gradient(to bottom, #AD61FF, #14F194)',
					color: 'transparent',
					backgroundClip: 'text',
					WebkitBackgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				{text}
			</Typography>
		</Button>
	);
};
