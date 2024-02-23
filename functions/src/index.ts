import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

export const onNewUser = functions
	.region('asia-northeast3')
	.auth.user()
	.onCreate((user) => {
		db.collection('Users')
			.doc(user.uid)
			.set(JSON.parse(JSON.stringify(user)));
	});

export const saveLocation = functions.region('asia-northeast3').https.onCall((data, context) => {
    return db
        .collection('Users')
        .doc(context.auth?.uid)
        .collection('Locations')
        .add(data);
});