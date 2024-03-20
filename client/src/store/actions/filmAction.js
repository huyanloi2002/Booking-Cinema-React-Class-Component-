import actionTypes from './actionTypes';
import {
    //film
    getAllFilms, createNewFilmService, deleteFilmService, editFilmService, getMoviesNowComing,
    //all code
    getAllCodeService,
    //infor film
    getTopFilms, saveInforFilmService, getInforFilm, getMarkdownFilm,
    //banner film
    getBannerFilm, saveBannerFilmService, getAllBannerFilms,
    //news
    getAllNews, createNews, deleteNews, editNews, getTopNews,
    //contact us
    createContactUs, getAllContact,
    //booking time
    saveBulkBookingTime, getBookingTimeByDate,
    //cinema tech
    getAllCinemaTechs, createCinemaTech, deleteCinemaTech, editCinemaTech,
    //buy combo
    getAllBuyCombos, createBuyCombo, deleteBuyCombo, editBuyCombo,
    //payment-type
    getAllPaymentTypes, createPaymentType,
    //price
    getAllPrice,
    //booking
    createBooking
} from '../../services/filmService'
import { toast } from 'react-toastify';
//film
export const fetchGenreStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENRE_START
            })
            let res = await getAllCodeService("GENRE");
            if (res && res.errCode === 0) {
                dispatch(fetchGenreSuccess(res.data));
            }
            else {
                dispatch(fetchGenreFail());
            }
        } catch (e) {
            dispatch(fetchGenreFail());
        }
    }
}
export const fetchGenreSuccess = (genreData) => ({
    type: actionTypes.FETCH_GENRE_SUCCESS,
    data: genreData
})
export const fetchGenreFail = () => ({
    type: actionTypes.FETCH_GENRE_FAIL
})
export const fetchShowStart = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("SHOW");
            if (res && res.errCode === 0) {
                dispatch(fetchShowSuccess(res.data));
            }
            else {
                dispatch(fetchShowFail());
            }
        } catch (e) {
            dispatch(fetchShowFail());
        }
    }
}
export const fetchShowSuccess = (showData) => ({
    type: actionTypes.FETCH_SHOW_SUCCESS,
    data: showData
})
export const fetchShowFail = () => ({
    type: actionTypes.FETCH_SHOW_FAIL
})
export const createNewFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewFilmService(data);

            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create a new film succeed !")
                dispatch(saveFilmSuccess());
                dispatch(fetchAllFilms());

            }
            else {
                toast.error("Create a new film error !")
                dispatch(saveFilmFail());
            }
        } catch (e) {
            toast.error("Create a new film error !")
            dispatch(saveFilmFail());
        }
    }
}
export const saveFilmSuccess = () => ({
    type: actionTypes.CREATE_FILM_SUCESS
})
export const saveFilmFail = () => ({
    type: actionTypes.CREATE_FILM_FAIL
})
export const fetchAllFilms = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllFilms();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_FILMS_SUCCESS,
                    dataAllFilms: res.data,

                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_FILMS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_FILMS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_FILMS_FAIL,
            })
        }
    }
}
export const deleteAFilm = (filmId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteFilmService(filmId);
            if (res && res.errCode === 0) {
                toast.success("   🦄 Delete the film succeed !")
                dispatch(deleteFilmSuccess());
                dispatch(fetchAllFilms());

            }
            else {
                toast.error("Delete the film error !")
                dispatch(deleteFilmFail());
            }
        } catch (e) {
            toast.error("Delete the film error !")
            dispatch(deleteFilmFail());
        }
    }
}
export const deleteFilmSuccess = () => ({
    type: actionTypes.DELETE_FILM_SUCCESS,
})
export const deleteFilmFail = () => ({
    type: actionTypes.DELETE_FILM_FAIL,

})
export const editAFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Update the film succeed !")
                dispatch(editFilmSuccess());
                dispatch(fetchAllFilms());
            }
            else {
                toast.error("Update the film error !")
                dispatch(editFilmFail());
            }
        } catch (e) {
            toast.error("Update the film error !")
            dispatch(editFilmFail());
        }
    }
}
export const editFilmSuccess = () => ({
    type: actionTypes.EDIT_FILM_SUCESS,
})
export const editFilmFail = () => ({
    type: actionTypes.EDIT_FILM_FAIL,

})
export const fetchTopFilms = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopFilms('5');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_FILMS_SUCCESS,
                    dataFilms: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_FILMS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_FILMS_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_TOP_FILMS_FAIL,
            })
        }
    }
}
export const fetchMoviesNowShowing = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getMoviesNowComing("W1");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_NOW_SHOWING_FILMS_SUCCESS,
                    dataMoviesNow: res.data,
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_NOW_SHOWING_FILMS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_NOW_SHOWING_FILMS_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_NOW_SHOWING_FILMS_FAIL,
            })
        }
    }
}
export const fetchMoviesComingSoon = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getMoviesNowComing("W2");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_COMING_SOON_SUCCESS,
                    dataMoviesComing: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_COMING_SOON_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_COMING_SOON_FAIL', e)
            dispatch({
                type: actionTypes.FETCH_COMING_SOON_FAIL,
            })
        }
    }
}
//infor film
export const saveInforFilm = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveInforFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save infor film succeed !")
                dispatch({
                    type: actionTypes.SAVE_INFOR_FILM_SUCESS,
                })
            } else {
                toast.error(" 🦄 Save infor film error !")
                dispatch({
                    type: actionTypes.SAVE_INFOR_FILM_FAIL,
                })
            }
        } catch (e) {
            toast.error(" 🦄 Save infor film errorsss !")
            console.log('SAVE_INFOR_FILM_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_INFOR_FILM_FAIL,
            })
        }
    }
}
//banner film
export const saveBannerFilms = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveBannerFilmService(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save banner film succeed !")
                dispatch({
                    type: actionTypes.SAVE_BANNER_FILM_SUCESS,
                })
            } else {
                toast.error(" 🦄 Save banner film error !")
                dispatch({
                    type: actionTypes.SAVE_BANNER_FILM_FAIL,
                })
            }
        } catch (e) {
            toast.error(" 🦄 Save banner film error !")
            console.log('SAVE_BANNER_FILM_FAIL', e)
            dispatch({
                type: actionTypes.SAVE_BANNER_FILM_FAIL,
            })
        }
    }
}
export const fetchBannerFilm = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBannerFilms('5')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_BANNER_FILMS_SUCCESS,
                    dataBanner: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_BANNER_FILMS_FAIL
                })
            }

        } catch (e) {
            console(e)
            dispatch({
                type: actionTypes.FETCH_BANNER_FILMS_FAIL
            })
        }
    }

}
//news
export const fecthTopNews = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopNews('5')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_NEWS_SUCCESS,
                    dataTopNews: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_NEWS_FAIL
                })
            }

        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_NEWS_FAIL
            })
        }
    }
}
export const fetchAllNews = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllNews();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_SUCCESS,
                    dataAllNews: res.data,

                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_NEWS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_NEWS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_NEWS_FAIL,
            })
        }
    }
}
export const createNewsAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNews(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create news succeed !")
                dispatch({
                    type: actionTypes.CREATE_NEWS_SUCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Create news error !")
                dispatch({
                    type: actionTypes.CREATE_NEWS_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create news error !")
            dispatch({
                type: actionTypes.CREATE_NEWS_FAIL
            })
        }
    }
}
export const editNewsAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editNews(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save news succeed !")
                dispatch({
                    type: actionTypes.EDIT_NEWS_SUCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Save news error !")
                dispatch({
                    type: actionTypes.EDIT_NEWS_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Save news error !")
            dispatch({
                type: actionTypes.EDIT_NEWS_FAIL
            })
        }
    }
}
export const deleteNewsAction = (newsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNews(newsId)
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Delete news succeed !")
                dispatch({
                    type: actionTypes.DELETE_NEWS_SUCCESS
                });
                dispatch(fetchAllNews())
            } else {
                toast.error(" 🦄 Delete news error !")
                dispatch({
                    type: actionTypes.DELETE_NEWS_FAIL
                });
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Delete news error !")
            dispatch({
                type: actionTypes.DELETE_NEWS_FAIL
            });
        }
    }
}
//contact us
export const fetchAllContact = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllContact();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CONTACT_US_SUCCESS,
                    dataAllContact: res.data
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CONTACT_US_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_CONTACT_US_FAIL
            })
        }
    }
}
export const createContactUsAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createContactUs(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Send message succeed !")
                dispatch({
                    type: actionTypes.CREATE_CONTACT_US_SUCCESS
                });
                dispatch(fetchAllContact())
            } else {
                toast.error(" 🦄 Send message error !")
                dispatch({
                    type: actionTypes.CREATE_CONTACT_US_FAIL
                });
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Send message error !")
            dispatch({
                type: actionTypes.CREATE_CONTACT_US_FAIL
            });
        }
    }

}
//booking time
export const fetchAllBookingTime = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_BOOKING_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_BOOKING_TIME_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_BOOKING_TIME_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_BOOKING_TIME_FAIL,
            })
        }
    }
}

