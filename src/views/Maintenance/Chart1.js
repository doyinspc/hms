import React from 'react';
import { Pie } from 'react-chartjs-2';
const chartColor = '#FFFFFF';

const data = (canvas, vals, data) => {

    return {
        labels: vals,
        datasets: [{
            label: "maintenance",
            
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                "rgba(253,180,92,0.6)",
                "rgba(70,191,189,0.6)"
                ],
                hoverBackgroundColor: 'gray',
                data: data
        }]
    }
};
const options = {
    maintainAspectRatio: false,
    legend: {
        display: true
    },
    
    tooltips: {
        bodySpacing: 4,
        mode:"nearest",
        intersect: 0,
        position:"nearest",
        xPadding:10,
        yPadding:10,
        caretPadding:10
    },
    responsive: 1,
    scales: {
        yAxes: [{
            display:0,
            ticks: {
                display: false
            },
            gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
            }
        }],
        xAxes: [{
            display:0,
            ticks: {
                display: false
            },
            gridLines: {
                zeroLineColor: "transparent",
                drawTicks: false,
                display: false,
                drawBorder: false
            }
        }],
        
        
    },
    layout:{
        padding:{left:0,right:0,top:15,bottom:15}
    }
};

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            label:[0],
            datas:[0]
        }
    }

    componentDidMount(){
        this.setState({
            label:this.props.label,
            datas:this.props.data
        })
    }

    componentDidUpdate(prevProps){
        if(this.props.label !== prevProps.label)
        {
            this.setState({
                label:this.props.label,
                datas:this.props.data
            })

        }

    }

    render(){
        let { label, datas } = this.state;
        return(
            <Pie
                data={(canvas)=>data(canvas, label, datas)} 
                height='300px'
                options={{}} 
            />
        );
    }
}

export default Chart;