import React, {
    useEffect,
    useState,
    useRef
} from 'react';
import AppNavBar from './AppNavBar';
import './App.css';
import AppRoutes from './Routes';
import memoryStorageService from './services/memoryStorage';
import { useCookies } from 'react-cookie';
import LoginTimeout from './components/LoginTimeout';
import sparkService from './services/spark';
import authService from './services/auth';
import constantService from './services/constant';
import {
    useWindowWidth
} from '@react-hook/window-size';

function App() {

    // App
    const width = useWindowWidth({wait:1000});
    const previousWidth = usePreviousWidth(width);

    const [appLoading, setAppLoading] = useState(true);
    const [showLoginTimeout, setShowLoginTimeout] = useState(false);

    // Authentication
    const [redirect_uri, setRedirect_uri] = useState(null);
    const [authUrl, setAuthUrl] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);;

    // User
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);

    // Saved Searches
    const [savedSearches, setSavedSearches] = useState(null);
    const [selectedSavedSearch, setSelectedSavedSearch] = useState(null);
    const [selectedSavedSearchName, setSelectedSavedSearchName] = useState(null);

    // Listings
    const [listings, setListings] = useState( null);
    const [loadingSavedSearchListings, setLoadingSavedSearchListings] = useState(false);
    const [loadingSavedSearches, setLoadingSavedSearches] = useState(null);

    // Preview
    const [previewUrl, setPreviewUrl] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);
    const [generatingEmail, setGeneratingEmail] = useState(false);
    const [header_text, setHeader_text] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [templateId, setTemplateId] = useState("noTemplate");
    const [activityId, setActivityId] = useState(null);
    const [mobilePreview, setMobilePreview] = useState(false);

    // Constant Contact
    const [ccLoggedIn, setCCLoggedIn] = useState(null);
    const [ccAccountId, setCCAccountId] = useState(null);
    const [cc_access_token, setCC_access_token] = useState(null);

    // Google Auth
    const [googleLoggedIn, setGoogleLoggedIn] = useState(false);
    const [authorizationCode, setAuthorizationCode] = useState(null);
    const [name, setName] = useState(null);
    const [organization, setOrganization] = useState(null);

    const checkLoginStatus = (err) => {
        if (err.type && err.type === "LoginTimeout"){
            handleLogout();
        }
    }

    const handleLogin = (accessToken, refreshToken) => {
        setLoggingIn(true);
        if (accessToken && refreshToken){

            memoryStorageService.setAccessToken(accessToken);
            memoryStorageService.setRefreshToken(refreshToken);

            sparkService.getSystem().then(function(system){
                var user = system.D.Results[0];
                var id = user.Id;
                sparkService.getAccount(id).then(function(account){
                    setLoggingIn(false);
                    setLoggedIn(true);
                    setUser(user);
                    setAccount(account);
                }).catch(function(err){
	            checkLoginStatus(err);
                    setLoggingIn(false);
               });
            }).catch(function(err){
                checkLoginStatus(err);
                setLoggingIn(false);
            });
        } else {
            setLoggingIn(false);
        }
    }

    const handleLogout = (type) => {
        memoryStorageService.sparkClearAll();
        removeCookie();
        //cookies.remove("refresh_token");

        var loginTimeout = true;
        if (type === "NoDialog") loginTimeout = false;
        setShowLoginTimeout(loginTimeout);
        setLoggedIn(false);
    }
    const handleInitializeSavedSearches = (mode) => {
        var page = 1;
        getSavedSearches(mode, page);
    }
    const getSavedSearches = (mode, page) => {
	setLoadingSavedSearches(true);
        sparkService.getSavedSearches(page).then(function(savedSearches){
            if (savedSearches.D.Results.length > 0 && width >= 768){
            //if (savedSearches.D.Results.length > 0){
                var savedSearchId = savedSearches.D.Results[0].Id;
                var savedSearchName = savedSearches.D.Results[0].Name;
                sparkService.getSavedSearchListings(savedSearchId).then(function(savedSearchListings){
                    setLoadingSavedSearches(false);
                    setSavedSearches(savedSearches);
                    setSelectedSavedSearch(savedSearchId);
                    setSelectedSavedSearchName(savedSearchName);
                    setListings(savedSearchListings);
                }).catch(function(err){
	            checkLoginStatus(err);
		    setLoadingSavedSearches(false);
                });
            } else {
                setSavedSearches(savedSearches);
                setLoadingSavedSearches(false);
            }
        }).catch(function(err){
            checkLoginStatus(err);
            setLoadingSavedSearches(false);
        });
    }

    const handleSavedSearchSelect = (id, name, mode) => {
        if (width >= 768){
            setLoadingSavedSearchListings(true);
            sparkService.getSavedSearchListings(id).then(function(savedSearchListings){
                setLoadingSavedSearchListings(false);
                setListings(savedSearchListings);
                setSelectedSavedSearch(id);
                setSelectedSavedSearchName(name);
                setPreviewUrl(null);
                setActivityId(null);
            }).catch(function(err){
                checkLoginStatus(err);
                setLoadingSavedSearchListings(false);
            });
        } else {
            handleGenerateEmail(id, mode);
        }
    }

    const handleNewSavedSearchPage = (page, mode) => {
        getSavedSearches(mode, page);
    }

    const handleGenerateEmail = (id, mode) => {
        var savedSearchId = null;
        if (width < 768){
            savedSearchId = id;
        } else {
            savedSearchId = selectedSavedSearch;
        }
        setGeneratingEmail(true);

        var body = {
            header_text: header_text 
        }

        var mobileP = false;
        if (width < 768) mobileP = true;

        sparkService.createEmailMustache(savedSearchId, body).then(function(email){
            setGeneratingEmail(false);
            setPreviewUrl(email.Location);
            setHtmlContent(email.content);
            setMobilePreview(mobileP);

        }).catch(function(err){
            checkLoginStatus(err);
            setGeneratingEmail(false);
        });
       
    }

    const handleUploadEmail = (id) => {
        setActivityId(id);
    }

    const receiveLoginMessage = (event, redirect_url) => {

        var code = null;

        if (event.data && !event.data.type){
            var check = event.data.substring(1,5);
            if (check === "code"){
                var str = event.data;
                var parts = str.split("&");
                code = parts[0].substring(6);
            }
        }
        if (code){
            // TBD
            //window.removeEventListener('message', that.receiveMessage);
            setAuthorizationCode(event.data.substring(6));
            authService.getCCAuthToken(code, redirect_url).then(function(result){
                setCC_access_token(result.access_token)
                var refresh_token = null;
                if (result.refresh_token) refresh_token = result.refresh_token;
                memoryStorageService.setCCAccessToken(result.access_token);
                if (refresh_token !== null && refresh_token !== 'null'){
                    memoryStorageService.setCCRefreshToken(refresh_token);
                }
                constantService.getAccount().then(function(account){
                    var name = account.first_name + " " + account.last_name;
                    var organization = account.organization_name;
                    setName(name);
                    setOrganization(organization);
                    setCCAccountId(account.encoded_account_id);
                }).catch(function(err){
                    console.log(err);
                });
            }).catch(function(err){
                console.log(err);
            });
        }

    }

    const handleLoginTimeoutCancel = () => {
        setShowLoginTimeout(false);
    }

    const handleShowSettings = () => {
        setShowSettings(true);
    }

    const handleSaveSettings = (id, settings) => {
        setHeader_text(settings);
        setTemplateId(id);
        setShowSettings(false);
        setHtmlContent(null);
        setPreviewUrl(null);
    }

    const handleCancelSettings = () => {
        setShowSettings(false);
    }

    const handleGoogleSignin= () => {
        setGoogleLoggedIn(true);
    }

    const handleSendViaText = () => {
        window.location = "sms:?body=Select the link below to see some listings you may be interested in. \n"+previewUrl;
    }

    useEffect(() => {
        setAppLoading(true);

        // Check for Spark authentication override
        var hardCodedAccessToken = memoryStorageService.accessToken();
        authService.getSparkAuthUrl().then(function(result){

            var access_token = null;
            var refresh_token = null;
            if (result.access_token){
                access_token = result.access_token;
                refresh_token = result.refresh_token;
            } else if (hardCodedAccessToken){
                access_token = hardCodedAccessToken;
            }

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
            if (access_token){
                memoryStorageService.setAccessToken(access_token);
                memoryStorageService.setRefreshToken(refresh_token);

                sparkService.getSystem().then(function(system){
                    var user = system.D.Results[0];
                    var id = user.Id;
                    sparkService.getAccount(id).then(function(account){
                        setAppLoading(false);
                        setLoggedIn(true)
                        setUser(user);
                        setAccount(account);
                        setAuthUrl(url);
                        setRedirect_uri(redirect_uri);
                    }).catch(function(err){
                        checkLoginStatus(err);
                        setAppLoading(false);
                    });
                }).catch(function(err){
                    checkLoginStatus(err);
                    setAppLoading(false);
                });
            } else {
               setAuthUrl(url);
               setRedirect_uri(redirect_uri);
               setAppLoading(false);
            }  
        }).catch(function(err){
            setAppLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function usePreviousWidth(width){
        const ref = useRef();
        useEffect(() => {
            ref.current = width;
        });
        return ref.current;
    }

    useEffect(() => {
        if (!previousWidth || width !== previousWidth){
            if (previousWidth >= 768 && width < 768){
                setListings(null);
                setSelectedSavedSearch(null);
                setSelectedSavedSearchName(null);
                setPreviewUrl(null);
                setActivityId(null);
            } else if (previousWidth < 768 && width >= 768){
                setMobilePreview(false);
                handleInitializeSavedSearches();
            }
        }
    },[width, previousWidth, selectedSavedSearch]);
    return(
        <React.Fragment>
            <LoginTimeout
                show={showLoginTimeout}
                onCancel={handleLoginTimeoutCancel}
            />
            <AppNavBar 
                appLoading={appLoading}
                loggingIn={loggingIn}
                onLogin={handleLogin}
                loggedIn={loggedIn}
                onLoginTimeout={handleLogout}
                onLogout={handleLogout}
                authUrl={authUrl}
                redirect_uri={redirect_uri}
                user={user}
            />
            <AppRoutes
                width={width}
                appLoading={appLoading}
                loggingIn={loggingIn}
                loggedIn={loggedIn}
                onLoginTimeout={handleLogout}

                listings={listings}
                loadingSavedSearchListings={loadingSavedSearchListings}

                savedSearches={savedSearches}
                onSavedSearchSelect={handleSavedSearchSelect}
                selectedSavedSearch={selectedSavedSearch}
                selectedSavedSearchName={selectedSavedSearchName}
                onNewSavedSearchPage={handleNewSavedSearchPage}
                loadingSavedSearches={loadingSavedSearches}

                previewUrl={previewUrl}
                htmlContent={htmlContent}
                onGenerateEmail={handleGenerateEmail}
                generatingEmail={generatingEmail}
                templateId={templateId}

                user={user}
                account={account}
                onInitializeSavedSearches={handleInitializeSavedSearches}
                activityId={activityId}
                onUploadEmail={handleUploadEmail}
                onShowSettings={handleShowSettings}
                onSaveSettings={handleSaveSettings}
                onCancelSettings={handleCancelSettings}
                showSettings={showSettings}

                ccLoggedIn={ccLoggedIn}
                ccAccountId={ccAccountId}
                cc_access_token={cc_access_token}
                receiveLoginMessage={receiveLoginMessage}
                authorizationCode={authorizationCode}
                name={name}
                organization={organization}

                onGoogleSignin={handleGoogleSignin}
                googleLoggedIn={googleLoggedIn}

                mobilePreview={mobilePreview}

                onSendViaText={handleSendViaText}
            >
          </AppRoutes>
        </React.Fragment>
    );
}

export default App;

