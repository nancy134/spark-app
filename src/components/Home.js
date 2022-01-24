import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

class Home extends React.Component{
    render(){
        
        return(
        
            <React.Fragment>
            <MDBContainer className='p-4'>
              <MDBRow >
                  <MDBCol >
                      <div className="text-center px-5 pt-3">
                          <h1>Constant Contact integration for FlexMLS Users</h1>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Automatically generate Constant Contact emails from your FlexMLS Saved Searches</p>
                      </div>
                  </MDBCol>
                  <MDBCol>
                      <img 
                          src="https://mu-s3-images.s3.amazonaws.com/PlaceholderImage.png"
                          className="img-fluid" 
                          alt="placeholder" 
                      />
                  </MDBCol>
              </MDBRow>
              
              <MDBRow className="bg-light">
              <MDBCol>
                      <img 
                          src="https://mu-s3-images.s3.amazonaws.com/PlaceholderImage.png"
                          className="img-fluid" 
                          alt="placeholder" 
                      />
                  </MDBCol>                  <MDBCol >
                      <div className="text-center px-5 pt-3">
                          <h1>Sync Constant Contacts</h1>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!
                          </p>
                      </div>
                  </MDBCol>
              </MDBRow>

              <MDBRow>
                  <MDBCol >
                      <div className="text-center px-5 pt-3">
                          <h1>Generate Constant Contact Email</h1>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!
                          </p>
                      </div>
                  </MDBCol>
                  <MDBCol>
                      <img 
                          src="https://mu-s3-images.s3.amazonaws.com/PlaceholderImage.png"
                          className="img-fluid" 
                          alt="placeholder" 
                      />
                  </MDBCol>
              </MDBRow>
              <MDBRow className="bg-light" >
              <MDBCol>
                      <img 
                          src="https://mu-s3-images.s3.amazonaws.com/PlaceholderImage.png"
                          className="img-fluid" 
                          alt="placeholder" 
                      />
                  </MDBCol>
                  <MDBCol >
                      <div className="text-center px-5 pt-3">
                          <h1>Pricing</h1>
                          <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!
                          </p>
                      </div>
                  </MDBCol>
              </MDBRow>
              </MDBContainer>

              <MDBFooter backgroundcolor='light' className='text-center text-lg-left'>
              <MDBContainer className='p-4'>    
              <MDBRow>
                <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>Footer Content</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat
                    pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque
                    cumque eum delectus sint!
                  </p>
                </MDBCol>
                <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase'>FEATURES</h5>
                  <ul className='list-unstyled mb-0'>
                    <li>
                    <a href='/Home' className='text-dark'>
                        Home
                      </a>
                    </li>
                    <li>
                    <a href='/savedsearches' className='text-dark'>
                        Saved Searches
                      </a>
                    </li>
                    <li>
                    <a href='/contacts' className='text-dark'>
                        Contacts
                      </a>
                    </li>
                    <li>
                    <a href='/help' className='text-dark'>
                        Help
                      </a>
                    </li>

                    <li>
                    <a href='/pricing' className='text-dark'>
                        Pricing
                      </a>
                    </li>

                  </ul>
                </MDBCol>
                <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase mb-0'>ABOUT US</h5>
                  <ul className='list-unstyled'>
                    <li>
                    <a href='/AboutPage' className='text-dark'>
                        About
                      </a>
                    </li>
 
                    
                    <li>
                      <a href='/terms' className='text-dark'>
                        Terms
                      </a>
                    </li>

                    <li>
                      <a href='/privacy' className='text-dark'>
                        Privacy
                      </a>
                    </li>

                    <li>
                      <a href='/contact' className='text-dark'>
                        Contact
                      </a>
                    </li>

                  </ul>
                </MDBCol>



                <MDBCol lg='2' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-uppercase mb-0'>ACCOUNT</h5>
                  <ul className='list-unstyled'>
                    <li>
                    <a href='/MyAccount' className='text-dark'>
                        My Account
                      </a>
                    </li>
 
                    
                    <li>
                      <a href='/Logout' className='text-dark'>
                        Logout
                      </a>
                    </li>


                  </ul>
                </MDBCol>


              </MDBRow>

            </MDBContainer>
            <div className='text-center p-3' style={{ backgroundcolor: 'rgba(0, 0, 0, 0.2)' }}>
              &copy; {new Date().getFullYear()}{' '}
              <a className='text-dark' href='/home'>
                Murban, LLC.
              </a>
            </div>
          </MDBFooter>
          
              </React.Fragment>
        );
    }
}

export default Home;
