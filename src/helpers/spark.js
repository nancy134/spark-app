import sparkService from '../services/spark';
import memoryStorageService from '../services/memoryStorage';
import authService from '../services/auth';
import constantHelper from '../helpers/constant';

function initializeApp(that, accessToken, refreshToken){
     that.setState({
         appLoading: true
     });

     // Check for Spark authentication override
     var hardCodedAccessToken = memoryStorageService.accessToken();
     authService.getSparkAuthUrl().then(function(result){

         var access_token = null;
         var refresh_token = null;
         if (result.access_token){
             console.log("got access token from cookie: "+result.access_token);
             access_token = result.access_token;
             refresh_token = result.refresh_token;
         } else if (hardCodedAccessToken){
             console.log("got hardCodedAccessToken: "+hardCodedAccessToken);
             access_token = hardCodedAccessToken;
         }

         if (access_token){
             console.log("saving access_token and refresh_token");
             memoryStorageService.setAccessToken(access_token);
             memoryStorageService.setRefreshToken(refresh_token);

             console.log("getting Spark account information");
             initializeAccount(that).then(function(result){
                 console.log(result);
                 that.setState({
                     appLoading: false,
                     loggedIn: true,
                     user: result.user,
                     account: result.account
                 });
             }).catch(function(err){
                 that.setState({
                     appLoading: false
                 });
                 console.log(err);
             });

         } else {
           console.log("No access token");
           var hostname = window.location.hostname;
           var protocol = window.location.protocol;
           var redirect_uri =
               protocol +
               "//" +
               hostname +
               "/sparkauth";

           var url =
              result.authUrl +
              redirect_uri;
           that.setState({
               authUrl: url,
               redirect_uri: redirect_uri,
               appLoading: false
           });
        }
    }).catch(function(err){
        that.setState({
            appLoading: false
        });
    });

    //Check for Constant Contact login
    console.log("checking Constant Contact login");
    constantHelper.checkAuth(that).then(function(result){
        console.log(result);
        that.setState({
            ccLoggedIn: true,
        });
    }).catch(function(err){
        console.log(err);
    });

}

function initializeAccount(that){
    return new Promise(function(resolve, reject){
        sparkService.getSystem().then(function(system){
            var user = system.D.Results[0];
            var id = user.Id;
            sparkService.getAccount(id).then(function(account){
                var ret = {
                    account: account,
                    user: user
                };
                resolve(ret);
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
            reject(err);
        });
    });
}

function initializeSavedSearches(that){
    getSavedSearches(that).then(function(result){
    }).catch(function(err){
        console.log(err);
    });
}

function logout(that){
    memoryStorageService.sparkClearAll();
    that.setState({
       accessToken: null,
       refresToken: null,
       loggedIn: false
    });
}

function getCollections(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        sparkService.getCollections().then(function(collections){
            if (collections.D.Results.length > 0){
                sparkService.getCollection(collections.D.Results[0].Id).then(function(collection){
                    sparkService.getCollectionListings(collection.D.Results[0].ListingIds).then(function(collectionListings){
                        that.setState({
                            loading: false,
                            sparkCollections: collections,
                            sparkCollection: collection,
                            sparkCollectionListings: collectionListings,
                            sparkSelectedCollection: collections.D.Results[0].Id,
                            sparkAccessToken: accessToken,
                            sparkRefreshToken: refreshToken
                        });
                        resolve("ok");
                    }).catch(function(err){
                        reject(err);
                    });
                }).catch(function(err){
                    reject(err);
                });
            } else {
                that.setstate({
                    sparkAccessToken: accessToken,
                    sparkRefreshToken: refreshToken
                });
                resolve("ok");
            }
        }).catch(function(err){
            reject(err);
        });

    });
}

function getSavedSearches(that){
    return new Promise(function(resolve, reject){
        that.setState({
            loadingSavedSearches: true
        });
        sparkService.getSavedSearches().then(function(savedSearches){
            if (savedSearches.D.Results.length > 0){
                var savedSearchId = savedSearches.D.Results[0].Id;
                var savedSearchName = savedSearches.D.Results[0].Name;
                sparkService.getSavedSearchListings(savedSearchId).then(function(savedSearchListings){
                        that.setState({
                            loading: false,
                            loadingSavedSearches: false,
                            savedSearches: savedSearches,
                            selectedSavedSearch: savedSearchId,
                            selectedSavedSearchName: savedSearchName,
                            listings: savedSearchListings,
                        });
                    resolve("ok");

                }).catch(function(err){
                    console.log(err);
                    that.setState({
                        loadingSavedSearches: false
                    });
                    reject(err);
                });
            } else {
                that.setState({
                    loadingSavedSearches: false
                });
            }
        }).catch(function(err){
            console.log(err);
            that.setState({
                loadingSavedSearches: false
            });
            reject(err);
        });
    });
}

function collectionSelect(that, accessToken, id){
    sparkService.getCollection(id).then(function(collection){
        sparkService.getCollectionListings(collection.D.Results[0].ListingIds).then(function(collectionListings){
            that.setState({
                selectedCollection: id,
                collection: collection,
                collectionListings: collectionListings
            });
        }).catch(function(err){
        });
    }).catch(function(err){
    });
}

function savedSearchSelect(that, accessToken, id, name){
    that.setState({
        loadingSavedSearchListings: true
    });
    sparkService.getSavedSearchListings(id).then(function(savedSearchListings){
            that.setState({
                loadingSavedSearchListings: false,
                listings: savedSearchListings,
                selectedSavedSearch: id,
                selectedSavedSearchName: name,
                previewUrl: null,
                activityId: null
            });
        
    }).catch(function(err){
        that.setState({
            loadingSavedSearchListings: false
        });
        console.log(err);
    });
}

function generateEmail(that, id){

        sparkService.createEmailMustache(id).then(function(email){
            console.log(email);
            that.setState({
                loading: false,
                previewUrl: email.Location,
                htmlContent: email.content
            });

        }).catch(function(err){
            that.setState({
                loading: false
            });
            console.log(err);
        });

}

const spark = {
    initializeApp,
    initializeAccount,
    collectionSelect,
    savedSearchSelect,
    getCollections,
    generateEmail,
    logout,
    initializeSavedSearches
};
export default spark;
