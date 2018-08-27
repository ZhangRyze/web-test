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
export const getDictList = ({ code, name, pageNo, pageSize }) => {
    const data = {
        code,
        name,
        pageNo,
        pageSize
    }
    return axios.post({
        url: 'dict/list',
        data
    })
}



