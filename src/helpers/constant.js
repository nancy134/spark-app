import memoryStorageService from '../services/memoryStorage';
import constantService from '../services/constant';
import authService from '../services/auth';

let windowObjectReference = null;
let previousUrl = null;

function updateAccessToken(that, accessToken, refreshToken){
    console.log("saving accesstoken and refreshtoken...");
    memoryStorageService.setCCAccessToken(accessToken);
    memoryStorageService.setCCRefreshToken(refreshToken);

    that.setState({
        loggedIn: true
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
                result.authUrl +
                redirect_uri;
            that.setState({
                authUrl: url,
                redirect_uri: redirect_uri
            });

            var ret = {
                authUrl: url,
                access_token: result.access_token,
                refresh_token: result.refresh_token
            };
            resolve(ret);
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
           createAuthUrl(that).then(function(result){
               console.log("result:");
               console.log(result);
               if (result.access_token){
                   updateAccessToken(that, result.access_token, result.refresh_token); 
               }
               // If accesstoken, use that;
               resolve(result);
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
                    updateAccessToken(that, result.access_token, result.refresh_token);
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

function getAccount(that){
    return new Promise(function(resolve, reject){
        constantService.getAccount().then(function(account){
            console.log("account:");
            console.log(account);
            var name = account.first_name + " " + account.last_name;
            var organization = account.organization_name;
            
            that.setState({
                name: name,
                organization: organization,
                ccAccountId: account.encoded_account_id
            });

            resolve(account);
        }).catch(function(err){
            reject(err);
        });
    });
}

function checkAuth(that){
    return new Promise(function(resolve, reject){
        authService.getCCAuthUrl().then(function(result){
            if (result.access_token){
                console.log("Saving CC access_token and refresh_token");
                memoryStorageService.setCCAccessToken(result.access_token);
                memoryStorageService.setCCRefreshToken(result.refresh_token);
                getAccount(that).then(function(account){
                    resolve(result);
                }).catch(function(err){
                    reject(err);
                });
            } else {
                var ret = {
                    access_token: null
                }
                reject(ret);
            }
        }).catch(function(err){
            reject(err);
        });
    });

}

function openSignInWindow(that, url, name){
    // remove any existing event listeners
    window.removeEventListener('message', that.receiveMessage);

    // window features
    const strWindowFeatures =
    'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
        /* if the pointer to the window object in memory does not exist
         or if such pointer exists but the window was closed */
        windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
        /* if the resource to load is different,
        then we load it in the already opened secondary window and then
        we bring such window back on top/in front of its parent window. */
        windowObjectReference = window.open(url, name, strWindowFeatures);
        windowObjectReference.focus();
    } else {
        /* else the window reference must exist and the window
        is not closed; therefore, we can bring it back on top of any other
        window with the focus() method. There would be no need to re-create
        the window or to reload the referenced resource. */
        windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', that.receiveMessage, false);
    // assign the previous URL
    previousUrl = url;

}

function receiveLoginMessage(that, event, redirect_uri){
    console.log(event);
    var code = null;
    if (event.data){
        code = event.data.substring(6);
    }

    if (code){
        console.log("code: "+code);
        window.removeEventListener('message', that.receiveMessage);
        that.setState({
            authorizationCode: event.data.substring(6)
        });

        getAuthToken(that, code, redirect_uri).then(function(result){
            console.log(result);
         
            getAccount(that).then(function(account){
                console.log(account);
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }
}

const constant = {
    getAuthUrl,
    getAuthToken,
    checkAuth,
    openSignInWindow,
    receiveLoginMessage
};
export default constant;
