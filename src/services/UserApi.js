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
            console.log(error)
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



}