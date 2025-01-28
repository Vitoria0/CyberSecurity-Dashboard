import fs from 'fs/promises';
import path from 'path';

async function createComponentInFolder(folderName) {
	const componentContent = `
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Botao } from '../../components/Botao';
import backgorund from '../../assets/img/Finalizacao.png';
import Title from '../../components/Texts/title'; 
import backgorund from '../../assets/img/Finalizacao.png';

const ${folderName} = () =>{
		const [isVisible, setIsVisible] = useState(false);
	const [block1, setBlock1] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timeout);
	}, []);

	const handleUnlockBlock = () => {
		setBlock1(true);
	};

    return(
       <Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				background: '#030012',
				backgroundImage: "url($ {backgorund})",
				backgroundSize: '100vw',
				backgroundRepeat: 'no-repeat',
				alignItems: 'center',
				width: '100vw',
				margin: 0,
				padding: 0,
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
					height: '100vh',
					margin: 0,
					padding: 0,
					color: '#fff',
					gap: 20,
					transform: isVisible ? 'scale(1)' : 'scale(0.5)',
					opacity: isVisible ? 1 : 0,
					transition: 'all 700ms ease-in-out',
				}}
			>
				<Box
					sx={{
						alignItems: 'center',
						width: '100%',
						gap: 3,
						margin: '0 auto',
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'column',
					}}
				>
					<Title text='O que é Segurança da Informação?' />
					<Typography variant='body1' color='secondary' align='center' maxWidth='50rem'>
						Vamos aprender os pilares da segurança da informação
					</Typography>
				</Box>
				<Botao.Primary text='Iniciar Etapa' onClick={handleUnlockBlock} />
			</Box>

			{block1 && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'top',
						flexDirection: 'column',
						alignItems: 'center',
						width: '100%',
						marginBottom: block2 ? '0' : '5rem',
						py: 5,
						padding: 0,
						color: '#fff',
						gap: 5,
					}}
				></Box>)}
				
		</Box>
    )
}

export default ${folderName}
`;

	const scriptDir = process.cwd();

	const folderPath = path.join(scriptDir, 'src', 'pages', folderName);
	const componentPath = path.join(folderPath, `${folderName}.jsx`);

	try {
		await fs.mkdir(folderPath, { recursive: true });
		await fs.writeFile(componentPath, componentContent);
		console.log(`Componente criado em src/pages/${folderName}/${folderName}.jsx`);
	} catch (error) {
		console.error('Ocorreu um erro ao criar o componente:', error);
	}
}

if (process.argv.length !== 3) {
	console.error('Uso: node createComponent.js <NomeDaPasta>');
	process.exit(1);
}

const folderName = process.argv[2];
createComponentInFolder(folderName);
