import React, { PureComponent } from "react";
import { StyleSheet, Text, View, TabBarIOS } from "react-native";

class Index extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>制作页面</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Index;
