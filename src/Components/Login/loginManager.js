import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                // isSignIn: true,
                name: displayName,
                email: email,
                // photo: photoURL,
                // success: true,
            }
            return (signedInUser)

        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                // isSignIn: false,
                name: '',
                email: '',
                // photo: '',
                // error: '',
                // success: false,
            }
            return (signOutUser);
        })
        .catch(err => {

        })
}



export const CreateUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            // newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(error => {
            var errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            // newUserInfo.success = false;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            // newUserInfo.success = true;
            return newUserInfo;
        })


        .catch(error => {
            var errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            // newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name

    }).then(function () {
        console.log('User Name Updated successfully');
    }).catch(function (error) {
        console.log(error);
    });
}

const storeauthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            console.log(idToken);
            // ...
        }).catch(function (error) {
            // Handle error
        });
}
