//https://github.com/vijayst/d3bar/blob/master/src/App.js
//https://vijayt.com/post/plotting-bar-chart-d3-react/

import React from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3'; 

export default function Chart (props) {

  
    const plot = function(data, chart, width, height, margin){

        var minDate = props.period.minDate; //new Date(data[0].date);
        var maxDate = props.period.maxDate; //new Date(data[data.length-1].date);
        
        console.log("min: " +minDate);
        console.log("max: " +maxDate);

        //scales
        var xScale = d3.scaleUtc()
                    .domain([minDate, maxDate])                
                    .range([10, width-10]);

        const xAxis = d3.axisBottom()
            .scale(xScale).ticks(7);
            
        chart.append('g')
            .classed('xAxis', true)
            .attr('transform', `translate(0,${height+5})`)
            .call(xAxis);

        //Y-axis
        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.footprint)+15])
        .range([height, 0])

        const yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(5);

        chart.append('g')
            .classed('yAxis', true)
            .attr('transform', 'translate(-5,0)')
            .call(yAxis);

        // Add a clipPath: everything out of this area won't be drawn.
        var clip = chart.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

        var frame = chart.append('g')
        .attr("clip-path", "url(#clip)")

        // Add the line
        frame.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(function(d) { return xScale(new Date(d.date)) })
        .y(function(d) { return yScale(d.footprint) })
        )

        // Add circles
        frame
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return xScale(new Date(d.date)); } )
            .attr("cy", function (d) { return yScale(d.footprint); } )
            .attr("r", 8)
            .style("fill", "#61a3a9")
            .style("opacity", 0.5)


    }
    
    const drawChart = function(data){
        const margin = {
            top: 20,
            bottom: 40,
            left: 40,
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
        plot(data, chart, chartWidth, chartHeight, margin);

        return el.toReact();
    } 

    return drawChart(props.data);
};