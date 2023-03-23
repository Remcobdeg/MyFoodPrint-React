//https://github.com/vijayst/d3bar/blob/master/src/App.js
//https://vijayt.com/post/plotting-bar-chart-d3-react/

import React from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3'; 
import _ from 'lodash';

var roundToIndex = function(x, index) {
    // Rounds a number to a given index around the decimal point.
    //
    // Args:
    //   x - Number to round.
    //   index - Index of the least significan digit; 0 is the decimal point.
    // Returns:
    //   rounded - Number rounded using the least signficant digit.
  
    var power = Math.pow(10, -index);
    return Math.round(x * power) / power;
  }

const BarChart = function(props){

    console.log("data = "+ props.data);

    //product names better in small caps
    props.data.map(d => d.text = _.toLower(d.text)); 
    
    const plot = function(chart, width, height){

        //X-axis
        const xScale = d3.scaleLinear()
        .domain([0, d3.max(props.data, d => d.value)])
        .range([0, width ]);

        const xAxis = d3.axisBottom()
            .scale(xScale)
            .ticks(2);
            
        chart.append('g')
            .classed('xAxis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        //Y-axis
        const yScale = d3.scaleBand()
            .domain(props.data.map(d => d.text))
            .range([0, height]);

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);

        chart.append('g')
            .classed('yAxis', true)
            .attr('transform', 'translate(0,0)')
            .call(yAxis);


        chart.selectAll('.bar')
            .data(props.data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', xScale(0))
            .attr('y', d => yScale(d.text))
            .attr('width', d => (xScale(d.value)))
            .attr('height', d => yScale.bandwidth()-3)
            .style('fill', (d, i) => d.color)
            .on('click', props.handeProductClick );
            // .on('click', (d,i) => {console.log(i)} );
            

        chart.selectAll('.bar-label')
            .data(props.data)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => xScale(d.value))
            // .attr('dx', -6)
            .attr("text-anchor", d => {if(d.value>d3.max(props.data, d => d.value)/2){return("end")}else{return("start")}})
            .attr('y', d => yScale(d.text) + yScale.bandwidth()/2)
            // .attr('dy', 0)
            .text( function(d){return ((d.value<1000) ? Number(d.value.toPrecision(2)) : Number(d.value.toPrecision(2))/1000 + "k") ; } )
            .style("font-size","14px")
            .on('click', props.handeProductClick );

        chart.selectAll(".xAxis>.tick>text")
		    .style("font-size","14px");
        chart.selectAll(".yAxis>.tick>text")
		    .style("font-size","14px");

        chart.selectAll('.tick')          
            .on('click', function (d, i) {
            props.handeProductClick(d,{text: i});
        })


        chart.select('.xAxis')
            .append('text')
            .attr('x',  width/2)
            .attr('y', 40)
            .attr('fill', '#000')
            .style('font-size', '14px')
            .style('text-anchor', 'middle')
            .text('gCO2e');    
            
        // chart.select('.y.axis')
        //     .append('text')
        //     .attr('x', 0)
        //     .attr('y', 0)
        //     .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
        //     .attr('fill', '#000')
        //     .style('font-size', '20px')
        //     .style('text-anchor', 'middle')
        //     .text('Government Expenditure in Billion Dollars');   
            
        // const yGridlines = d3.axisLeft()
        //     .scale(yScale)
        //     .ticks(5)
        //     .tickSize(-width,0,0)
        //     .tickFormat('')

        // chart.append('g')
        //     .call(yGridlines)
        //     .classed('gridline', true);

    }

    const drawChart = function(){
        const margin = {
            top: 20,
            bottom: 100,
            left: 180,
            right: 10
        };

        let width = window.innerWidth;
        (window.innerWidth>600)?width = 600-48:width = window.innerWidth-48;
        const height = props.data.length*40 + margin.top + margin.bottom;
        const el = new Element('div');
        const svg = d3.select(el)
            .append('svg')
            .attr('id', 'chart')
            .attr('width', width)
            .attr('height', height);



        const chart = svg.append('g')
        .classed('display', true)
        .attr('transform', `translate(${margin.left},${margin.top})`);

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom
        plot(chart, chartWidth, chartHeight);

        return el.toReact();
    } 

    return drawChart();
}

export default BarChart;