import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const checkEmail = (email) => {
    return axios.get(`/api/check-email?email=${email}`);
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const registerService = (data) => {
    return axios.post('/api/register', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const editMyUserService = (inputData) => {
    return axios.put('/api/edit-my-user', inputData);
}
const getAllCodeService = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`);
}
const getMyUserByEmail = (inputEmail) => {
    return axios.get(`/api/get-my-users-by-email?email=${inputEmail}`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    editMyUserService,
    getMyUserByEmail,
    registerService,
    checkEmail
}
