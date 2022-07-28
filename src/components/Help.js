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
                        <h1>Create Professional Emails from FlexMLS</h1>
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Use your FlexMLS Account and your Saved Searches to automatically generate beautiful emails with our professionally designed templates</p> 
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Send your email through Gmail or Constant Contact.  Or text a link to your email.</p>
                    </div>
                </div>
                <div className="text-center px-5">
                    <h2>Upload email to Constant Contact</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/jGO5jqk0fcg"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="text-center px-5">
                    <h2>View email in browser window</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/hOhc1ds1zKE"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
                <div className="text-center px-5">
                    <h2>Copy link to email</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/_cZHOMiS-fQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>

                <div className="text-center px-5">
                    <h2>Use Gmail to send HTML email</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/xaeorHF8mSc"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
            }                     
        </React.Fragment>
        );
    }
}

export default Help;
