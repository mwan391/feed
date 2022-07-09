import axios from 'axios'
import { apiBaseUrl } from "../constants";


let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(`${apiBaseUrl}/persons`)
	return request.then(response => response.data)
}

const create = async newObject => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(`${apiBaseUrl}/persons`, newObject, config)
	return response.data

}

const update = (id, newObject) => {
	const request = axios.put(`${apiBaseUrl}/persons/${id}`, newObject)
	return request.then(response => response.data)
}

const deleteOne = (id) => {
	const request = axios.delete(`${apiBaseUrl}/persons/${id}`)
	return request
}



export default { getAll, create, update, deleteOne, setToken }