import React from "react";

class RoomWidget extends React.Component {
    render() {
        return (
            <>
            <div class="row">
                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-success icon-circle">
                                                <i class="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">105</h3>
                                            <h6 class="stats-title text-success"><b>Rooms Occupied</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons ui-1_calendar-60"></i> Last week
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-default icon-circle">
                                                <i class="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">18</h3>
                                            <h6 class="stats-title"><b>Rooms Available</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons ui-1_calendar-60"></i> Last week
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="card card-stats">
                        <div class="card-body ">
                            <div class="statistics statistics-horizontal">
                                <div class="info info-horizontal">
                                    <div class="row">
                                        <div class="col-5">
                                            <div class="icon icon-primary icon-circle">
                                                <i class="fa fa-bed"></i>
                                            </div>
                                        </div>
                                        <div class="col-7 text-right">
                                            <h3 class="info-title">2</h3>
                                            <h6 class="stats-title text-danger"><b>Rooms Out of Service</b></h6>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr/>
                        <div class="card-footer ">
                            <div class="stats">
                                <i class="now-ui-icons ui-1_calendar-60"></i> Last week
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default RoomWidget;