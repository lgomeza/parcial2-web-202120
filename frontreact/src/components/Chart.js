import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const Chart = ({ width = 600, height = 600, data }) => {
  const barChart = useRef();

  useEffect(() => {
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const svg = d3.select(barChart.current);
    svg.attr('width', width);
    svg.attr('height', height);

    let g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3.scaleLinear().domain([0, 500]).range([iheight, 0]);

    const x = d3
      .scaleBand()
      .domain(data.map((product) => product.name))
      .range([0, iwidth])
      .padding(0.1);

    const bars = g.selectAll('rect').data(data);

    bars.enter().append('rect')
      .attr('class', 'bar')
      .style('fill', 'coral')
      .attr('x', product => x(product.name))
      .attr('y', product => y(parseInt(product.stock)))
      .attr('height', product => iheight - y(product.stock))
      .attr('width', x.bandwidth())
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    g.append('g')
      .classed('y--axis', true)
      .call(d3.axisLeft(y));

    const div = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('opacity', 0);

    function handleMouseOver(e, product) { 
      div.transition()
        .duration(200)
        .style('opacity', .9);
      div.html(`${product.name} - ${product.stock}`)
        .style('background-color', 'white')
        .style('border', '1px solid')
        .style('border-color', 'black')
        .style('left', (e.x + 25) + 'px')
        .style('top', (e.y + 20) + 'px');
    }

    function handleMouseOut(d, i) {
      div.transition()
        .duration(500)
        .style('opacity', 0);
    } 
          
  });

  return (
    <div id='chartArea'>
      <svg ref={barChart}></svg>
    </div>
  );
};
