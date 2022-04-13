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
                        src="https://mu-s3-images.s3.amazonaws.com/LoginButton.png"
                        alt="FlexMLS Login"
                        width="30%"
                    />
                    <br></br>
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
                        src="https://mu-s3-images.s3.amazonaws.com/MurbanSavedSearches.png"

                        alt="FlexMLS Login"
                        width="60%"
                    />
                </div>
                <div className="p-3"></div>
                <div className="text-center px-5">
                    <h2>Step 3. Generate the email for selected Saved Search</h2>
                    <p>
                    <p>Select "Generate email..." to automatically generate the email content from the 1st seven listings in your Saved Search</p>
                    <p>A preview of the email will be displayed below for review before uploading to Constant Contact</p>                    </p>
                    <img
                        src="https://mu-s3-images.s3.amazonaws.com/MurbanGenerateEmail.png"
                        alt="FlexMLS Login"
                        width="60%"
                    />
                </div>
 
                <div className="p-3"></div>
                <div className="text-center px-5">
                    <h2>Step 4. Upload to Constant Contact</h2>
                    <p>Select "Upload to Constant Contact" to upload your email</p>
                    <p>You will be asked to login to Constant Contact so you must already have an account</p>
                    <img
                        src="https://mu-s3-images.s3.amazonaws.com/MurbanUploadToConstantContact.png"
                        alt="FlexMLS Login"
                        width="60%"
                    />
                </div>
                <p></p>
                <p></p>
            </div>
            }                     
        </React.Fragment>
        );
    }
}

export default Help;
