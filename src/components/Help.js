import React from 'react';

class Help extends React.Component{
    render(){
        return(
        <React.Fragment>
            { this.props.loading ?
            <div>Loading...</div>
            :
            <div >
                <div >
                    <div className="text-center px-5 pt-3">
                        <h1>Create Beautiful Emails from FlexMLS</h1>
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Use your FlexMLS Account and your Saved Searches to automatically generate beautiful emails with our professionally designed templates</p> 
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Upload your emails to your email marketing system such as Constant Contact and MailChimp</p>
                    </div>
                </div>
                <div className="text-center px-5">
                    <h2>Step 1. Login with FlexMLS</h2>
                    <img
                        src="https://mu-s3-images.s3.amazonaws.com/Login.png"
                        alt="FlexMLS Login"
                        width="30%"
                    />
                </div>
                <div className="p-3"></div>
                <div className="text-center px-5">
                    <h2>Step 2. Select a FlexMLS Saved Search</h2>
                    <p>
                        <span>If you dont have any Saved Searches, visit the FlexMLS instructions for saving a search: </span>
                        <span>
                             <a href="https://help.flexmls.com/en/save-a-search.html">Save Search Instructions</a>
                        </span>
                    </p>
                    <img
                        src="https://mu-s3-images.s3.amazonaws.com/SavedSearches.png"
                        alt="FlexMLS Login"
                        width="60%"
                    />
                </div>
                <div className="p-3"></div>
                <div className="text-center px-5">
                    <h2>Step 3. Generate the email for selected Saved Search</h2>
                    <p>
                        <span>An email will be generated including the first seven listings in your saved searc.</span>
                        <span>You will be able to preview your email before uploading it to Constant Contact</span>
                    </p>
                    <img
                        src="https://mu-s3-images.s3.amazonaws.com/SavedSearches.png"
                        alt="FlexMLS Login"
                        width="60%"
                    />
                </div>
 
                <div className="text-center px-5">
                    <h2>Example auto-generated email</h2>
                    <iframe
                        title="preview"
                        height="70%"
                        frameBorder="1"
                        src="https://ph-mail-template.s3.amazonaws.com/mailPreview/2f94f040-5b3f-11ec-8bbc-f3477bdac08e.html" 
                        className="homeFrame"
                    />
                </div>
            </div>
            }                     
        </React.Fragment>
        );
    }
}

export default Help;
