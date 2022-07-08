import React from 'react';
import { 
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    function handleGetStarted(){ 
        navigate("/savedsearches");
    }
    return(
        <React.Fragment>
            <MDBContainer className='p-4'>
              <MDBRow >
                  <MDBCol sm="12" md="6">
                      <div className="text-center px-5 pt-3">
                          <h3>Create HTML emails<br/>from FlexMLS</h3>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Generate professional HTML emails from your FlexMLS Saved Searches</p>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Send with Gmail or Constant Contact</p>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Try now free for 7 days</p>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">$7 / month</p>
                          <MDBBtn
                              onClick={handleGetStarted}
                          >Get Started Now!</MDBBtn>
                          <h3 className="pt-5">Need Help?</h3>
                          <p>Contact us at <a href="mailto:support@murbansw.com">support@murbansw.com</a></p>
                          <p>Checkout our <a href="https://www.murbansw.com/help">Help Page</a></p>
                      </div>
                      `
                  </MDBCol>
                  <MDBCol sm="12" md="6" >
                      <div className="text-center">
                      <img
                          src="https://mu-s3-images.s3.amazonaws.com/CCEmailMobile.png"
                          className="img-fluid"
                          style={{height: "80%"}}
                          alt="placeholder"
                      />
                      </div>
                  </MDBCol>
                  </MDBRow>
              </MDBContainer>
          <MDBFooter>
            <div className='text-center p-3' style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
              &copy; {new Date().getFullYear()}{' '}
              Murban, LLC.
            </div>
          </MDBFooter>

        </React.Fragment>
    );
}

export default Home;
