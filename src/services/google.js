import axios from 'axios';
import MemoryStorage from './memoryStorage';

const memoryStorageService = MemoryStorage.getService();

function sendEmail(body){
    body.tokens = memoryStorageService.googleTokens();
    console.log(body);
    var url = process.env.REACT_APP_API + 'google/emails';
    return new Promise(function(resolve, reject){
        var options = {
            url: url,
            method: 'POST',
            data: body
        };
        axios(options).then(function(response){
            resolve(response.data);
        }).catch(function(err){
            if (err.response && err.response.data)
                reject(err.response.data);
            else
                reject(err);
        });
    });
}

const google = {
    sendEmail
};

export default google;
