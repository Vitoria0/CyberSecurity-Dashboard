const moment = require('moment-timezone');
const admin = require('firebase-admin');

const { v4: uuidv4 } = require('uuid');

var serviceAccount = require('./cybersecuritycourse-eaf81-firebase-adminsdk-ou1ty-826f07ee06.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const { onRequest, onCall } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const functions = require('firebase-functions');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.createUser = functions.https.onCall(async (data, context) => {
	try {
		if (data.accepted == true) {
			throw new functions.https.HttpsError('permission-denied', 'permission-denied!');
		}
		const batch = db.batch();

		// Criar o usuário no Firebase Authentication
		const userRecord = await admin.auth().createUser({
			email: data.email,
			password: data.password,
		});

		// Construir os dados do usuário
		const timestamp = Number(moment().format('YYYYMMDDHHmmssSSS'));
		const user = {
			id: userRecord.uid,
			name: data.name,
			email: data.email,
			accepted: false,
			createdAt: timestamp,
			updatedAt: timestamp,
			profile: 1,
		};

		// Adicionar o usuário ao Firestore
		const userRef = db.collection('users').doc(user.id);
		batch.set(userRef, user);

		// Commit das operações do Firestore
		await batch.commit();

		// Retornar o usuário criado
		return { status: 200, body: user };
	} catch (error) {
		logger.error(error);
		return { status: 500, body: { error: error, message: error.message } };
	}
});
