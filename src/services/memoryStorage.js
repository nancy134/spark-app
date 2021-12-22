const MemoryStorage = (function(){

    var _service;
    var __accessToken = null;
    var __refreshToken = null;

    function _getService(){
        if (!_service){
            _service = this;
            return _service;
        }
        return _service;
    }

    //
    // Spark Access Token
    //
    function _setAccessToken(accessToken){
        __accessToken = accessToken;
    }
    function _accessToken(){
        console.log("__accessToken: "+__accessToken);
        return __accessToken;
    }

    //
    // Spark Refresh Token
    //
    function _setRefreshToken(refreshToken){
        __refreshToken = refreshToken;
    }
    function _refreshToken(){
        return __refreshToken;
    }
    // Spark Clear All
    function _sparkClearAll(){
        __accessToken = null;
        __refreshToken = null; 
    }

    return {
        getService: _getService,

        // Spark accessToken
        accessToken: _accessToken,
        setAccessToken: _setAccessToken,

        // Spark refreshToken
        refreshToken: _refreshToken,
        setRefreshToken: _setRefreshToken,

        // Spark Clear All
        sparkClearAll: _sparkClearAll,

    }
}) ();

export default MemoryStorage; 
