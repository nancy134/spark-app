import React from 'react';

class Home extends React.Component{
    render(){
        return(
        <React.Fragment>
            <div >
                <div >
                    <div className="text-center px-5 pt-3">
                        <h1>Constant Contact integration for FlexMLS Users</h1>
                        <p style={{fontSize: "1.2rem"}} className="pl-5 pr-5">Automatically generate Constant Contact emails from your FlexMLS Saved Searches</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default Home;