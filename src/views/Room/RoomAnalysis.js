import React from "react";

class RoomWidget extends React.Component {
    render() {
        return (
            <>
            <div class="row">
            <div class="col-lg-4 col-md-6">
        <div class="card card-chart">
            <div class="card-header">
            <h5 class="card-category">Occupancy Rate</h5>
            <h2 class="card-title">34,252</h2>
            <div class="dropdown">
                <button type="button" class="btn btn-round btn-icon dropdown-toggle btn-outline-default no-caret" data-toggle="dropdown">
                    <i class="now-ui-icons loader_gear"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <a class="dropdown-item text-danger" href="#">Remove Data</a>
                </div>
                </div>
            </div>
            <div class="card-body">
            <div class="chart-area">
                <canvas id="activeUsers"></canvas>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <tbody>
                        <tr>
                            <td>USA</td>
                            <td class="text-right">
                                2.920
                            </td>
                            <td class="text-right">
                                53.23%
                            </td>
                        </tr>
                        <tr>
                            <td>Germany</td>
                            <td class="text-right">
                                1.300
                            </td>
                            <td class="text-right">
                                20.43%
                            </td>
                        </tr>
                        <tr>
                            <td>Australia</td>
                            <td class="text-right">
                                760
                            </td>
                            <td class="text-right">
                                10.35%
                            </td>
                        </tr>
                        <tr>
                            <td>United Kingdom</td>
                            <td class="text-right">
                                690
                            </td>
                            <td class="text-right">
                                7.87%
                            </td>
                        </tr>
                        <tr>
                            <td>Romania</td>
                            <td class="text-right">
                                600
                            </td>
                            <td class="text-right">
                                5.94%
                            </td>
                        </tr>
                        <tr>
                            <td>Brasil</td>
                            <td class="text-right">
                                550
                            </td>
                            <td class="text-right">
                                4.34%
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        <div class="card-footer">
          <div class="stats">
                <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-6">
      <div class="card card-chart">
        <div class="card-header">
          <h5 class="card-category">Average Length of Stay</h5>
          <h2 class="card-title">55,300</h2>
          <div class="dropdown">
            <button type="button" class="btn btn-round dropdown-toggle btn-outline-default btn-icon no-caret" data-toggle="dropdown">
                <i class="now-ui-icons loader_gear"></i>
            </button>
          	<div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <a class="dropdown-item text-danger" href="#">Remove Data</a>
          	</div>
		      </div>
        </div>
        <div class="card-body">
          <div class="chart-area">
            <canvas id="emailsCampaignChart"></canvas>
          </div>

          <div class="card-progress">
            <div class="progress-container">
              <span class="progress-badge">Delivery Rate</span>
              <div class="progress">
                <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'90%'}}>
                  <span class="progress-value">90%</span>
                </div>
              </div>
            </div>

            <div class="progress-container progress-success">
              <span class="progress-badge">Open Rate</span>
              <div class="progress">
                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'60%'}}>
                  <span class="progress-value">60%</span>
                </div>
              </div>
            </div>

            <div class="progress-container progress-info">
              <span class="progress-badge">Click Rate</span>
              <div class="progress">
                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'12%'}}>
                  <span class="progress-value">12%</span>
                </div>
              </div>
            </div>

            <div class="progress-container progress-warning">
              <span class="progress-badge">Hard Bounce</span>
              <div class="progress">
                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'5%'}}>
                  <span class="progress-value">5%</span>
                </div>
              </div>
            </div>

            <div class="progress-container progress-danger">
              <span class="progress-badge">Spam Report</span>
              <div class="progress">
                <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'0.11%'}}>
                  <span class="progress-value">0.11%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="stats">
                <i class="now-ui-icons arrows-1_refresh-69"></i> Just Updated
            </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-md-6">
      <div class="card card-chart">
        <div class="card-header">
          <h5 class="card-category">Average Lead Time for Booking</h5>
          <h2 class="card-title">105</h2>
        </div>
        <div class="card-body">
          <div class="chart-area">
            <canvas id="activeCountries"></canvas>
          </div>
          <div id="worldMap" class="map"></div>
        </div>
        <div class="card-footer">
          <div class="stats">
            <i class="now-ui-icons ui-2_time-alarm"></i> Last 7 days
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