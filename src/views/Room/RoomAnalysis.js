import React from "react";
import Chart from "./../Booking/Chart";
import LineChart from "./../Booking/LineChart";
class RoomWidget extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        orate:0,
        ostate:1,
        odata:{},
        orange:{},
        srate:0,
        sstate:1,
        sdata:{},
        srange:{},
        brate:0,
        bstate:1,
        bdata:{},
        brange:{},
      }
    }

      


    render() {
      let {orate, ostate, odata, orange, srate, sstate, sdata, srange, brate, bstate, bdata, brange } = this.state || '';

      let otable = Object.keys(odata).map((prop, ind)=>{
            return  <tr key={ind}>
                      <td>{prop}</td>
                      <td class="text-right">
                      {prop in sdata ? odata[prop] : 0 }%
                      </td>
                  </tr>
      });
      let stable = Object.keys(sdata).map((prop, ind)=>{
        return  <div key={ind} class="progress-container progress-danger">
                  <span class="progress-badge">{prop}</span>
                  <div class="progress">
                    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'0.11%'}}>
                      <span class="progress-value">{prop in sdata ? sdata[prop] : 0}%</span>
                    </div>
                  </div>
                </div>
      });
      let btable = Object.keys(bdata).map((prop, ind)=>{
        return  <tr key={ind}>
                  <td>{prop}</td>
                  <td class="text-right">
                    {prop in bdata ? bdata[prop] : 0 }
                  </td>
              </tr>
      });
        return (
            <>
            <div class="row">
            <div class="col-lg-4 col-md-6">
        <div class="card card-chart">
            <div class="card-header">
            <h5 class="card-category">Occupancy Rate</h5>
            <h2 class="card-title">{orate}%</h2>
            <div class="dropdown">
                <button type="button" class="btn btn-round btn-icon dropdown-toggle btn-outline-default no-caret" data-toggle="dropdown">
                    <i class="now-ui-icons loader_gear"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({ostate:1})}>Chart</a>
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({ostate:2})}>Table</a>
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({ostate:3})}>Both</a>
                  <a class="dropdown-item" href="#">Share</a>
                  <a class="dropdown-item" href="#">Print</a>
                </div>
                </div>
            </div>
            <div class="card-body">
            {ostate === 1 || ostate === 3 ? 
            <div id="chart" class="chart">
              <LineChart label={Object.keys(odata)} data={Object.values(odata)} />
            </div>: ''}
            {ostate === 2 || ostate === 3  ? <div class="table-responsive">
                <table class="table">
                    <tbody>
                       {otable}
                    </tbody>
                </table>
            </div>:''}
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
          <h2 class="card-title">{srate} days</h2>
          <div class="dropdown">
            <button type="button" class="btn btn-round dropdown-toggle btn-outline-default btn-icon no-caret" data-toggle="dropdown">
                <i class="now-ui-icons loader_gear"></i>
            </button>
          	<div class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Chart</a>
              <a class="dropdown-item" href="#">Table</a>
              <a class="dropdown-item" href="#">Both</a>
              <a class="dropdown-item" href="#">Share</a>
              <a class="dropdown-item" href="#">Print</a>
          	</div>
		      </div>
        </div>
        <div class="card-body">
            {sstate === 1 || sstate === 3 ? 
            <div  class="chart">
              <Chart label={Object.keys(sdata)} data={Object.values(sdata)} />
            </div>: ''}
          <div class="card-progress">
             {sstate === 2 || sstate === 3  ? stable : ''}
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
          <h2 class="card-title">{brate}</h2>
          <div class="dropdown">
                <button type="button" class="btn btn-round btn-icon dropdown-toggle btn-outline-default no-caret" data-toggle="dropdown">
                    <i class="now-ui-icons loader_gear"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({bstate:1})}>Chart</a>
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({bstate:2})}>Table</a>
                  <a class="dropdown-item" href="#" onClick={()=>this.setState({bstate:3})}>Both</a>
                  <a class="dropdown-item" href="#">Share</a>
                  <a class="dropdown-item" href="#">Print</a>
                </div>
          </div>
        </div>
        <div class="card-body">
          {bstate === 1 || bstate === 3 ? 
            <div id="chart" class="chart">
              <Chart label={Object.keys(bdata)} data={Object.values(bdata)} />
            </div>: ''}
            {bstate === 2 || bstate === 3  ? <div class="table-responsive">
                <table class="table">
                    <tbody>
                       {btable}
                    </tbody>
                </table>
            </div>:''}
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