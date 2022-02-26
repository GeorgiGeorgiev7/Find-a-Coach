export default {
    login() {

    },
    async signup(context, payload) {
        const API_SIGNUP_KEY = 'AIzaSyBAqG4EoS3Pebm7IHz0K87VGAC5IWwI8i8';

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_SIGNUP_KEY}`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const responseData = await response.json();

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        });

    }
}