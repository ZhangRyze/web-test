import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const handleAuth = (data) => {
    if (data._id) {
        return axios.post({
            url: 'auth/update',
            data
        })
    } else {
        return axios.post({
            url: 'auth/add',
            data
        })
    }
}
export const getAuthList = () => {
    return axios.post({
        url: 'auth/list'
    })
}

export const getAuthInfo = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'auth/info',
        data
    })
}

export const deleteAuth = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'auth/del',
        data
    })
}





