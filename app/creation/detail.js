import React, { PureComponent } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Video from "react-native-video";

class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _onLoadStart() {
    console.log("start");
  }
  _onLoad() {
    console.log("load");
  }
  _onProgress(data) {
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
    const video = navigation.getParam("video", "");
    return (
      <View style={styles.container}>
        <Text style={styles.header}>视屏</Text>
        <Video
          source={{ uri: video }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          style={styles.backgroundVideo}
          volumn={5}
          // paused={this.state.paused}
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
        <ActivityIndicator color="#ee735c" style={styles.loading} />
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
    textAlign: "center"
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%"
  }
});

export default Detail;
