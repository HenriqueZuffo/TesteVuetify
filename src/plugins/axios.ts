import axios from 'axios'
import type {App} from 'vue'

export const HTTP = axios.create({
    baseURL: `http://localhost:3000/`,

})