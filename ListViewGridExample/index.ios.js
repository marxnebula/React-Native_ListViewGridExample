/*
 * Application for creating a ListsView example.  It displays images of all the planets
 * and our sun using the ListView.  If the user clicks on an image then a check mark
 * appears to indicate that you have clicked there.


  - Created by Jordan Patrick Marx 
    (4/30/2016)
 */


'use strict';

// This loads the react-native module and assigns it to React.
var React = require('react');

// Contains all the react native functions and objects
var ReactNative = require('react-native');

// Used so you don't have to put React.Text and instead just React
var {
  AppRegistry,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = ReactNative;

// Size of the displayed list
var sizeOfList = 40;

// Images of the sun and planets
var THUMB_URLS = [
  require('./Thumbnails/sun.png'),
  require('./Thumbnails/mercury.png'),
  require('./Thumbnails/venus.png'),
  require('./Thumbnails/earth.png'),
  require('./Thumbnails/mars.png'),
  require('./Thumbnails/jupiter.png'),
  require('./Thumbnails/saturn.png'),
  require('./Thumbnails/uranus.png'),
  require('./Thumbnails/neptune.png'),
  require('./Thumbnails/pluto.png'),
];

// Image of the check mark
var checkMark = require('./Thumbnails/checkMark.png');


// ListView class
var ListViewGridExample = React.createClass({

  statics: {
    title: 'ListView Example',
    description: 'Change image by clicking on the cell'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.genRows({})),
      clicked: false
    };
  },

  pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this.pressData = {};
  },

  render: function() {
    return (
      // ListView wraps ScrollView and so takes on its properties.
      // With that in mind you can use the ScrollView's contentContainerStyle prop to style the items.
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.state.dataSource}
        initialListSize={21}
        pageSize={3}
        renderRow={this.renderRow}
      />
    );
  },

  renderRow: function(rowData: string, sectionID: number, rowID: number) {

  // Gets random image from THUMB_URLS
  var imgSource = THUMB_URLS[Math.floor(Math.random() * THUMB_URLS.length)];

  // If the image ha been clicked then set the image to checkMark
  if(this.state.clicked)
  {
    imgSource = checkMark;
  }
   
    return (
      <TouchableHighlight onPress={() => this.pressRow(rowID)} underlayColor="transparent">
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

// Populates the rows with a simple array of data blobs.
// If the picture has been clicked then it displays and X
  genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < sizeOfList; ii++) {
      var pressedText = pressData[ii] ? ' ' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  },



  // Called when user clicks on a image
  // Set the states for clicked and dataSources. Clicked boolean will change image source
  pressRow: function(rowID: number) {
    this.pressData[rowID] = !this.pressData[rowID];
    this.setState({
      clicked: true,
      dataSource: this.state.dataSource.cloneWithRows(this.genRows(this.pressData))
    });
  },
});

// The style sheet
var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'black'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 3,
    width: 100,
    height: 100,
    backgroundColor: '#723CCF',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'white'
  },
});

// AppRegistry defines the entry point to the application and provides the root component.
AppRegistry.registerComponent('ListViewGridExample', () => ListViewGridExample);
