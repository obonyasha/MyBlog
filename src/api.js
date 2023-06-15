class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.token = token;
    }
    setHeaders(isCT = false, noToken = false) {// все заголовки имеют Bearer , isCT добавляет Content-Type
        const headerObj = {
            "Authorization": `Bearer ${this.token}`
        }
        if (isCT) {
            headerObj["Content-Type"] = "application/json"
        }
        if (noToken) {
            delete headerObj["Authorization"]
        }
        return headerObj;
    }
    setBody(body) {
        return JSON.stringify(body);
    }
    reg(body) {
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: this.setHeaders(true, true),
            body: this.setBody(body)
        })
            .then(res => res.json())
    }
    auth(body) {
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: this.setHeaders(true, true),
            body: this.setBody(body)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    getProfile() {
        return fetch(`${this.path}/products/users/me`, {
            headers: this.setHeaders()
        })
            .then(res => res.json())
    }
    updProfile(body, updImg = false) {
        return fetch(`${this.path}/users/me/${updImg ? "avatar" : ""}`, {
            method: "PATCH",
            headers: this.setHeaders(true),
            body: this.setBody(body)
        })
            .then(res => res.json())
    }
}

export default Api;