import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Swal from "sweetalert2";
import { getMaintenanceanalysis } from "./../../actions/maintenancetype";
import $ from 'jquery';
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";
import Chart5 from "./Chart5";

class MaintenanceWidget extends React.Component {
    constructor(props){
        super(props);
        this.state ={
          startdate:new Date(),
          enddate:new Date()
        }
      }

    componentDidMount(){
        let bk = new Date();
        let td = new Date(moment().subtract(3, 'months').calendar());
        let params = {
            data:JSON.stringify({
              'startdate':moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'),
              'enddate':moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD'),
              'locationid': this.props.user.location
            }),
            cat:'mainana',
            table:'maintenance_types'
        }
        this.props.getMaintenanceanalysis(params);
        this.setState({
          startdate:moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'), 
          enddate:moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD')
        });
      }


      componentDidUpdate(prevProps)
      {
        if(prevProps.user.location !== this.props.user.location){
        let bk = new Date();
        let td = new Date(moment().subtract(3, 'months').calendar());
        let params = {
            data:JSON.stringify({
              'startdate':moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'),
              'enddate':moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD'),
              'locationid': this.props.user.location
            }),
            cat:'mainana',
            table:'maintenance_types'
        }
        this.props.getMaintenanceanalysis(params);
        this.setState({
          startdate:moment(new Date(td.getFullYear(), td.getMonth(), 1)).format('YYYY-MM-DD'), 
          enddate:moment(new Date(bk.getFullYear(), bk.getMonth() + 1, 0)).format('YYYY-MM-DD')
        });
       }
      }

      lunchDate = (func, func1) =>{
        Swal.fire({
            title: 'Pick a date from and to:',
            type: 'question',
            html: '<input id="datepicker" type="date"  class="swal2-input"><br/><input id="datepicker1" type="date"  class="swal2-input">',
            customClass: 'swal2-overflow',
            
          }).then(function(result) {
              if(result.value){
                  let v = $('#datepicker').val();
                  let v1 = $('#datepicker1').val();
                  let params = {
                    data:JSON.stringify({'startdate':moment(new Date(v)).format('YYYY-MM-DD'), 'enddate':moment(new Date(v1)).format('YYYY-MM-DD')}),
                    cat:'mainana',
                    table:'maintenance_types'
                }
                func(params);
                func1(v, v1);
              }
          });
        }
        retState = (dt, dt1) =>{
            this.setState({startdate:new Date(dt), enddate:new Date(dt1)});
        }
        convertdate = (time) =>{
            let d = parseInt(time)/(60 * 60 * 24);
          
            return Number(d).toFixed(6);
        }
    render() {
        let {startdate, enddate } = this.state;
        let odata1 = this.props.maintenanceanalysis && Array.isArray(this.props.maintenanceanalysis) && this.props.maintenanceanalysis[0] ? this.props.maintenanceanalysis[0] : [] ;
        let odata2 = this.props.maintenanceanalysis && Array.isArray(this.props.maintenanceanalysis) && this.props.maintenanceanalysis[1] ? this.props.maintenanceanalysis[1] : [] ;
        let odata3 = this.props.maintenanceanalysis && Array.isArray(this.props.maintenanceanalysis) && this.props.maintenanceanalysis[2] ? this.props.maintenanceanalysis[2] : [] ;
        let odata4 = this.props.maintenanceanalysis && Array.isArray(this.props.maintenanceanalysis) && this.props.maintenanceanalysis[3] ? this.props.maintenanceanalysis[3] : [] ;
        

        let er1 = {};
        odata1.forEach(prop=>{
                er1[prop.categoryname] = prop.num;
                return er1;
        });
        let okeyz1 = Object.keys(er1);
        let ovalz1 = Object.values(er1);

        let er2 = {};
        odata2.forEach(prop=>{
                er2[prop.status] = prop.num;
                return er2;
        });
        let okeyz2 = Object.keys(er2);
        let ovalz2 = Object.values(er2);

        let er3 = {};
        odata3.forEach(prop=>{
                er3[parseInt(prop.is_completed) === 1 ? 'Completed' : 'Pending'] = prop.num;
                return er3;
        });
        let okeyz3 = Object.keys(er3);
        let ovalz3 = Object.values(er3);

        let er5 = {};
        odata4.forEach(prop=>{
            let numOfDayz = new Date(prop.year, prop.month, 0).getDate();
            let tots =  parseInt(prop.num) > 0 ? prop.num : 0;
                er5[moment(new Date(prop.year, prop.month -1, 1)).format('MMM YYYY')] = this.convertdate(tots)/prop.maintenancenum;
                return er5;
        });
        
        let okeyz5 = Object.keys(er5);
        let ovalz5 = Object.values(er5);

        let er4 = {};
        odata4.forEach(prop=>{
                er4[moment(new Date(prop.year, prop.month -1, 1)).format('MMM YYYY')] = Number(prop.maintenancenum).toFixed(1);
                return er4;
        });
        
        let okeyz4 = Object.keys(er4);
        let ovalz4 = Object.values(er4);

        return (
            <>
            <div class="row">
                <div class="col-md-4">
                    <div class="card card-stats">
                    <div class="card-header">
                        <h5 class="card-category"><b>Maintenance Categorys</b></h5>
                    </div>
                        <div class="card-body">
                            <div id="chart" class="chart">
                                <Chart1 label={okeyz1} data={ovalz1} />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="stats" onClick={()=>this.lunchDate(this.props.getMaintenanceanalysis, this.retState)}>
                                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card card-stats">
                    <div class="card-header">
                        <h5 class="card-category"><b>Maintenance Piority</b></h5>
                    </div>
                        <div class="card-body">
                            <div id="chart" class="chart">
                                <Chart2 label={okeyz2} data={ovalz2} />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="stats" onClick={()=>this.lunchDate(this.props.getMaintenanceanalysis, this.retState)}>
                                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                
                    <div class="card card-stats">
                    <div class="card-header">
                        <h5 class="card-category"><b>Maintenance State</b></h5>
                    </div>
                        <div class="card-body">
                            <div id="chart" class="chart">
                                <Chart3 label={okeyz3} data={ovalz3} />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="stats" onClick={()=>this.lunchDate(this.props.getMaintenanceanalysis, this.retState)}>
                                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
               
                <div class="col-md-6">
                    <div class="card card-stats">
                    <div class="card-header">
                        <h5 class="card-category"><b>Maintenance Report</b></h5>
                    </div>
                        <div class="card-body">
                            <div id="chart" class="chart">
                                <Chart4 label={okeyz4} data={ovalz4} data1={ovalz5} />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="stats" onClick={()=>this.lunchDate(this.props.getMaintenanceanalysis, this.retState)}>
                                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-stats">
                    <div class="card-header">
                        <h5 class="card-category"><b>Maintenance Resolution Time</b></h5>
                    </div>
                        <div class="card-body">
                            <div id="chart" class="chart">
                                <Chart5 label={okeyz5} data={ovalz5} />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="stats" onClick={()=>this.lunchDate(this.props.getMaintenanceanalysis, this.retState)}>
                                <i class="now-ui-icons arrows-1_refresh-69"></i> {moment(new Date(startdate)).format("MMMM YYYY")}{" "}{moment(new Date(enddate)).format("MMMM YYYY")}
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
    user:state.userReducer,
    maintenanceanalysis:state.maintenancetypeReducer.maintenanceanalysis,
  })
  export default connect(mapStateToProps, {getMaintenanceanalysis})(MaintenanceWidget);