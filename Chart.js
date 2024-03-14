import React, { useMemo } from 'react';
import { Svg, G, Line, Rect, Text } from 'react-native-svg';
import * as d3 from 'd3';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 10;
const colors = {
  axis: '#E4E4E4',
  bars: 'red', // Change the color to red
};

const BarChart = ({ data, round, unit }) => {
  // Memoize scales to prevent unnecessary recalculations
  const scales = useMemo(() => {
    const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
    const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

    // X scale point
    const xDomain = data.map((item) => item.name);
    const xRange = [0, graphWidth];
    const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);

    // Y scale linear
    const maxmarks = d3.max(data, (d) => d.marks);
    const topmarks = Math.ceil(maxmarks / round) * round;
    const yDomain = [0, topmarks];
    const yRange = [0, graphHeight];
    const y = d3.scaleLinear().domain(yDomain).range(yRange);

    // top axis and middle axis
    const middlemarks = topmarks / 2;

    return { x, y, topmarks, middlemarks, graphHeight, graphWidth };
  }, [data, round]);

  const {
    x,
    y,
    topmarks,
    middlemarks,
    graphHeight,
    graphWidth,
  } = scales;

  return (
    <Svg width={SVGWidth} height={SVGHeight}>
      <G y={graphHeight + GRAPH_MARGIN}>
        {/* Top marks name */}
        <Text
          x={graphWidth}
          textAnchor="end"
          y={y(topmarks) * -1 - 5}
          fontSize={12}
          fill="black"
          fillOpacity={0.4}>
          {topmarks + ' ' + unit}
        </Text>

        {/* bottom axis */}
        <Line
          x1="0"
          y1="0"
          x2={graphWidth}
          y2="2"
          stroke={colors.axis}
          strokeWidth="2"
        />

        {/* vertical line from the leftmost edge to the origin */}
        <Line
          x1="0"
          y1={graphHeight}
          x2="0"
          y2={y(topmarks) * -2}
          stroke={colors.axis}
          strokeWidth="2"
        />

        {/* bars */}
        {data.map((item) => (
  <G key={'bar-group' + item.name}>
    <Rect
      key={'bar' + item.name}
      x={x(item.name) - GRAPH_BAR_WIDTH / 2}
      y={y(item.marks) * -1}
      rx={2.5}
      width={GRAPH_BAR_WIDTH}
      height={y(item.marks)}
      fill={colors.bars}
    />
    {/* Displaying marks on the vertical axis */}
    <Text
      key={'marks' + item.name}
      fontSize="8"
      x={x(item.name)} // Adjust the X position for alignment
      y={y(item.marks) * -1 - 5}
      textAnchor="middle">
      {item.marks}
    </Text>
  </G>
))}

        {/* names */}
        {data.map((item) => (
          <Text
            key={'name' + item.name}
            fontSize="8"
            x={x(item.name)}
            y="10"
            textAnchor="middle">
            {item.name}
          </Text>
        ))}
      </G>
    </Svg>
  );
};

const SVGHeight = 150;
const SVGWidth = 300;

export default BarChart;
