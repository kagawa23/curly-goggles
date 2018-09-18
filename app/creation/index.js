import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Mock from "mockjs";

const width = Dimensions.get("window").width;
const data = [
  {
    thumb: "https://dummyimage.com/1200x600/f2a979",
    id: "630000200308096509",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/8679f2",
    id: "710000199604021549",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/8ff279",
    id: "640000198301017849",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/f279b2",
    id: "310000199002240600",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/79d6f2",
    id: "640000200111041784",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/f2eb79",
    id: "710000198910209019",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/c779f2",
    id: "43000019891106183X",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/79f2a4",
    id: "65000020130208533X",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/f28079",
    id: "220000201206014734",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  },
  {
    thumb: "https://dummyimage.com/1200x600/7994f2",
    id: "430000197608120855",
    video: "https://www.imooc.com/33b34658-c4c6-4bdb-84fe-6dfa483202f1"
  }
];

class ListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      data: { thumb, id, video }
    } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{id}</Text>
          <View style={styles.main}>
            <Image source={{ uri: thumb }} style={styles.thumb} />
            <Icon name="ios-play" size={28} style={styles.play} />
          </View>
          <View style={styles.buttonGroup}>
            <View style={styles.hanleBox}>
              <Icon style={styles.button} name="ios-heart-empty">
                <Text>点赞</Text>
              </Icon>
            </View>
            <View style={styles.hanleBox}>
              <Icon style={styles.button} name="md-recording">
                <Text>点灭</Text>
              </Icon>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class List extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: data
    };
    this._getListData = this._getListData.bind(this);
  }

  async _getListData() {
    console.log("hello");
    try {
      let response = await fetch(
        "http://rap2api.taobao.org/app/mock/template/433529",
        {
          headers: {
            "content-type": "application/json"
          }
        }
      );
      let responseJson = await response.json();
      const data = Mock.mock(responseJson);
      console.log(responseJson);
      console.log(data);
      return responseJson.movies;
    } catch (error) {
      console.log(error);
    }
    // return fetch("https://rap2api.taobao.org/app/mock/85415/api/creation")
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     return responseJson.movies;
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }

  async componentDidMount() {
    this._getListData().done();
    // try {
    //   let response = await fetch(
    //     "http://rap2api.taobao.org/app/mock/template/433529"
    //   );
    //   let responseJson = await response.json();
    //   console.log(responseJson);
    //   return responseJson.movies;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>列表页面</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            console.log(item);
            return <ListItem data={item} key={item.id} />;
          }}
          keyExtractor={item => item.id}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 25,
    flex: 1,
    marginBottom: 10
  },
  header: {
    textAlign: "center",
    backgroundColor: "#EE735C",
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 16,
    color: "#fff"
  },
  item: {
    width: width
  },
  thumb: {
    width: width,
    height: (width / 16) * 9,
    resizeMode: "cover"
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    fontSize: 18
  },
  hanleBox: {
    width: 0.5 * width - 0.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10
  },
  play: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#fff",
    color: "red",
    textAlign: "center",
    lineHeight: 46
  }
});

export default List;
