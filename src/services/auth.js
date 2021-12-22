import axios from 'axios';

export function getSparkAuthUrl(){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 'spark/authurl';
        console.log("url: "+url);
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
        console.log(url);
        console.log(body);
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
        console.log(url);
        console.log(body);
        axios.post(url, body).then(function(response){
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
    getSparkRefreshToken
};
export default auth;


