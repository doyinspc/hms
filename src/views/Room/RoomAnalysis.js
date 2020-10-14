import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Swal from "sweetalert2";
import { getRoomanalysis } from "./../../actions/roomtype";
import $ from 'jquery';
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
        startdate:new Date(),
        enddate:new Date()
      }
    }

    componentDidMount(){
      let bk = new Date();
      let td = new Date(moment().subtract(12, 'months').calendar());
      let params = {
          data:JSON.stringify({
            'startdate':moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'),
            'enddate':moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD'),
          }),
          cat:'roomana',
          table:'room_types'
      }
      this.props.getRoomanalysis(params);
      this.setState({
        startdate:moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'), 
        enddate:moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD')
      });
    }
    convertdays = (time) =>{
        let ys = parseInt(time)/( 60 * 60 * 30 * 24 * 12);
        let y = Math.floor(ys);
        let mts = (ys - y) * 12;
        let mt = Math.floor(mts);
        let ds = (mts - mt) * 30;
        let d = Math.floor(ds);
        let hs = (ds - d) * 24;
        let h  = Math.floor(hs);
        let ms = (hs - h) * 60;
        let m = Math.floor(ms);
        let ss = (ms - m) * 60;
        let s = Math.floor(ss);

        let dates = y > 0 ? y > 1 ? y + 'yrs ' :  y + 'yr  ' : '';
        dates += mt > 0 ? mt > 1 ? mt + 'mths ' :  mt + 'mth' : '';
        dates += d > 0 ? d > 1 ? d + 'days ' :  d + 'day' : '';
        dates += h > 0 ? h > 1 ? h + 'hrs ' :  h + 'hr ' : '';
        dates += m > 0 ? m > 1 ? m + 'mins ' :  m + 'min ' : '';
        dates += s > 0 ? s > 1 ? s + 'secs' :  s + 'sec' : '';

        return dates;
    }
    convertdate = (time) =>{
      let d = parseInt(time)/(60 * 60 * 24);
    
      return Number(d).toFixed(6);
  }
    retState = (dt, dt1) =>{
      this.setState({startdate:new Date(dt), enddate:new Date(dt1)});
  }
  lunchDate = (func, func1) =>{
      Swal.fire({
          title: 'pick a date from and to:',
          type: 'question',
          html: '<input id="datepicker" type="date"  class="swal2-input"><br/><input id="datepicker1" type="date"  class="swal2-input">',
          customClass: 'swal2-overflow',
          
        }).then(function(result) {
            if(result.value){
                let v = $('#datepicker').val();
                let v1 = $('#datepicker1').val();
                let params = {
                  data:JSON.stringify({'startdate':moment(new Date(v)).format('YYYY-MM-DD'), 'enddate':moment(new Date(v1)).format('YYYY-MM-DD')}),
                  cat:'roomana',
                  table:'room_types'
              }
              func(params);
              func1(v, v1);
            }
        });
      }

    render() {
      let {orate, ostate, orange, srate, sstate, sdata, srange, brate, bstate, bdata, brange, startdate, enddate } = this.state || '';
      let odata = this.props.roomanalysis && Array.isArray(this.props.roomanalysis) && this.props.roomanalysis[0] ? this.props.roomanalysis[0] : [] ;
      
        let otable = odata.map((prop, ind)=>{
        let numOfDays = new Date(prop.year, prop.month, 0).getDate();
        let tot =  parseInt(prop.id) > 0 && parseInt(prop.roomnum) > 0 ? (parseInt(prop.id) / (parseInt(prop.roomnum) * numOfDays)) * 100 : 0;
            return  <tr key={ind}>
                      <td>{moment(new Date(prop.year, prop.month -1, 1)).format('MMMM YYYY')}</td>
                      <td class="text-right">
                      {Number(tot).toFixed(1)}%
                      </td>
                  </tr>
      });
      let er = {};
      odata.forEach(prop=>{
        let numOfDayz = new Date(prop.year, prop.month, 0).getDate();
        let tots =  parseInt(prop.id) > 0 && parseInt(prop.roomnum) > 0 ? (parseInt(prop.id) / (parseInt(prop.roomnum) * numOfDayz)) * 100 : 0;
            er[moment(new Date(prop.year, prop.month -1, 1)).format('MMMM YYYY')] = Number(tots).toFixed(1);
            return er;
      });
      let okeyz = Object.keys(er);
      let ovalz = Object.values(er);
      let osums = ovalz.reduce((a, b)=> parseFloat(a) + parseFloat(b), 0);
      let oavg = osums > 0 && ovalz.length > 0 ? osums/ovalz.length : 0;

      let ser = {};
      odata.forEach(prop=>{
        let stots =  parseInt(prop.id) > 0 && parseInt(prop.guest) > 0 ? parseInt(prop.id) / parseInt(prop.guest) : 0;
            ser[moment(new Date(prop.year, prop.month -1, 1)).format('MMMM YYYY')] = Number(stots).toFixed(1);
            return ser;
      });
      let skeyz = Object.keys(ser);
      let svalz = Object.values(ser);
      let ssums = svalz.reduce((a, b)=> parseFloat(a) + parseFloat(b), 0);
      let savg = ssums > 0 && svalz.length > 0 ? ssums/svalz.length : 0;

      let ber = {};
      odata.forEach(prop=>{
        let btots =  parseInt(prop.duration) ;
            ber[moment(new Date(prop.year, prop.month -1, 1)).format('MMMM YYYY')] = this.convertdate(btots);
            return ber;
      });
      let bkeyz = Object.keys(ber);
      let bvalz = Object.values(ber);
      let bsums = bvalz.reduce((a, b)=> parseFloat(a) + parseFloat(b), 0);
      let bavg = bsums > 0 && bvalz.length > 0 ? bsums/bvalz.length : 0;
    
      let stable = Object.keys(sdata).map((prop, ind)=>{
        return  <div key={ind} class="progress-container progress-danger">
                  <span class="progress-badge">{prop}</span>
                  <div class="progress">
                    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width:'0.11%'}}>
                      <span class="progress-value">{prop in sdata ? sdata[prop] : 0}</span>
                    </div>
                  </div>
                </div>
      });
      
      let btable = odata.map((prop, ind)=>{
        let btot =  parseInt(prop.duration) ;
            return  <tr key={ind}>
                      <td>{moment(new Date(prop.year, prop.month -1, 1)).format('MMMM YYYY')}</td>
                      <td class="text-right">
                      {this.convertdays(btot)}
                      </td>
                  </tr>
      });
        return (
            <>
            <div class="row" id="chart2">
            <div class="col-lg-4 col-md-6">
        <div class="card card-chart">
            <div class="card-header">
            <h5 class="card-category">Occupancy Rate</h5>
            <h2 class="card-title">{Number(oavg).toFixed(1)}%</h2>
            <div class="dropdown">
                <button type="button" class="btn btn-round btn-icon dropdown-toggle btn-outline-default no-caret" data-toggle="dropdown">
                    <i class="now-ui-icons loader_gear"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#chart2" onClick={()=>this.setState({ostate:1})}>Chart</a>
                  <a class="dropdown-item" href="#chart2" onClick={()=>this.setState({ostate:2})}>Table</a>
                  <a class="dropdown-item" href="#chart2" onClick={()=>this.setState({ostate:3})}>Both</a>
                  <a class="dropdown-item" href="#">Share</a>
                  <a class="dropdown-item" href="#">Print</a>
                </div>
                </div>
            </div>
            <div class="card-body">
            {ostate === 1 || ostate === 3 ? 
            <div id="chart" class="chart">
              <LineChart label={okeyz} data={ovalz} />
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
          <div class="stats" onClick={()=>this.lunchDate(this.props.getRoomanalysis, this.retState)}>
                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
            </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 col-md-6">
      <div class="card card-chart">
        <div class="card-header">
          <h5 class="card-category">Average Length of Stay</h5>
          <h2 class="card-title">{Number(savg).toFixed(0)} days</h2>
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
              <Chart label={Object.keys(skeyz)} data={Object.values(svalz)} />
            </div>: ''}
          <div class="card-progress">
             {sstate === 2 || sstate === 3  ? stable : ''}
          </div>
        </div>
        <div class="card-footer">
          <div class="stats" onClick={()=>this.lunchDate(this.props.getRoomanalysis, this.retState)}>
                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
            </div>
        </div>
      </div>
    </div>

    <div class="col-lg-4 col-md-6">
      <div class="card card-chart">
        <div class="card-header">
          <h5 class="card-category">Average Lead Time for Booking</h5>
          <h2 class="card-title">{Number(bavg).toFixed(2)} days</h2>
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
              <Chart label={bkeyz} data={bvalz} />
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
          <div class="stats" onClick={()=>this.lunchDate(this.props.getRoomanalysis, this.retState)}>
            <i class="now-ui-icons ui-2_time-alarm"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
          </div>
        </div>
      </div>
    </div>
                
                
            </div>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({ 
  user:state.userReducer.user,
  roomanalysis:state.roomtypeReducer.roomanalysis,
})
export default connect(mapStateToProps, {getRoomanalysis})(RoomWidget);