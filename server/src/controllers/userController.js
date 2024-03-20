import { use } from "express/lib/application";
import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs paramater!'
        });
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    });
}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    let users = await userService.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUser(req.body);
    return res.status(200).json(message);
}
let handleEditMyUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateMyUser(req.body);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required paramaters!"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}
let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get all code error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleGetMyUser = async (req, res) => {
    try {
        let data = await userService.getMyUsers(req.query.email);
        return res.status(200).json(data);
    } catch (e) {
        console.log('Get my user error: ', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}
let handleRegister = async (req, res) => {
    try {
        let message = await userService.createRegister(req.body);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server...'
        })
    }
}
let handleCheckEmail = async (req, res) => {
    try {
        let message = await userService.checkUserEmail(req.query.email);
        return res.status(200).json(message);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error from server...'
        })
    }
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCheckEmail: handleCheckEmail,
    handleGetMyUser: handleGetMyUser,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleEditMyUser: handleEditMyUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode,
    handleRegister: handleRegister
}