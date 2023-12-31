const lsTokenKey = 'my_app_token';

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('auth');
    if(isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    return res;
};

function getClearResponse(res) {
    return res.data;
};

function setToken(req) {
    const isAuthUrl = req.url.includes('auth');
    if(!isAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-acces-token'] = token;

        
    }
    return req;
};

function onError(err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function(axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getClearResponse);
};