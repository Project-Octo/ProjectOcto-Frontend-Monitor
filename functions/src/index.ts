import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const additionalUserInfo = {
	setting: {
		endangeredShow: true,
		protectedShow: true,
	},
};

export const onNewUser = functions
	.region('asia-northeast3')
	.auth.user()
	.onCreate((user) => {
		const { uid, email, displayName, photoURL } = user;
		return db.collection('Users').doc(uid).set({
			email,
			displayName,
			photoURL,
			additionalUserInfo,
		});
	});
