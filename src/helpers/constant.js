import memoryStorageService from '../services/memoryStorage';
import constantService from '../services/constant';
import authService from '../services/auth';

function updateAccessToken(that, accessToken, refreshToken){
    console.log("saving accesstoken and refreshtoken...");
    memoryStorageService.setCCAccessToken(accessToken);
    memoryStorageService.setCCRefreshToken(refreshToken);

    that.setState({
        loggedIn: true,
        accessToken: accessToken,
        refreshToken: refreshToken
    });
}

function getAuthToken(that, code, redirect_uri){
    return new Promise(function(resolve, reject){
        console.log("getting auth token...");
        authService.getCCAuthToken(code, redirect_uri).then(function(result){
            console.log(result);
            updateAccessToken(that, result.access_token, result.refresh_token);
            resolve(result);
        }).catch(function(err){
            console.log(err);
            reject(err);
        });
    });
}

function createAuthUrl(that){

    return new Promise(function(resolve, reject){
        authService.getCCAuthUrl().then(function(result){
            console.log(result);

 var hostname = window.location.hostname;
            var protocol = window.location.protocol;
            var port = window.location.port;
            var redirect_uri =
                protocol +
                "//" +
                hostname +
                ":" +
                port +
                "/constantcontact";

            var url =
                result +
                redirect_uri;
            that.setState({
                authUrl: url,
                redirect_uri: redirect_uri
            });

            resolve(url);
        }).catch(function(err){
            reject(err);
        });
    });

}

function getAuthUrl(that){

    return new Promise(function(resolve, reject){
        var accessToken = memoryStorageService.ccAccessToken();
        var refreshToken = memoryStorageService.ccRefreshToken();
        if (!accessToken && !refreshToken){
           createAuthUrl(that).then(function(url){
               resolve(url);
           }).catch(function(err){
               reject(err);
           });
        } else {
            var tokenInfoBody = {
                token: accessToken
            };
            constantService.tokenInfo(tokenInfoBody).then(function(tokenInfo){
                resolve("valid access token available");
                updateAccessToken(that, accessToken, refreshToken);
            }).catch(function(err){
                authService.ccRefreshToken(refreshToken).then(function(result){
                    resolve("generated access token from refresh token");
                    that.updateAccessToken(that, result.access_token, result.refresh_token);
                }).catch(function(err){
                    console.log("getting authUrl...");
                    createAuthUrl(that).then(function(url){
                        console.log("url: "+url);
                        resolve(url);
                    }).catch(function(err){
                        console.log(err);
                        reject(err);
                    });

                });
            });
        }

    });
}

const constant = {
    getAuthUrl,
    getAuthToken
};
export default constant;
