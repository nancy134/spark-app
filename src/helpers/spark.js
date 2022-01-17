import sparkService from '../services/spark';
import memoryStorageService from '../services/memoryStorage';

function checkAuthentication(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        sparkService.getSystem(accessToken).then(function(system){
            initializeHome(that, accessToken, refreshToken, system).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
            reject(err);
        });
    });
}

function getSystem(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){
        memoryStorageService.setAccessToken(accessToken);
        memoryStorageService.setRefreshToken(refreshToken);
        sparkService.getSystem().then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}

function initializeHome(that, accessToken, refreshToken, system){
    return new Promise(function(resolve, reject){
        if (!system){
            getSystem(that, accessToken, refreshToken).then(function(system){
                var user = system.D.Results[0];
                var id = user.Id;
                sparkService.getAccount(id).then(function(account){
                    console.log(account);
                    that.setState({
                        loading: false,
                        loggedIn: true,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        user: user,
                        account: account
                    });
                }).catch(function(err){
                    console.log(err);
                    reject(err);
                });
            }).catch(function(err){
                reject(err);
            });
        } else {
            var user = system.D.Results[0];
            var id = user.Id;
            sparkService.getAccount(id).then(function(account){
                console.log(account);
                that.setState({
                    loading: false,
                    loggedIn: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: user,
                    account: account
                });
            }).catch(function(err){
                console.log(err);
                reject(err);
            });
        }
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
            console.log(savedSearches);
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
    initializeHome,
    collectionSelect,
    checkAuthentication,
    savedSearchSelect,
    getCollections,
    generateEmail,
    logout,
    getSystem,
    initializeSavedSearches
};
export default spark;
