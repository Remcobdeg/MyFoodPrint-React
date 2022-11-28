import React from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3'; 

const Wordcloud = function(props){
    
    const plot = function(chart, width, height){

        // List of words
        var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]

        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        var layout = d3.layout.cloud()
        .size([width, height])
        .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
        .padding(5)        //space between words
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .fontSize(function(d) { return d.size; })      // font size of words
        .on("end", draw);
        layout.start();

        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
        chart
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
                .data(words)
            .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .style("fill", "#69b3a2")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }

    }

    const drawChart = function(){
        const margin = {
            top: 20,
            bottom: 100,
            left: 180,
            right: 10
        };

        const width = window.innerWidth*.8;
        const height = window.innerHeight*.6;
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

export default Wordcloud;