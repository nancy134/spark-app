import React from 'react';
import { 
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';


class Home extends React.Component{


    render(){

        return(

            <React.Fragment>
            <MDBContainer className='p-4'>
              <MDBRow >
                  <MDBCol >
                      <div className="text-center px-5 pt-3">
                      <h3>Constant Contact integration<br/>for FlexMLS Users</h3>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Automatically generate Constant Contact emails from your FlexMLS Saved Searches</p>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Try now free for 30 days</p>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">$7 / month</p>
                          <h3>Need Help?</h3>
                          <p>Contact us at <a href="mailto:support@murbansw.com">support@murbansw.com</a></p>
                          <p>Checkout our <a href="https://www.murbansw.com/help">Help Page</a></p>
                      </div>
                  </MDBCol>
                  <MDBCol >
                      <img
                          src="https://mu-s3-images.s3.amazonaws.com/CCEmailMobile.png"
                          className="img-fluid"
                          alt="placeholder"
                      />
                  </MDBCol>
                  </MDBRow>

                  <MDBBtn
                  onClick={this.handleTimeout}
              >Login Timeout Test</MDBBtn>

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
}

export default Home;