import React, {
} from 'react';
import DownNavBar from './DownNavBar';

function Down() {

    return(
        <React.Fragment>
            <DownNavBar 
            />
                <p className="p-4">This application is no longer in service.</p>
                <p className="px-4">Contact support@murbansw.com if you are interested in using this service.</p>
               
        </React.Fragment>
    );
}

export default Down;

