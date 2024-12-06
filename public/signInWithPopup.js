import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
	apiKey: 'AIzaSyDnY6QfGkomnyKr6tw3qTsfza1Pr3x2vbk',
	authDomain: 'interviewcopilot-443620.firebaseapp.com',
	projectId: 'interviewcopilot-443620',
	storageBucket: 'interviewcopilot-443620.firebasestorage.app',
	messagingSenderId: '318745197838',
	appId: '1:318745197838:web:7a543cff2bbb25243e6b5f',
	measurementId: 'G-22D270XEHG'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()

// This code runs inside of an iframe in the extension's offscreen document.
// This gives you a reference to the parent frame, i.e. the offscreen document.
// You will need this to assign the targetOrigin for postMessage.
const PARENT_FRAME = document.location.ancestorOrigins[0]

// This demo uses the Google auth provider, but any supported provider works.
// Make sure that you enable any provider you want to use in the Firebase Console.
// https://console.firebase.google.com/project/_/authentication/providers
const PROVIDER = new GoogleAuthProvider()

function sendResponse(result) {
	globalThis.parent.self.postMessage(JSON.stringify(result), PARENT_FRAME)
}

globalThis.addEventListener('message', function ({ data }) {
	if (data.initAuth) {
		// Opens the Google sign-in page in a popup, inside of an iframe in the
		// extension's offscreen document.
		// To centralize logic, all respones are forwarded to the parent frame,
		// which goes on to forward them to the extension's service worker.
		signInWithPopup(auth, PROVIDER).then(sendResponse).catch(sendResponse)
	}
})
