import { useState, useEffect } from 'react';
import { Box, TextField, Button, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import img from '../../assets/img/login.png';
import { useNavigation } from '../../hooks/NavigationContext';
import { loginWithEmailAndPassword, LoggedUser } from '../../services/authService';
import Subtitle from '../../components/Texts/subtitle';

const Homepage = () => {
	const { navigateTo } = useNavigation();
	const [isVisible, setIsVisible] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [formData, setFormData] = useState({ email: '', password: '', name: '' });
	const [showPassword, setShowPassword] = useState(false);
	const [isPaying, setIsPaying] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timeout);
	}, []);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prevData => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		try {
			if (isLogin) {
				await loginWithEmailAndPassword(formData.email, formData.password);
				if (LoggedUser.get()) {
					navigateTo('Menu');
				} else {
					setError('Usuário ou senha incorretos');
				}
			}
		} catch (error) {
			if (error.code === 'auth/invalid-credential') {
				setError('Usuário ou senha incorretos');
			} else {
				setError('Ocorreu um erro. Tente novamente.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				background: '#04000F',

				backgroundRepeat: 'no-repeat',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				margin: 0,
				padding: 0,
				color: '#fff',
				gap: 2,
			}}
		>
			<Box
				sx={{
					alignItems: 'center',
					width: '100%',
					height: '100%',
					gap: 2,
					display: 'flex',
					justifyContent: 'start',
					flexDirection: 'row-reverse',
				}}
			>
				<Box
					sx={{
						width: { xs: '100%', md: '40%' },
						px: 4,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'start',
						flexDirection: 'row',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 3,
							width: '100%',
							maxWidth: '450px',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 3,
								width: '100%',
								background: '#181324',
								borderRadius: '10px',
								padding: '20px',
							}}
						>
							<Subtitle text={'Segurança da Informação Admin'} />
							<form onSubmit={handleSubmit}>
								<TextField
									label='Email'
									variant='outlined'
									color='primary'
									fullWidth
									margin='normal'
									name='email'
									value={formData.email}
									onChange={handleChange}
								/>
								<TextField
									label='Senha'
									type={showPassword ? 'text' : 'password'}
									variant='outlined'
									color='secondary'
									fullWidth
									margin='normal'
									name='password'
									value={formData.password}
									onChange={handleChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													aria-label='toggle password visibility'
													onClick={handleClickShowPassword}
													edge='end'
													sx={{
														'&:focus': { border: 'none' },
													}}
												>
													{showPassword ? (
														<VisibilityOff
															sx={{
																color: '#fff',
																'&:focus': {
																	border: 'none',
																},
															}}
														/>
													) : (
														<Visibility
															sx={{
																color: '#fff',
																'&:focus': {
																	border: 'none',
																},
															}}
														/>
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								{error && (
									<Alert severity='error' sx={{ marginTop: 2 }}>
										{error}
									</Alert>
								)}
								<Button
									type='submit'
									variant='contained'
									color='primary'
									fullWidth
									sx={{ marginTop: 2 }}
								>
									{isLoading ? (
										<CircularProgress size={24} sx={{ color: '#fff' }} />
									) : (
										'Entrar'
									)}
								</Button>
							</form>
							<Box
								sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}
							></Box>
						</Box>
					</Box>
				</Box>

				<Box
					sx={{
						width: { xs: '0', md: '100%' },
						height: '100%',
						backgroundImage: `url(${img})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						display: { xs: 'none', lg: 'flex' },
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				></Box>
			</Box>
		</Box>
	);
};

export default Homepage;
