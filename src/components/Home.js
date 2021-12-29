import React from 'react';

class Home extends React.Component{
    render(){
        return(
        <React.Fragment>
            { this.props.loading ?
            <div>Loading...</div>
            :
            <div >
                <div >
                    <div className="text-center p-5">
                        <h1>Create Beautiful Emails</h1>
                        <h1>from FlexMLS</h1>
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Use your FlexMLS Account and your Saved Searches to automatically generate beautiful emails with our professionally designed templates</p> 
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Upload your emails to your email marketing system such as Constant Contact and MailChimp</p>
                    </div>
                </div>
        
                <div className="text-center p-5">
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

export default Home;
