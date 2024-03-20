import axios from "../axios";
const getAllFilms = () => {
    return axios.get(`/api/get-all-films`)
}
const createNewFilmService = (data) => {
    return axios.post('/api/create-new-film', data)
}
const deleteFilmService = (FilmId) => {
    return axios.delete('/api/delete-film', { data: { id: FilmId } })
}
const editFilmService = (inputData) => {
    return axios.put('/api/edit-film', inputData);
}
const getAllCodeService = (inputdata) => {
    return axios.get(`/api/allcode?type=${inputdata}`);
}
const getTopFilms = (limit) => {
    return axios.get(`/api/get-top-films?limit=${limit}`)
}
const getMoviesNowComing = (inputdata) => {
    return axios.get(`/api/get-now-coming-movies?showId=${inputdata}`);
}

//INFOR FILM
const saveInforFilmService = (data) => {
    return axios.post('/api/save-infor-film', data)
}
const getInforFilm = (inputId) => {
    return axios.get(`/api/get-infor-film-by-id?id=${inputId}`)
}
//MARKDOWN FILM
const getMarkdownFilm = (filmId) => {
    return axios.get(`/api/get-markdown-infor-film?filmId=${filmId}`)
}
//BANNER FILM
const getBannerFilm = (filmId) => {
    return axios.get(`/api/get-banner?filmId=${filmId}`)
}
const saveBannerFilmService = (data) => {
    return axios.post('/api/save-banner', data)
}
const getAllBannerFilms = (limit) => {
    return axios.get(`/api/get-all-banners?limit=${limit}`)
}
//NEWS
const getAllNews = () => {
    return axios.get(`/api/get-all-news`)
}
const getInforNews = (inputId) => {
    return axios.get(`/api/get-infor-news-by-id?id=${inputId}`)
}
const createNews = (data) => {
    return axios.post('/api/create-news', data)
}
const deleteNews = (NewsId) => {
    return axios.delete('/api/delete-news', { data: { id: NewsId } })
}
const editNews = (inputData) => {
    return axios.put('/api/edit-news', inputData);
}
const getTopNews = (limit) => {
    return axios.get(`/api/get-top-news?limit=${limit}`)

}
//CONTACT US
const getAllContact = () => {
    return axios.get(`/api/get-contact-us`)
}
const createContactUs = (data) => {
    return axios.post('/api/create-contact-us', data)
}
//BOOKING TIME
const saveBulkBookingTime = (data) => {
    return axios.post('/api/bulk-create-time-booking', data)
}
const getBookingTimeByDate = (filmId, date, cinemaTech) => {
    return axios.get(`/api/get-booking-time-by-date?filmId=${filmId}&date=${date}&cinemaTech=${cinemaTech}`)
}
const getBookingTimeBySeat = (filmId, date, cinemaTech, timeType) => {
    return axios.get(`/api/get-booking-time-by-seat?filmId=${filmId}&date=${date}&cinemaTech=${cinemaTech}&timeType=${timeType}`)
}
const getBookingTimeByPrice = (filmId, date, cinemaTech, timeType, seat) => {
    return axios.get(`/api/get-booking-time-by-price?filmId=${filmId}&date=${date}&cinemaTech=${cinemaTech}&timeType=${timeType}&seat=${seat}`)
}
//CINEMA TECH
const getAllCinemaTechs = () => {
    return axios.get(`/api/get-all-cinema-tech`)
}
const createCinemaTech = (data) => {
    return axios.post('/api/create-cinema-tech', data)
}
const deleteCinemaTech = (CinemaTechId) => {
    return axios.delete('/api/delete-cinema-tech', { data: { id: CinemaTechId } })
}
const editCinemaTech = (inputData) => {
    return axios.put('/api/edit-cinema-tech', inputData);
}
//BUY COMBO
const getAllBuyCombos = () => {
    return axios.get(`/api/get-buy-combo`)
}
const createBuyCombo = (data) => {
    return axios.post('/api/creat-buy-combo', data)
}
const deleteBuyCombo = (BuyComboId) => {
    return axios.delete('/api/delete-buy-combo', { data: { id: BuyComboId } })
}
const editBuyCombo = (inputData) => {
    return axios.put('/api/edit-buy-combo', inputData);
}
const getBuyComboById = (inputId) => {
    return axios.get(`/api/get-buy-combo-by-id?id=${inputId}`)
}
//PAYMENT_TYPES
const getAllPaymentTypes = () => {
    return axios.get(`/api/get-all-payment-types`)
}
const createPaymentType = (data) => {
    return axios.post('/api/creat-payment-types', data)
}
//PRICE
const getAllPrice = () => {
    return axios.get(`/api/get-all-price`)
}
//BOOKING 
const createBooking = (data) => {
    return axios.post('/api/create-booking', data)

}
const getBookingFilmBySeat = (filmId, date, cinemaTech, timeType) => {
    return axios.get(`/api/get-booking-film-seat?filmId=${filmId}&date=${date}&cinemaTech=${cinemaTech}&timeType=${timeType}`)
}
const getBookingFilmToBill = (filmId, date, cinemaTech, timeType, seat1) => {
    return axios.get(`/api/get-booking-to-bill?filmId=${filmId}&date=${date}&cinemaTech=${cinemaTech}&timeType=${timeType}&seat1=${seat1}`)
}
const getBookingByEmail = (email) => {
    return axios.get(`/api/get-booking-by-email?email=${email}`)
}
const getBookingAll = () => {
    return axios.get(`/api/get-booking-all`)
}
export {
    //film
    getAllFilms, createNewFilmService, deleteFilmService, editFilmService, getMoviesNowComing,
    //all code
    getAllCodeService,
    //infor film
    getTopFilms, saveInforFilmService, getInforFilm, getMarkdownFilm,
    //banner film
    getBannerFilm, saveBannerFilmService, getAllBannerFilms,
    //news
    getAllNews, createNews, deleteNews, editNews, getTopNews, getInforNews,
    //contact us
    createContactUs, getAllContact,
    //booking time
    saveBulkBookingTime, getBookingTimeByDate,
    //cinema tech
    getAllCinemaTechs, createCinemaTech, deleteCinemaTech, editCinemaTech,
    //buy combo
    getAllBuyCombos, createBuyCombo, deleteBuyCombo, editBuyCombo, getBuyComboById,
    //payment-types
    getAllPaymentTypes, createPaymentType, getBookingTimeBySeat, getBookingTimeByPrice,
    //price
    getAllPrice,
    //booking
    createBooking, getBookingFilmBySeat, getBookingByEmail, getBookingFilmToBill, getBookingAll

}
