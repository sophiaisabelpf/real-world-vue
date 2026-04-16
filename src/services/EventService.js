import axios from "axios";

// *** Single Axios instance for entire app
const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/sophiaisabelpf/real-world-vue', // <== *** Base URL for all calls to use
    withCredentials: false,
    headers: { // <== *** For authentication and configuration
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default { 
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page) // <== *** appended to base URL
    },
    getEvent(id) {
        return apiClient.get('/events' + '/' + id) // <== *** appended to base URL
    },
}