//cinema tech
export const fetchAllCinemaTech = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllCinemaTechs();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_CINEMA_TECHS_SUCCESS,
                    dataAllCinemaTech: res.data,
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CINEMA_TECHS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_CINEMA_TECHS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_CINEMA_TECHS_FAIL,
            })
        }
    }
}
export const createCinemaTechAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createCinemaTech(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create cinema technology succeed !")
                dispatch({
                    type: actionTypes.CREATE_CINEMA_TECH_SUCESS
                });
                dispatch(fetchAllCinemaTech())
            } else {
                toast.error(" 🦄 Create cinema technology error !")
                dispatch({
                    type: actionTypes.CREATE_CINEMA_TECH_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create cinema technology error !")
            dispatch({
                type: actionTypes.CREATE_CINEMA_TECH_FAIL
            })
        }
    }
}
export const editCinemaTechAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCinemaTech(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save cinema technology succeed !")
                dispatch({
                    type: actionTypes.EDIT_CINEMA_TECH_SUCESS
                });
                dispatch(fetchAllCinemaTech())
            } else {
                toast.error(" 🦄 Save cinema technology error !")
                dispatch({
                    type: actionTypes.EDIT_CINEMA_TECH_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Save cinema technology error !")
            dispatch({
                type: actionTypes.EDIT_CINEMA_TECH_FAIL
            })
        }
    }
}
export const deleteCinemaTechAction = (cinemaTechId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCinemaTech(cinemaTechId)
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Delete cinema technology succeed !")
                dispatch({
                    type: actionTypes.DELETE_CINEMA_TECH_SUCCESS
                });
                dispatch(fetchAllCinemaTech())
            } else {
                toast.error(" 🦄 Delete cinema technology error !")
                dispatch({
                    type: actionTypes.DELETE_CINEMA_TECH_FAIL
                });
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Delete cinema technology error !")
            dispatch({
                type: actionTypes.DELETE_CINEMA_TECH_FAIL
            });
        }
    }
}
//seat 
export const fetchAllSeat = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('SEAT')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SEAT_SUCCESS,
                    dataSeat: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_SEAT_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_SEAT_FAIL
            })
        }
    }
}
//price
export const fetchAllPrice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPrice()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PRICE_SUCCESS,
                    dataPrice: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_PRICE_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_PRICE_FAIL
            })
        }
    }
}
// seat type
export const fetchAllSeatType = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('SEAT TYPE')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SEAT_TYPE_SUCCESS,
                    dataSeatType: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_SEAT_TYPE_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_SEAT_TYPE_FAIL
            })
        }
    }
}
//payment-type
export const fetchAllPaymentType = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllPaymentTypes()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PAYMENT_TYPE_SUCCESS,
                    dataPaymentType: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_PAYMENT_TYPE_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_PAYMENT_TYPE_FAIL
            })
        }
    }
}
export const createPaymentTypeAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createPaymentType(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create payment type succeed !")
                dispatch({
                    type: actionTypes.CREATE_PAYMENT_TYPE_SUCESS
                });
            } else {
                toast.error(" 🦄 Create payment type error !")
                dispatch({
                    type: actionTypes.CREATE_PAYMENT_TYPE_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create payment type error !")
            dispatch({
                type: actionTypes.CREATE_PAYMENT_TYPE_FAIL
            })
        }
    }
}
//buy combo
export const fetchAllBuyCombo = () => {

    return async (dispatch, getState) => {
        try {
            let res = await getAllBuyCombos();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_BUY_COMBOS_SUCCESS,
                    dataAllBuyCombo: res.data,
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_BUY_COMBOS_FAIL,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_BUY_COMBOS_FAIL: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_BUY_COMBOS_FAIL,
            })
        }
    }
}
export const createBuyComboAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createBuyCombo(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create combo succeed !")
                dispatch({
                    type: actionTypes.CREATE_BUY_COMBO_SUCESS
                });
                dispatch(fetchAllBuyCombo())
            } else {
                toast.error(" 🦄 Create combo error !")
                dispatch({
                    type: actionTypes.CREATE_BUY_COMBO_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create combo error !")
            dispatch({
                type: actionTypes.CREATE_BUY_COMBO_FAIL
            })
        }
    }
}
export const editBuyComboAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBuyCombo(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Save combo succeed !")
                dispatch({
                    type: actionTypes.EDIT_BUY_COMBO_SUCESS
                });
                dispatch(fetchAllBuyCombo())
            } else {
                toast.error(" 🦄 Save combo error !")
                dispatch({
                    type: actionTypes.EDIT_BUY_COMBO_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Save combo error !")
            dispatch({
                type: actionTypes.EDIT_BUY_COMBO_FAIL
            })
        }
    }
}
export const deleteBuyComboAction = (buyComboId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBuyCombo(buyComboId)
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Delete combo succeed !")
                dispatch({
                    type: actionTypes.DELETE_BUY_COMBO_SUCCESS
                });
                dispatch(fetchAllBuyCombo())
            } else {
                toast.error(" 🦄 Delete combo error !")
                dispatch({
                    type: actionTypes.DELETE_BUY_COMBO_FAIL
                });
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Delete cinema technology error !")
            dispatch({
                type: actionTypes.DELETE_BUY_COMBO_FAIL
            });
        }
    }
}
//booking 
export const createBookingAction = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createBooking(data);
            if (res && res.errCode === 0) {
                toast.success(" 🦄 Create booking succeed !")
                dispatch({
                    type: actionTypes.CREATE_BOOKING_SUCESS
                });
            } else {
                toast.error(" 🦄 Create booking error !")
                dispatch({
                    type: actionTypes.CREATE_BOOKING_FAIL
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(" 🦄 Create booking error !")
            dispatch({
                type: actionTypes.CREATE_BOOKING_FAIL
            })
        }
    }
}
