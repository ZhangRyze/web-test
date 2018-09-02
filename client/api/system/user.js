import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const handleUser = (data) => {
    if(data._id){
        return axios.post({
            url: 'user/update',
            data
        })
    }else{
        return axios.post({
            url: 'user/add',
            data
        })
    }
}

export const getUserList = ({ userName, userType, pageNo, pageSize }) => {
    const data = {
        userName,
        userType,
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

export const deleteUser = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'user/del',
        data
    })
}

export const updateUser = ({ id, state}) => {
    const data = { id, state }
    return axios.post({
        url: 'user/updateUser',
        data
    })
}

