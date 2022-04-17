import axios from 'axios';
import axiosInstance from './axiosSpark';

export function getSparkAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/authurl';
        axios.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSparkAuthToken(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/authToken';
        axios.post(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSparkLogoutUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/logouturl';
        axios.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSparkRefreshToken(body){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/refreshToken';
        axios.post(url, body).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            console.log(err);
            if (err.response && err.response.data){
                reject(err.reponse.data);
            } else {
                reject(err);
            }
        });
    });
}

export function getCCAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/authurl';
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCCAuthToken(code, redirect_uri){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/authToken' +
            '?code='+ code +
            '&redirect_uri=' + redirect_uri;
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function ccRefreshToken(refreshToken){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'cc/refreshToken' +
            '?refresh_token=' + refreshToken;
        axiosInstance.get(url).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            reject(err);
        });
    });
}
 
const auth = {
    getSparkAuthUrl,
    getSparkAuthToken,
    getSparkLogoutUrl,
    getSparkRefreshToken,
    getCCAuthUrl,
    getCCAuthToken,
    ccRefreshToken
};
export default auth;


