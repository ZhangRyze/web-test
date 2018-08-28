import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const handleDict = (data) => {
    if (data._id) {
        return axios.post({
            url: 'dict/update',
            data
        })
    } else {
        return axios.post({
            url: 'dict/add',
            data
        })
    }
}
export const getDictList = ({ code, name, codeName, pageNo, pageSize }) => {
    const data = {
        code,
        name,
        codeName,
        pageNo,
        pageSize
    }
    return axios.post({
        url: 'dict/list',
        data
    })
}

export const getDictInfo = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'dict/info',
        data
    })
}

export const deleteDict = ({ id }) => {
    const data = { id }
    return axios.post({
        url: 'dict/del',
        data
    })
}

export const dictList = ({ code }) => {
    const data = { code }
    return axios.post({
        url: 'dict/dictByCode',
        data
    })
}




