import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigation } from '../../hooks/NavigationContext';
import { LoggedUser, logout } from '../../services/authService';
import { getStudents } from '../../services/userService';
import { ExitToAppRounded } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { Gauge } from '@mui/x-charts';
import { SearchableTable } from '../../components/Table/table';
const Menu = () => {
	const { navigateTo } = useNavigation();
	const [users, setUsers] = useState([]);

	useEffect( () => {
		// Atualiza o LoggedUser sempre que o componente é carregado
		async function fetchStudents() {
			try {
				var currentUsers = await getStudents()
				setUsers(currentUsers)
			} catch (error) {
				console.error('Erro ao atualizar dados do usuário:', error);
			}
		}
		
		fetchStudents();
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'top',
				flexDirection: 'column',
				background: '#04000F',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				alignItems: 'center',
				minHeight: '100vh',
				width: '100vw',
				margin: 0,
				padding: 3,
				color: '#fff',
				gap: 8,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					margin: 0,
					padding: 0,
					color: '#fff',
					gap: 20,
					transition: 'all 700ms ease-in-out',
				}}
			>
				<Box
					sx={{
						alignItems: 'center',
						width: '100%',
						gap: 2,
						margin: { xs: '5rem 0', md: '0 auto' },
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<IconButton
						onClick={() => {
							logout();
							navigateTo('Homepage');
						}}
						sx={{
							borderRadius: '50%',
							backgroundColor: '#2E96FF',
							color: 'white',
							padding: '10px',
							position: 'absolute',
							top: '20px',
							right: '15px',
							cursor: 'pointer',
							transition: 'all 200ms ease-in-out',

							'&:hover': {
								backgroundColor: '#14F194',
							},
						}}
					>
						<ExitToAppRounded />
					</IconButton>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: { xs: 'wrap', md: 'nowrap' },
							justifyContent: 'center',
							alignItems: 'center',
							gap: 2,
							margin: '0 auto',
							width: { xs: '100%', sm: '80%', md: '90%' },
						}}
					>
						<ModuloMenu titulo={'Número Total de Alunos:'}>
							<Typography
								variant='h2'
								sx={{
									fontFamily: 'Inter, sans-serif',
									color: '#2E96FF',
									textAlign: 'center',
									fontWeight: 'bold',
									height: '86%',
									width: 370,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{users.length}
							</Typography>
						</ModuloMenu>
						<ModuloMenu titulo={'Alunos Formados'}>
							<PieChart
								series={[
									{
										data: [
											{ id: 0, value:  users.filter(user => user.progress >= 21).length, label: 'Formados' },
											{ id: 1, value: users.filter(user => user.progress < 21).length, label: 'Não formados' },
										],
									},
								]}
								width={350}
								height={130}
							/>
						</ModuloMenu>
						<ModuloMenu titulo={'Alunos Pagos/Pendente'}>
							<Gauge width={350} height={130} value={(users.filter(user => user.isPaying).length/users.length * 100).toFixed(2) } />
						</ModuloMenu>
					</Box>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: { xs: 'wrap', sm: 'nowrap' },
							justifyContent: 'center',
							alignItems: 'center',
							gap: 2,
							margin: '0 auto',
							backgroundColor: '#2D2C2C',
							width: { xs: '100%', md: '90%' },
						}}
					>
					{ users.length != 0  && <SearchableTable users={users}/>}	
					</Paper>
				</Box>
			</Box>
		</Box>
	);
};

export default Menu;

const ModuloMenu = ({ children, titulo }) => {
	return (
		<Paper
			elevation={3}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				aspectRatio: 52 / 31,
				backgroundColor: '#2D2C2C',
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontFamily: 'Inter, sans-serif',
					color: '#2E96FF',
					textAlign: 'center',
					fontWeight: 'bold',
				}}
			>
				{titulo}
			</Typography>
			{children}
		</Paper>
	);
};
