import axios from 'axios'

const instance = axios.create({
    baseURL:'https://desafio-engeselt.firebaseio.com/'
})

export default instance