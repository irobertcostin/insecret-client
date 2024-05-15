import getApiUrl from "./SetApi";


const apiUrl = getApiUrl();


export default class UserService {
    api(path, method = "GET", body = null, token) {

        const url = apiUrl + "/users" + path;


        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }

        if (token) {

            options.headers.Authorization = `Bearer ${token}`
        }
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options)

    }


    async register(user) {
        try {
            let data = await this.api('/register', "POST", user)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error
        }
    }


    async login(user) {
        try {
            let data = await this.api('/login', "POST", user)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error;
        }
    }


    async validationToken(email) {
        try {
            let data = await this.api('/resend-validation-token', "POST", email)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error;
        }
    }


    async activateAccount(token) {
        try {
            let data = await this.api('/activate-account', "POST", token)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error;
        }
    }

    async forgottenPassword(body) {
        try {
            let data = await this.api('/forgot-password', "POST", body)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error;
        }
    }


    async confirmPasswordReset(body) {
        try {
            let data = await this.api('/confirm-password-reset', "POST", body)
            let resp = await data.json();
            return resp
        } catch (error) {
            return error;
        }
    }




}