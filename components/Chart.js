import React, { useEffect, useState, useMemo } from 'react'; // Import useState
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Switch, Button, StyleSheet } from 'react-native';

import { Svg, G, Line, Rect, Text } from 'react-native-svg';
import * as d3 from 'd3';

const GRAPH_MARGIN = 15;
const GRAPH_BAR_WIDTH = 20;

const BarChart = ({ mode, data, round, unit }) => {

  const isDarkMode  = mode;

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
          stroke= {isDarkMode? 'white':'black'}
          strokeWidth="1"
        />

        {/* vertical line from the leftmost edge to the origin */}
        <Line
          x1="0"
          y1={graphHeight}
          x2="0"
          y2={y(topmarks) * -2}
          stroke= {isDarkMode? 'white':'black'}
          strokeWidth="2"
        />

        {/* bars */}
        {data.map((item) => (
          <G key={'bar-group' + item.name}>
            <Rect
              key={'bar' + item.name}
              x={x(item.name) - GRAPH_BAR_WIDTH / 2}
              y={y(item.marks) * -1}
              rx={1}
              width={GRAPH_BAR_WIDTH}
              height={y(item.marks)}
              fill={(item.dist) % 2 === 0 ? '#3396f9' : 'lightgreen'}
            />

            {/* Displaying marks on the vertical axis */}
            <Text
              key={'marks' + item.name}
              fontSize="8"
              // stroke = {isDarkMode? 'white':'black'}
              fontWeight='bold'
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
            fontSize="10"
            fontWeight= 'bold'
            
            // stroke= {isDarkMode ? 'white' : 'black'} 
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


function HomeScreen({ route, navigation }) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [existingData, setExistingData] = useState(null); 
  const dummydata=[
    {name:"ENTER",marks:"0"},
    {name:"DATA",marks:"0"}
  ]
  
  const fetchData = async () => {
    
      const data = await AsyncStorage.getItem('studentData');
      setExistingData(data ? JSON.parse(data) : dummydata);
  };

  const clearLocalStorage = async () => { try {

    await AsyncStorage.removeItem('studentData');
    console.log('Local storage data cleared.');

  } catch (error) {
    console.error('Error clearing local storage:', error);
  }
};

  useEffect(() => {
  
    fetchData();
  }, [existingData]);
  
  return (
    <View style={isDarkMode ? styles.darkModeContainer : styles.container}>

      <View style={styles.switchContainer}>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
      
      {existingData? <BarChart mode = {isDarkMode} data={existingData} round={100} unit="€" />:""}

      <View style={styles.gap} />
      <Button title="CLEAR" onPress={clearLocalStorage} />
    
      <View style={styles.gap} />
      <Button title="ADD" onPress={() => navigation.navigate('StudentForm')} />

      <View style={styles.gap} />
      <Button title="ABOUT" onPress={() => navigation.navigate('About')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff', 
  },
  darkModeContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#000', 
  },
  gap: {
    height: 15,
  },
  switchContainer: {
    position: 'absolute',
    top: 0,
    right: 16,
  },
});

const SVGHeight = 150;
const SVGWidth = 300;

export default HomeScreen;
