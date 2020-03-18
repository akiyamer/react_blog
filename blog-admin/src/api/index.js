import axios from 'axios'
import { message } from 'antd'

axios.defaults.timeout = 5000
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
    config => {
        config.headers = {
            
        }
        return config
    },
    error => {
        message.error('请求出错了，请稍后重试')
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    res => {
        return res
    },
    error => {
        message.error('请求出错了，请稍后重试')
        return Promise.reject(error)
    }
)

export default {
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {params})
                    .then(res => {
                        resolve(res.data)
                    })
        })
    },
    post(url, data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                    .then(res => {
                        resolve(res.data)
                    })
        })
    },
    download(url, target = false, fileName='') {
        try {
            const downloadEl = document.createElement('a')
            downloadEl.href = url
            if (target) downloadEl.target = '_blank'
            if (fileName) downloadEl.download = fileName
            document.body.appendChild(downloadEl)
            downloadEl.click()
            document.body.removeChild(downloadEl)
        } catch (error) {
            window.open(url)
        }
    }
}