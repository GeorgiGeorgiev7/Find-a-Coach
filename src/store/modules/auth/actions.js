import router from '../../../router';


let timer;

export default {
    async login(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        });
    },
    async signup(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        });
    },
    async auth(context, payload) {
        const API_WEB_KEY = 'AIzaSyBAqG4EoS3Pebm7IHz0K87VGAC5IWwI8i8';

        let url;

        if (payload.mode === 'login') {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_WEB_KEY}`;
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_WEB_KEY}`;
        }

        const response = await fetch(url, {
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
            throw new Error('Authentication failed!');
        }

        const responseData = await response.json();

        const expirationDate = new Date().getTime() + 5000;

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('expirationDate', expirationDate);

        timer = setTimeout(() => {
            context.dispatch('logout');
        }, 5000);

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId
        });
    },
    attemptLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = localStorage.getItem('expirationDate');

        const timeLeft = expirationDate - new Date().getTime();

        if (timeLeft <= 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch('logout');
        }, timeLeft);

        if (token && userId) {
            context.commit('setUser', {
                token,
                userId
            });
        }
    },
    logout(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expirationDate');

        clearTimeout(timer);

        context.commit('setUser', {
            userId: null,
            token: null
        });

        router.replace('/');
    }
};