import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGenre: false,
    genre: [],
    topFilms: [],
    allFilms: [],
    allBanner: [],
    show: [],
    allNew: [],
    topNew: [],
    allContact: [],
    allTime: [],
    allCinemaTechs: [],
    allSeat: [],
    allPrice: [],
    allBuyCombo: [],
    allPaymentType: [],
    allSeatType: [],
    allMoviesNow: [],
    allMoviesComing: []
}

const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENRE_START:
            let copyState = { ...state };
            copyState.isLoadingGenre = true;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENRE_SUCCESS:
            state.isLoadingGenre = false;
            state.genre = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENRE_FAIL:
            state.isLoadingGenre = false;
            state.genre = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_SHOW_SUCCESS:
            state.show = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_SHOW_FAIL:
            state.show = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_FILMS_SUCCESS:
            state.allFilms = action.dataAllFilms;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_FILMS_FAIL:
            state.allFilms = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_FILMS_SUCCESS:
            state.topFilms = action.dataFilms;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_FILMS_FAIL:
            state.topFilms = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_NOW_SHOWING_FILMS_SUCCESS:
            state.allMoviesNow = action.dataMoviesNow;
            return {
                ...state,
            }
        case actionTypes.FETCH_NOW_SHOWING_FILMS_FAIL:
            state.allMoviesNow = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_COMING_SOON_SUCCESS:
            state.allMoviesComing = action.dataMoviesComing;
            return {
                ...state,
            }
        case actionTypes.FETCH_COMING_SOON_FAIL:
            state.allMoviesComing = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_FILMS_SUCCESS:
            state.allBanner = action.dataBanner;
            return {
                ...state,
            }
        case actionTypes.FETCH_BANNER_FILMS_FAIL:
            state.allBanner = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_NEWS_SUCCESS:
            state.allNew = action.dataAllNews;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_NEWS_FAIL:
            state.allNew = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_NEWS_SUCCESS:
            state.topNew = action.dataTopNews;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_NEWS_FAIL:
            state.topNew = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CONTACT_US_SUCCESS:
            state.allContact = action.dataAllContact;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CONTACT_US_FAIL:
            state.allContact = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_BOOKING_TIME_SUCCESS:
            state.allTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_BOOKING_TIME_FAIL:
            state.allTime = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CINEMA_TECHS_SUCCESS:
            state.allCinemaTechs = action.dataAllCinemaTech;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_CINEMA_TECHS_FAIL:
            state.allCinemaTechs = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_SEAT_SUCCESS:
            state.allSeat = action.dataSeat;
            return {
                ...state,
            }
        case actionTypes.FETCH_SEAT_FAIL:
            state.allSeat = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.allPrice = action.dataPrice;
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_FAIL:
            state.allPrice = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_BUY_COMBOS_SUCCESS:
            state.allBuyCombo = action.dataAllBuyCombo;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_BUY_COMBOS_FAIL:
            state.allBuyCombo = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_TYPE_SUCCESS:
            state.allPaymentType = action.dataPaymentType;
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_TYPE_FAIL:
            state.allPaymentType = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_SEAT_TYPE_SUCCESS:
            state.allSeatType = action.dataSeatType;
            return {
                ...state,
            }
        case actionTypes.FETCH_SEAT_TYPE_FAIL:
            state.allSeatType = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default filmReducer;