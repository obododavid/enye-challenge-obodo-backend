const admin = require('firebase-admin');
require("dotenv").config();

const serviceAccount = {
    "type": process.env.serviceAccount_Type,
    "project_id": process.env.serviceAccount_ProjectId,
    "private_key_id": process.env.serviceAccount_PrivateKeyId,
    "private_key": process.env.serviceAccount_PrivateKey,
    "client_email": process.env.serviceAccount_ClientEmail,
    "client_id": process.env.serviceAccount_ClientId,
    "auth_uri": process.env.serviceAccount_AuthUri,
    "token_uri": process.env.serviceAccount_TokenUri,
    "auth_provider_x509_cert_url": process.env.serviceAccount_AuthProvider,
    "client_x509_cert_url": process.env.serviceAccount_Client
}



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://enye-cohort4-obodo.firebaseio.com"
});

const db = admin.firestore()

const snapshotToArray = (snapshot) => {
    let returnArr = [];
    snapshot.forEach((childSnapshot) => {
        var item = childSnapshot.data();
        item.id = childSnapshot.id;

        returnArr.push(item);
    });
    console.log(returnArr)
    return returnArr;
};

const resolverFunctions = {
    Query: {
        hello: () => 'Obodo David built this :)',
        getSearchResults: (_, { id }) => {
            console.log(id)
            return db.collection('searches').where("userId", "==", `${id}`)
                .get()
                .then((snapshot) => {
                    return snapshotToArray(snapshot);
                })
        }
    }
};

module.exports = resolverFunctions;