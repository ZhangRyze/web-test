import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const addUser = (data) => {
    console.log(data);
    return axios.post({
        url: 'user/add',
        data
    })
}

export const getUserList = ({ userName, pageNo, pageSize }) => {
    const data = {
        userName,
        pageNo,
        pageSize
    }
    return axios.post({
        url: 'user/list',
        data
    })
}

export const getUserInfo = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'user/info',
        data
    })
}

