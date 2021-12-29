import sparkService from '../services/spark';
import memoryStorageService from '../services/memoryStorage';

function initialize(that, accessToken, refreshToken){
    return new Promise(function(resolve, reject){

        memoryStorageService.setAccessToken(accessToken);
        memoryStorageService.setRefreshToken(refreshToken);

        getSavedSearches(that, accessToken, refreshToken).then(function(result){
            resolve(result);
        }).catch(function(err){
            reject(err);
        });
    });
}
function logout(that){
    console.log("logout()");
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

function getSavedSearches(that, accessToken, refreshToken){
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
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        });
                    resolve("ok");

                }).catch(function(err){
                    that.setState({
                        loadingSavedSearches: false
                    });
                    reject(err);
                });
            } else {
                console.log("No saved searches");
                that.setState({
                    loadingSavedSearches: false,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            }
        }).catch(function(err){
            that.setState({
                loadingSavedSearches: false
            });
            reject(err);
        });
    });
}

function checkAuthentication(that, accessToken, refreshToken){
    console.log("checkingAuthentication: accessToken: "+ accessToken + " refreshToken: "+refreshToken);
    return new Promise(function(resolve, reject){
        sparkService.getSystem(accessToken).then(function(system){
            initialize(that, accessToken, refreshToken).then(function(result){
                resolve(result);
            }).catch(function(err){
                reject(err);
            });
        }).catch(function(err){
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
                previewUrl: null
            });
        
    }).catch(function(err){
        that.setState({
            loadingSavedSearchListings: false
        });
        console.log(err);
    });
}

function generateEmail(that, id){

        console.log("generateEmail()");
        console.log("id: "+id);
        sparkService.createEmailMustache(id).then(function(email){
            console.log("email:");
            console.log(email);
            that.setState({
                loading: false,
                previewUrl: email.Location,
            });

        }).catch(function(err){
            that.setState({
                loading: false
            });
            console.log(err);
        });

}

const spark = {
    initialize,
    collectionSelect,
    checkAuthentication,
    savedSearchSelect,
    getCollections,
    generateEmail,
    logout
};
export default spark;
