import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	IconButton,
	Switch,
	Box,
	TablePagination,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import {changePaymentStatus} from '../../services/userService';


export const SearchableTable = (initialUsers = []) => {
	const [users, setUsers] = useState(initialUsers["users"]);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleSearch = () => {
		// const filteredUsers = mockUsers.filter(user =>
		// 	Object.values(user).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
		// );
		// setUsers(filteredUsers);
	};

	const handlePagoToggle = user => {
		changePaymentStatus(user);
		console.log(users)
		setUsers(users.map(u => (u.id === user.id ? { ...u, isPaying: !u.isPaying } : u)));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	console.log(users)
	const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	console.log(Array.isArray(paginatedUsers));
	return (
		<Box sx={{ width: '100%', p: 2 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
				<TextField
					variant='outlined'
					label='Pesquisar'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					sx={{ flex: 1, mr: 2 }}
				/>
				<IconButton
					onClick={handleSearch}
					sx={{
						borderRadius: '5px',
						backgroundColor: '#2E96FF',
						color: 'white',
						padding: '10px',
						cursor: 'pointer',
						transition: 'all 200ms ease-in-out',
						'&:hover': {
							backgroundColor: '#14F194',
						},
					}}
				>
					<Search sx={{ fontSize: '35px' }} />
				</IconButton>
			</Box>
			<TableContainer sx={{ maxHeight: 400, overflowX: 'auto', width: '100%' }}>
				<Table stickyHeader sx={{ width: '100%' }}>
					<TableHead>
						<TableRow>
							<TableCell>Nome</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Número</TableCell>
							<TableCell>Pago</TableCell>
							<TableCell>Andamento</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedUsers.map(user => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.number}</TableCell>
								<TableCell>
									<Switch
										checked={user.isPaying}
										onChange={() => handlePagoToggle(user)}
										color='primary'
									/>
								</TableCell>
								<TableCell>{user.progress < 21 ? 'Concluído' : 'Em Progresso'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[4, 8, 12]}
				component='div'
				count={users.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Box>
	);
};
