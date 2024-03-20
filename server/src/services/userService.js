import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })

}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName', 'phonenumber', 'gender', 'image', 'address'],
                    where: { email: email },
                    include: [
                        { model: db.Allcode, as: 'genderDataUser', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'roleDataUser', attributes: ['valueEn', 'valueVi'] }
                    ],
                    nest: true,
                    raw: true,
                });
                if (user && user.image) {
                    user.image = new Buffer.from(user.image, 'base64').toString('binary');
                }
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User is not found!';
                    resolve(userData)
                }
            }
            else {
                //return error
                userData.errCode = 1;
                userData.errMessage = 'Your is Email is not existin your system. Please try other email';
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}
let getMyUsers = (imputEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!imputEmail) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let users = await db.User.findOne({
                    where: { email: imputEmail },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: false,
                    nest: true
                })
                if (users && users.image) {
                    users.image = new Buffer.from(users.image, 'base64').toString('binary');
                }
                if (!users) users = {};
                resolve({
                    errCode: 0,
                    dataMyUser: users
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is alreadyin used, Plz try another email!'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist`
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: `The user is deleted`
        })

    })
}
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar;
                }

                await user.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `User not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateMyUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let myUser = await db.User.findOne({
                where: { email: data.email },
                raw: false,
            })
            if (myUser) {
                myUser.firstName = data.firstName;
                myUser.lastName = data.lastName;
                myUser.address = data.address;
                myUser.roleId = data.roleId;
                myUser.gender = data.gender;
                myUser.phonenumber = data.phonenumber;
                if (data.image) {
                    myUser.image = data.image;
                }
                await myUser.save();

                resolve({
                    errCode: 0,
                    errMessage: 'Update the user succeeds'
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `User not found!`
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    })
}
let createRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is alreadyin used, Plz try another email!'
                })
            }
            else if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed email !'
                })
            }
            else if (!data.password) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed password !'
                })
            }
            else if (!data.lastName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed last name !'
                })
            }
            else if (!data.firstName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed first name !'
                })
            }
            else if (!data.phonenumber) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed phone number !'
                })
            }
            else if (!data.gender) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed gender !'
                })
            }
            else if (!data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Failed address !'
                })
            }

            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Create a new user succeed !'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    getMyUsers: getMyUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    updateMyUser: updateMyUser,
    getAllCodeService: getAllCodeService,
    createRegister: createRegister,
    checkUserEmail: checkUserEmail

}