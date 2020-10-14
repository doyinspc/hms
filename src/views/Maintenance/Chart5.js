import React from 'react';
import { Bar } from 'react-chartjs-2';
const chartColor = '#FFFFFF';

const data = (canvas, vals, data) => {

    return {
        labels: vals,
        datasets: [{
            label: "Avg. Days: ",
            backgroundColor: 'teal',
            hoverBackgroundColor: 'teal',
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
    render(){
        return(
            <Bar
                data={(canvas)=>data(canvas, this.props.label, this.props.data)} 
                height='300px'
                options={{}} 
            />
        );
    }
}

export default Chart;