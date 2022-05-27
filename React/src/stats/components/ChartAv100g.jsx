//https://github.com/vijayst/d3bar/blob/master/src/App.js
//https://vijayt.com/post/plotting-bar-chart-d3-react/

import React from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3'; 
import './Chart.css'

export default function Chart (props) {

  
    const plot = function(data, chart, width, height, margin){

        var minDate = props.period.minDate; //new Date(data[0].date);
        var maxDate = props.period.maxDate; //new Date(data[data.length-1].date);

        const datePadding = 20;
        const valuePadding = 20;

        //scales
        var xScale = d3.scaleUtc()
                    .domain([minDate, maxDate])                
                    .range([datePadding, width-datePadding]);

        const xAxis = d3.axisBottom()
            .scale(xScale).ticks(7).tickSize(0);
            
        chart.append('g')
            .classed('xAxis', true)
            .attr('transform', `translate(0,${height+5})`)
            .call(xAxis);

        chart.selectAll(".xAxis>.domain").remove();    


        //Y-axis
        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.footprint)+valuePadding])
        .range([height, 0])

        // const yAxis = d3.axisLeft()
        //     .scale(yScale)
        //     .tickSize(0)
        //     .ticks(5);

        // chart.append('g')
        //     .classed('y axis', true)
        //     .attr('transform', 'translate(-5,0)')
        //     .call(yAxis);

        const yAxisGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat('').ticks(5).tickSizeOuter(0);


        chart.append('g')
            .attr('class', 'y axis-grid')
            .call(yAxisGrid);

        chart.selectAll(".y>.domain").remove(); 


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
        .attr("stroke", "#E5E5E5")
        .attr("stroke-width", 4)
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
            .attr("r", 6)
            .style("fill", d => d.color)
            // .style("opacity", 0.5)

        //add text
        frame.selectAll('label')
        .data(data)
        .enter()
        .append('text')
        .classed('chart-label', true)
        .attr('x', d => xScale(new Date(d.date)))
        .attr('dx', 6)
        .attr('y', d => yScale(d.footprint))
        .attr('dy', -8)
        .text( d => d.footprint )

    }
    
    const drawChart = function(data){
        const margin = {
            top: 20,
            bottom: 20,
            left: 10,
            right: 10
        };

        const width = props.width //window.innerWidth;
        const height = props.width*.6;
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