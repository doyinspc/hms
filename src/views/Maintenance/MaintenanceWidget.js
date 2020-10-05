import React from "react";

class RoomWidget extends React.Component {
    render() {
        return (
            <>
            <div class="row">
    <div class="col-md-12">
        <div class="card card-stats">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3">
                        <div class="statistics">
                            <div class="info">
                                <div class="icon icon-primary">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                </div>
                                <h3 class="info-title">52</h3>
                                <h6 class="stats-title">Outstanding Maintenance issues</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="statistics">
                            <div class="info">
                                <div class="icon icon-success">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                </div>
                                <h3 class="info-title">9</h3>
                                <h6 class="stats-title">Critical Maintenance Issues</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="statistics">
                            <div class="info">
                                <div class="icon icon-info">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                </div>
                                <h3 class="info-title">7</h3>
                                <h6 class="stats-title">Ongoing Maintenance</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="statistics">
                            <div class="info">
                                <div class="icon icon-danger">
                                    <i class="now-ui-icons ui-2_settings-90"></i>
                                </div>
                                <h3 class="info-title">3 days</h3>
                                <h6 class="stats-title">Average Maintenance Resolution Time</h6>
                            </div>
                        </div>
                    </div>
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