import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
const Detail = props => {
  console.log(props);
  const { navigation } = props;
  const video = navigation.getParam("video", "");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>视屏</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 25,
    flex: 1,
    marginBottom: 10
  },
  header: {
    textAlign: "center"
  }
});

export default Detail;
