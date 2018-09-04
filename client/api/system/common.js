import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const getUserAuths = () => {
    return axios.post({
        url: 'common/auths'
    })
}

export const login = ({ loginName, password }) => {
    let data = {
        loginName,
        password
    }
    return axios.post({
        url: 'common/login',
        data
    })
}


