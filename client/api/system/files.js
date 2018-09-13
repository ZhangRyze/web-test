import HttpRequest from "@/util/axios";
const axios = new HttpRequest()

export const getPath = () => {
    return axios.post({
        url: 'files/pathList',
    })
}

export const getFiles = ({ name }) => {
    const data = { name }
    return axios.post({
        url: 'files/fileList',
        data
    })
}

export const createPath = ({name}) => {
    const data = {
        name
    }
    return axios.post({
        url: 'files/create',
        data
    })
}





