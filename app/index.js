import React from "react";
import { StyleSheet, Text, View, TabBarIOS } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectTab: "list"
    };
  }
  render() {
    const { selectTab } = this.state;
    return (
      <TabBarIOS tintColor="#ee753c">
        <Icon.TabBarItemIOS
          iconName="ios-videocam-outline"
          selectedIconName="ios-videocam"
          iconSize={20}
          onPress={() =>
            this.setState({
              selectTab: "list"
            })
          }
          selected={selectTab === "list"}
          title={"List"}
        >
          <View>List</View>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="ios-recording-outline"
          selectedIconName="ios-recording"
          iconSize={20}
          onPress={() => {
            this.setState({ selectTab: "edit" });
          }}
          selected={selectTab === "edit"}
          title={"Edit"}
        >
          <View>Edit</View>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="ios-more-outline"
          selectedIconName="ios-more"
          iconSize={20}
          onPress={() => {
            this.setState({ selectTab: "account" });
          }}
          selected={selectTab === "account"}
          title={"Account"}
        >
          <View>Account</View>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
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
