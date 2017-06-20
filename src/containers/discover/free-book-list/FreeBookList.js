/* eslint-disable no-undef */
import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import * as shortid from 'shortid';
import Helper from '../../../utils/helper';

class FreeBookList extends Component {
  static componentName = 'FreeBookList';

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rowData: [],
    };
  }

  componentDidMount() {
    fetch('https://phodal.github.io/growth-api-gitbook/api.json')
    .then(response => response.json())
    .then((data) => {
      const rowData = Array.from(new Array(data.length))
      .map((val, index) => (data[index]));

      this.setState({
        loading: false,
        rowData,
      });
    });
  }

  render() {
    const { loading, rowData } = this.state;

    if (loading) {
      return (<View
        style={{ marginTop: 20 }}
      >
        <ActivityIndicator
          animating
          size={'large'}
          color={'#000'}
        />
      </View>);
    }

    return (
      <ScrollView>
        <View containerStyle={{ marginBottom: 20 }}>
          {
            rowData.map(sections => (
              <View
                key={shortid.generate()}
              >
                <View style={{ padding: 10 }}><Text style={{ textAlign: 'center' }}>{sections.heading}</Text></View>
                <FlatList
                  data={sections.childrens}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                      onPress={() => Helper.openLink(item.href)}
                    >
                      <View style={{ backgroundColor: 'white' }}>
                        <ListItem
                          title={item.title}
                          subtitle={`类型：${item.type}`}
                        />
                      </View>
                    </TouchableHighlight>
                  )}
                />
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

export default FreeBookList;