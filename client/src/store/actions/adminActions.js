import actionTypes from './actionTypes';
import { getAllCodeService, registerService, createNewUserService, getAllUsers, deleteUserService, editUserService, getMyUserByEmail, editMyUserService } from '../../services/userService'
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
//GENDER
export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})
//ROLE
export const fetchRoleStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);

            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create a new user succeed !")
                dispatch(saveUserSuccess());
                dispatch(fectchAllUsersStart());

            }
            else {
                toast.error("Create a new user error !")
                dispatch(saveUserFail());
            }
        } catch (e) {
            toast.error("Create a new user error !")
            dispatch(saveUserFail());
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCESS
})
export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})
export const fectchAllUsersStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                toast.error("Fetch all users error !")
                dispatch(fetchAllUsersFail());
            }
        } catch (e) {
            toast.error("Fetch all users error !")

            dispatch(fetchAllUsersFail());
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL,

})
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("   🦄 Delete the user succeed !")
                dispatch(deleteUserSuccess());
                dispatch(fectchAllUsersStart());

            }
            else {
                toast.error("Delete the user error !")
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error("Delete the user error !")
            dispatch(deleteUserFail());
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,

})
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("   🦄 Update the user succeed !")
                dispatch(editUserSuccess());
                dispatch(fectchAllUsersStart());
            }
            else {
                toast.error("Update the user error !")
                dispatch(editUserFail());
            }
        } catch (e) {
            toast.error("Update the user error !")
            dispatch(editUserFail());
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCESS,
})
export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,

})
export const editMyUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editMyUserService(data);
            if (res && res.errCode === 0) {
                toast.success("  🦄 Update my user succeed !")
                dispatch({
                    type: actionTypes.EDIT_MY_USER_SUCESS,
                });
            }
            else {
                toast.error("Update my user error !")
                dispatch({
                    type: actionTypes.EDIT_MY_USER_FAIL,
                });
            }
        } catch (e) {
            console.log(e)
            toast.error("Update my user error !")
            dispatch({
                type: actionTypes.EDIT_MY_USER_FAIL,
            });
        }
    }
}
export const registerAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await registerService(data);
            if (res && res.errCode === 0) {
                toast.success("  🦄 Create a user succeed !")
                dispatch({
                    type: actionTypes.REGISTER_SUCCESS,
                });
            }
            else {
                toast.error("Create a user error !")
                dispatch({
                    type: actionTypes.REGISTER_FAIL,
                });
            }
        } catch (e) {
            console.log(e)
            toast.error("Create a user error !")
            dispatch({
                type: actionTypes.REGISTER_FAIL,
            });
        }
    }
}

