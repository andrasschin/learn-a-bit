export const API_ROUTES = {
    AUTH: {
        LOGIN: "LOGIN",
        REGISTER: "REGISTER"
    },
    CHANNELS: {
        GET: "CHANNELS_GET",
        POST: "CHANNELS_POST",
        DELETE: "CHANNELS_DELETE"
    },
    SUMMARIES: {
        GET: "SUMMARIES_GET"
    },
    USER_SUMMARIES: {
        GET: "USER_SUMMARIES_GET",
        POST: "USER_SUMMARIES_POST",
        DELETE: "USER_SUMMARIES_DELETE"
    },
    UPDOOTED_SUMMARIES: {
        GET: "UPDOOTED_SUMMARIES_GET",
        POST: "UPDOOTED_SUMMARIES_POST",
        DELETE: "UPDOOTED_SUMMARIES_DELETE"
    }
}

const BASE_ROUTES = {
    AUTH: "/api/auth",
    USERS: "/api/users",
    SUMMARIES: "/api/summaries"
}

export function getApiRoute(route, userId=null, documentId=null) {
    switch (route) {
        case API_ROUTES.AUTH.LOGIN:
            return `${BASE_ROUTES.AUTH}/signin`;

        case API_ROUTES.AUTH.REGISTER:
            return `${BASE_ROUTES.AUTH}/signup`;

        case API_ROUTES.CHANNELS.GET:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }
            
            return `${BASE_ROUTES.USERS}/${userId}/sources/youtube-channels`;

        case API_ROUTES.CHANNELS.POST:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/sources/youtube-channels`;

        case API_ROUTES.CHANNELS.DELETE:
            if (checkIfArgsHaveNull(userId, documentId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/sources/youtube-channels/${documentId}`;

        case API_ROUTES.SUMMARIES.GET:
            return BASE_ROUTES.SUMMARIES;

        case API_ROUTES.UPDOOTED_SUMMARIES.GET:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/updooted-summaries`;

        case API_ROUTES.UPDOOTED_SUMMARIES.POST:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/updooted-summaries`;
        
        case API_ROUTES.UPDOOTED_SUMMARIES.DELETE:
            if (checkIfArgsHaveNull(userId, documentId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/updooted-summaries/${documentId}`;

        case API_ROUTES.USER_SUMMARIES.GET:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/summaries`;

        case API_ROUTES.USER_SUMMARIES.POST:
            if (checkIfArgsHaveNull(userId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/summaries`;

        case API_ROUTES.USER_SUMMARIES.DELETE:
            if (checkIfArgsHaveNull(userId, documentId)) {
                throw new Error("Neccessary argument was not provided.");
            }

            return `${BASE_ROUTES.USERS}/${userId}/summaries/${documentId}`;
    
        default:
            throw new Error("API route does not exist.")
    }
}

function checkIfArgsHaveNull() {
    return [...arguments].some(arg => arg === null);
}