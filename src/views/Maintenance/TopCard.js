import React from "react";
import { Card } from 'reactstrap';
import CardHeader from "reactstrap/lib/CardHeader";


class TopCard extends React.Component {


    render() {
        return (
            <>
             <Card>
                 <CardHeader>
                    <h2><i className='fa fa-wrench'></i> Maintenance</h2>
                 </CardHeader>
             </Card>
            </>
        )
    }
}
export default TopCard;