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

const mockUsers = [
	{ id: 1, nome: 'João Silva', email: 'joao@gmail.com', numero: '123456789', pago: true, andamento: 'Concluído' },
	{
		id: 2,
		nome: 'Maria Santos',
		email: 'maria@gmail.com',
		numero: '987654321',
		pago: false,
		andamento: 'Pendente',
	},
	{
		id: 3,
		nome: 'Carlos Souza',
		email: 'carlos@gmail.com',
		numero: '567890123',
		pago: true,
		andamento: 'Em Progresso',
	},
	{ id: 4, nome: 'Ana Oliveira', email: 'ana@gmail.com', numero: '678901234', pago: false, andamento: 'Pendente' },
	{ id: 5, nome: 'Pedro Lima', email: 'pedro@gmail.com', numero: '234567890', pago: true, andamento: 'Concluído' },
	{
		id: 6,
		nome: 'Julia Costa',
		email: 'julia@gmail.com',
		numero: '345678901',
		pago: false,
		andamento: 'Em Progresso',
	},
];

export const SearchableTable = () => {
	const [users, setUsers] = useState(mockUsers);
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleSearch = () => {
		const filteredUsers = mockUsers.filter(user =>
			Object.values(user).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase())),
		);
		setUsers(filteredUsers);
	};

	const handlePagoToggle = id => {
		setUsers(prevUsers => prevUsers.map(user => (user.id === id ? { ...user, pago: !user.pago } : user)));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedUsers = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
								<TableCell>{user.nome}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.numero}</TableCell>
								<TableCell>
									<Switch
										checked={user.pago}
										onChange={() => handlePagoToggle(user.id)}
										color='primary'
									/>
								</TableCell>
								<TableCell>{user.andamento}</TableCell>
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
