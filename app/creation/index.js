import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { get, post } from "../common/request";
import { api } from "../common";
import { withNavigation } from "react-navigation";

const width = Dimensions.get("window").width;
const data = [];

class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      up: false
    };
    this._up = this._up.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  async _up() {
    const { up } = this.state;
    const {
      data: { id }
    } = this.props;
    const { success } = await post(`${api.host}${api.up}`, {
      accessToken: "12345",
      up: !up,
      id
    });
    if (success) {
      this.setState({ up: !up });
    }
  }

  selectItem() {
    const { data } = this.props;
    //console.log(id);
    this.props.navigation.navigate("Detail", data);
  }
  render() {
    const {
      data: { thumb, id, video, title }
    } = this.props;
    const { up } = this.state;
    return (
      <TouchableHighlight onPress={this.selectItem}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{title}</Text>
          <View style={styles.main}>
            <Image source={{ uri: thumb }} style={styles.thumb} />
            <Icon name="ios-play" size={28} style={styles.play} />
          </View>
          <View style={styles.buttonGroup}>
            <View style={styles.hanleBox}>
              <Icon
                onPress={this._up}
                style={styles.button}
                name={up ? "md-recording" : "ios-heart-empty"}
              >
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

const ListItem = withNavigation(Item);
class List extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: data
    };
    this.currentList = {
      page: 0,
      data: [],
      total: 0
    };
    this._getListData = this._getListData.bind(this);
    this._getMore = this._getMore.bind(this);
    this._fetchMoreData = this._fetchMoreData.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
  }
  static navigationOptions = {
    header: null
    // title: "Home",
    // headerStyle: {
    //   backgroundColor: "#f4511e"
    // },
    // headerTintColor: "#fff",
    // headerTitleStyle: {
    //   fontWeight: "bold"
    // }
  };
  async _getListData(page = 0) {
    this.setState({ isLoading: true });
    const { page: _page, data: _data } = this.currentList;
    const { success, data, total } = await get(`${api.host}${api.creation}`, {
      accessToken: "12345",
      page
    });
    // console.log(data);

    if (success) {
      this.currentList = {
        page: _page + 1,
        data: _data.concat(data),
        total
      };
      this.setState({ data: this.currentList.data, isLoading: false });
    } else {
      this.setState({ isLoading: false });
    }
  }
  _getMore() {
    const { data, total } = this.currentList;
    return data.length < total;
  }

  _fetchMoreData() {
    const { isLoading } = this.state;
    const { page: nextPage } = this.currentList;
    if (this._getMore() && !isLoading) {
      this._getListData(nextPage);
    }
  }

  _renderFooter() {
    const { total } = this.currentList;
    return !this._getMore() && total !== 0 ? (
      <View style={styles.loadingFooter}>
        <Text style={styles.footerText}>没有更多了</Text>
      </View>
    ) : (
      <ActivityIndicator size="small" color="#00ff00" />
    );
  }

  componentDidMount() {
    this._getListData();
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>列表页面</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            // console.log(item);
            return <ListItem data={item} key={item.id} />;
          }}
          keyExtractor={item => item.id}
          automaticallyAdjustContentInsets={false}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={20}
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
  },
  footerText: {
    textAlign: "center",
    color: "#777"
  }
});

export default List;
