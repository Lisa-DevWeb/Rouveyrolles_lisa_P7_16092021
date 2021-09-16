import axios from 'axios'
import store from '../store'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/posts',
  headers: { Authorization: `Bearer ${this.$store.state.usersInfos.token}`}
})

export default axiosInstance;