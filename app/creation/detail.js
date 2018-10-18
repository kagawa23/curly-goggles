import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/Ionicons";

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      paused: false
    };
    this._onProgress = this._onProgress.bind(this);
  }

  _onLoadStart() {
    console.log("start");
  }
  _onLoad() {
    console.log("load");
  }
  _onProgress(data) {
    this.setState(state => ({ ...state, loading: false }));
    console.log(data);
  }
  _onEnd() {
    console.log("end");
  }
  _onError(err) {
    console.log(err);
    console.log("error");
  }
  render() {
    const { navigation } = this.props;
    const { loading, paused } = this.state;
    const video = navigation.getParam("video", "");
    const author = navigation.getParam("author", {});
    const title = navigation.getParam("title", "");
    const { avatar, nickname } = author;
    console.log(author);
    return (
      <View style={styles.container}>
        <View style={styles.videoGroup}>
          <Video
            source={{ uri: video }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            style={styles.backgroundVideo}
            volumn={5}
            paused={paused}
            // rate={this.state.rate}
            // muted={this.state.muted}
            // resizeMode={this.state.resizeMode}
            // repeat={this.state.repeat}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError}
          />
          {loading ? (
            <ActivityIndicator color="#ee735c" style={styles.loading} />
          ) : null}
          {paused ? (
            <Icon
              name="ios-play"
              size={28}
              style={styles.play}
              onPress={() => this.setState({ paused: false })}
            />
          ) : (
            <Icon
              name="ios-pause"
              size={28}
              style={styles.paused}
              onPress={() => this.setState({ paused: true })}
            />
          )}
        </View>
        <View style={styles.author}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.infoGroup}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.nickname}>{nickname}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  author: {
    //  flex: 1,
    flexDirection: "row",
    margin: 10
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 32
  },
  infoGroup: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between"
  },
  title: {},
  nickname: {
    fontWeight: "200"
  },
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  header: {
    textAlign: "center"
  },
  videoGroup: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "35%",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  loading: {
    alignSelf: "center"
  },
  paused: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
    lineHeight: 46,
    color: "#fff"
    // alignSelf: "center"
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
    textAlign: "center",
    lineHeight: 46,
    color: "#fff"
  }
});

export default Detail;
