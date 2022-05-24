//https://github.com/vijayst/d3bar/blob/master/src/App.js
//https://vijayt.com/post/plotting-bar-chart-d3-react/

import React from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3'; 

export default function Chart (props) {

  
    const plot = function(data, chart, width, height){

        console.log(data.length);

        var minDate = new Date(data[0].date);
        var maxDate = new Date(data[data.length-1].date);
        
        console.log("min: " +minDate);
        console.log("max: " +maxDate);

        //scales
        var xScale = d3.scaleTime()
                    .domain([minDate, maxDate])                
                    .range([5, width]);

        const xAxis = d3.axisBottom()
            .scale(xScale).ticks(3);
            
        chart.append('g')
            .classed('xAxis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        //Y-axis
        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.footprint)])
        .range([height, 0])

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);

        chart.append('g')
            .classed('yAxis', true)
            .attr('transform', 'translate(20,0)')
            .call(yAxis);

            // Add the line
        chart.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return xScale(new Date(d.date)) })
        .y(function(d) { return yScale(d.footprint) })
        )

        // let lineFun = d3.svg.line()
        //     .x(function (d) {return xScale(d.date); } )
        //     .y(function (d) {return yScale(d.footprint); })
        //     .interpolate("linear");

        // chart.append("path")
        //     .attr({
        //         d: lineFun(data),
        //         "stroke" : "purple",
        //         "stroke-width": 2,
        //         "fill" : "none"
        //     });


        // chart.selectAll('.bar')
        //     .data(props.data)
        //     .enter()
        //     .append('rect')
        //     .classed('bar', true)
        //     .attr('x', xScale(0))
        //     .attr('y', d => yScale(d.text))
        //     .attr('width', d => (xScale(d.value)))
        //     .attr('height', d => yScale.bandwidth()-3)
        //     .style('fill', (d, i) => d.color)
        //     .on('click', props.handeProductClick );
        //     // .on('click', (d,i) => {console.log(i)} );
            

        // chart.selectAll('.bar-label')
        //     .data(props.data)
        //     .enter()
        //     .append('text')
        //     .classed('bar-label', true)
        //     .attr('x', d => xScale(d.value))
        //     // .attr('dx', -6)
        //     .attr("text-anchor", d => {if(d.value>5000){return("end")}else{return("start")}})
        //     .attr('y', d => yScale(d.text) + yScale.bandwidth()/2)
        //     // .attr('dy', 0)
        //     .text( function(d){return ((d.value<1000) ? Number(d.value.toPrecision(2)) : Number(d.value.toPrecision(2))/1000 + "k") ; } )
        //     .on('click', props.handeProductClick );

        // chart.selectAll(".xAxis>.tick>text")
		//     .style("font-size","20px");
        // chart.selectAll(".yAxis>.tick>text")
		//     .style("font-size","20px");

        // chart.select('.xAxis')
        //     .append('text')
        //     .attr('x',  width/2)
        //     .attr('y', 60)
        //     .attr('fill', '#000')
        //     .style('font-size', '20px')
        //     .style('text-anchor', 'middle')
        //     .text('gCO2e');    
            
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
    
    const drawChart = function(data){
        const margin = {
            top: 20,
            bottom: 100,
            left: 10,
            right: 10
        };

        const width = window.innerWidth;
        const height = window.innerWidth;
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
        plot(data, chart, chartWidth, chartHeight);

        return el.toReact();
    } 

    return drawChart(props.data);
};