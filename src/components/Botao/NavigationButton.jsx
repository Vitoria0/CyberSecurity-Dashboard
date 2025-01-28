import { Button, Typography } from '@mui/material';
import { useNavigation } from '../../hooks/NavigationContext';

export const Navigation = ({ page, text, disable, callback }) => {
	const { navigateTo } = useNavigation();
	return (
		<Button
			variant='oulined'
			onClick={
				disable
					? () => {
							console.log('disabled');
					  }
					: async () => {
							if (callback !== undefined) {
								await callback();
							}
							navigateTo(page);
					  }
			}
			disabled={disable}
			sx={{
				px: 6,
				py: 1.5,
				border: '2px solid #AD61FF',
				background: '#030012',
				opacity: disable ? 0.3 : 1,
				borderRadius: '99px',
				transition: 'all 200ms ease-in-out',
				'&:hover': {
					border: 0,
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
				variant='p'
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
