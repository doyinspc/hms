import React from "react";
import { Card } from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";


class TopCard extends React.Component {


    render() {
        return (
            <>
             <Card>
                 <CardHeader>
                    <h2><i className='fa fa-thumb-tack'></i> User</h2>
                 </CardHeader>
             </Card>
            </>
        )
    }
}
export default TopCard;