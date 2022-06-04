import axiosSpark from './axiosSpark';



export function getCollections(){
    var url = process.env.REACT_APP_API + "spark/collections";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCollection(id){
    var url = process.env.REACT_APP_API + "spark/collections/" + id;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getCollectionListings(listings){
    var url = process.env.REACT_APP_API + "spark/collectionListings";
    return new Promise(function(resolve, reject){
        var body = {
            listings: listings
        };
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    }); 
}

export function getSystem(){
    var url = process.env.REACT_APP_API + "spark/system";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSavedSearches(page){
    var url = process.env.REACT_APP_API + "spark/savedsearches";
    if (page){
        url += "?page="+page;
    }
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getSavedSearchListings(savedSearch){
    var url = process.env.REACT_APP_API + "spark/listings?_filter=SavedSearch%20Eq%20'"+savedSearch+"'";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET',
            withCredentials: true
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function createEmail(id){
    var url = process.env.REACT_APP_API + "/spark/emails/" + id;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function createEmailMustache(id, body){
    var url = process.env.REACT_APP_API + "spark/emails/" + id + "/mustache";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getAccount(id){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + "spark/accounts/" + id;
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getConstant(savedSearchId, ccAccountId){
    return new Promise(function(resolve, reject){
        var url = process.env.REACT_APP_API + 
            "spark/constants?savedSearchId="+savedSearchId+
            "&ccAccountId="+ccAccountId;
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function createConstant(body){
    return new Promise(function(resolve, reject){
        //var url = process.env.REACT_APP_API + "/spark/constants";
          var url = process.env.REACT_APP_API + "spark/constants";
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
             reject(err);
        });
    });
}

export function getContacts(){
    var url = process.env.REACT_APP_API + "spark/contacts";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getTemplates(){
    var url = process.env.REACT_APP_API + "spark/templates";
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

export function getTemplate(id){
    var url = process.env.REACT_APP_API + "spark/templates/" + id;
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'GET'
        };
        axiosSpark(options).then(function(result){
            resolve(result.data);
        }).catch(function(err){
            reject(err);
        });
    });
}

const spark = {
    getCollections,
    getCollection,
    getCollectionListings,
    getSystem,
    getSavedSearches,
    getSavedSearchListings,
    createEmail,
    createEmailMustache,
    getAccount,
    getConstant,
    createConstant,
    getContacts,
    getTemplates,
    getTemplate
};
export default spark;
