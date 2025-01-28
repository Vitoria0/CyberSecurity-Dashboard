import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

// Classe estática para representar o usuário logado
export class LoggedUser {
	static data = null; // Dados do Firestore

	static set(data) {
		this.data = data;
	}

	static get() {
		console.log(this.data);
		return this.data;
	}

	static clear() {
		this.data = null;
	}
}

// Função para login do usuário
export async function loginWithEmailAndPassword(email, password) {
	try {
		// Autenticar o usuário
		const userCredential = await signInWithEmailAndPassword(auth, email, password);

		// Buscar dados adicionais do Firestore
		const userDocRef = doc(db, 'users', userCredential.user.uid);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			console.log('Dados do usuário:', userDocSnap.data());
			// Atualizar os dados do usuário logado
			LoggedUser.set({ ...userDocSnap.data() });
		} else {
			throw new Error('Usuário não encontrado no Firestore.');
		}
	} catch (error) {
		console.error('Erro ao logar ou buscar dados:', error);
		throw error;
	}
}

// Função para logout do usuário
export async function logout() {
	try {
		await auth.signOut();
		LoggedUser.clear(); // Limpa os dados do usuário logado
	} catch (error) {
		console.error('Erro ao deslogar:', error);
		throw error;
	}
}

// Função para criar um novo usuário
export async function createUserWithEmailAndPassword(name, email, password) {
	try {
		const functions = getFunctions();
		const callableReturnMessage = httpsCallable(functions, 'createUser');
		const userCredential = await callableReturnMessage({ name, email, password });
		return userCredential.user;
	} catch (error) {
		console.error('Erro ao criar usuário:', error);
		throw error;
	}
}
