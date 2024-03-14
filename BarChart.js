// BarChart.js
import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import * as d3 from 'd3';
import Svg, { Rect } from 'react-native-svg';

const BarChart = ({ data }) => {
  useEffect(() => {
    if (data && data.length > 0) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    const width = Dimensions.get('window').width;
    const height = 200;
    const barPadding = 5;

    const svg = d3.select('svg');

    svg.selectAll('*').remove(); // Clear previous elements

    const xScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([0, height]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', d => height - yScale(d))
      .attr('width', width / data.length - barPadding)
      .attr('height', d => yScale(d))
      .attr('fill', 'blue');
  };

  return (
    <View>
      <Svg width={Dimensions.get('window').width} height={200}>
        {/* D3.js chart will be rendered here */}
      </Svg>
    </View>
  );
};

export default BarChart;
