const MemoryStorage = (function(){

    var _service;

    //var __accessToken = "d74j7mkxe9gym1hs156exm3i4";
    var __accessToken = null;
    var __refreshToken = null;

    var __ccAccessToken = null;
    var __ccRefreshToken = null;

    var __googleAccessToken = null;
    var __googleRefreshToken = null;
    var __googleTokens = null;

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
       if (accessToken === null){
           console.log("passed null accesstoken");
           return;
       }
        __accessToken = accessToken;
    }
    function _accessToken(){
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

    //
    // CC Access Token
    //
    function _setCCAccessToken(ccAccessToken){
        __ccAccessToken = ccAccessToken;
    }
    function _ccAccessToken(){
        return __ccAccessToken;
    }

    //
    // CC Refresh Token
    //
    function _setCCRefreshToken(ccRefreshToken){
        __ccRefreshToken = ccRefreshToken;
    }
    function _ccRefreshToken(){
        return __ccRefreshToken;
    }

    //
    // Google Access Token
    //
    function _setGoogleAccessToken(googleAccessToken){
        __googleAccessToken = googleAccessToken;
    }
    function _googleAccessToken(){
        return __googleAccessToken;
    }

    //
    // Google Refresh Token
    //
    function _setGoogleRefreshToken(googleRefreshToken){
        __googleRefreshToken = googleRefreshToken;
    }
    function _googleRefreshToken(){
        return __googleRefreshToken;
    }

    //
    // Google Tokens
    //
    function _setGoogleTokens(googleTokens){
        __googleTokens = googleTokens;
    }
    function _googleTokens(){
        return __googleTokens;
    }

    // Spark Clear All
    function _sparkClearAll(){
        __accessToken = null;
        __refreshToken = null; 
        __ccAccessToken = null;
        __ccRefreshToken = null;
        __googleAccessToken = null;
        __googleRefreshToken = null;
        __googleTokens = null;
    }

    return {
        getService: _getService,

        // Spark accessToken
        accessToken: _accessToken,
        setAccessToken: _setAccessToken,

        // Spark refreshToken
        refreshToken: _refreshToken,
        setRefreshToken: _setRefreshToken,

        // CC accessToken
        ccAccessToken: _ccAccessToken,
        setCCAccessToken: _setCCAccessToken,

        // CC refreshToken
        ccRefreshToken: _ccRefreshToken,
        setCCRefreshToken: _setCCRefreshToken,

        // Google accessToken
        googleAccessToken: _googleAccessToken,
        setGoogleAccessToken: _setGoogleAccessToken,

        // Google refreshToken
        googleRefreshToken: _googleRefreshToken,
        setGoogleRefreshToken: _setGoogleRefreshToken,

        // Google accessToken
        googleTokens: _googleTokens,
        setGoogleTokens: _setGoogleTokens,

        // Spark Clear All
        sparkClearAll: _sparkClearAll,

    }
}) ();

export default MemoryStorage; 

