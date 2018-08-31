import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const handleRole = (data) => {
    if (data._id) {
        return axios.post({
            url: 'role/update',
            data
        })
    } else {
        return axios.post({
            url: 'role/add',
            data
        })
    }
}

export const getRoleList = ({ code, name, pageNo, pageSize }) => {
    const data = {
        code,
        name,
        pageNo,
        pageSize
    }
    return axios.post({
        url: 'role/list',
        data
    })
}

export const getAuthList = () => {
    return axios.post({
        url: 'auth/list'
    })
}

export const getRoleInfo = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'role/info',
        data
    })
}

export const deleteRole = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'role/del',
        data
    })
}




