import React from "react";
import { StyleSheet, Text, View, TabBarIOS } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Creation from "./creation";
import Detail from "./creation/detail";
import Account from "./account";
import Edit from "./edit";
import { createStackNavigator } from "react-navigation";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectTab: "list"
    };
  }
  render() {
    const { selectTab } = this.state;
    const ListNavigator = createStackNavigator(
      {
        Creation,
        Detail: {
          screen: Detail,
          navigationOptions: ({ navigation }) => ({
            title: "视频详情"
            // headerBackTitle: "返回"
          })
        }
      },
      { initialRouteName: "Creation" }
    );
    return (
      <TabBarIOS tintColor="#ee753c">
        <Icon.TabBarItemIOS
          iconName="md-videocam"
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
          <ListNavigator />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="md-recording"
          selectedIconName="ios-recording"
          iconSize={20}
          onPress={() => {
            this.setState({ selectTab: "edit" });
          }}
          selected={selectTab === "edit"}
          title={"Edit"}
        >
          <Edit />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="md-more"
          selectedIconName="ios-more"
          iconSize={20}
          onPress={() => {
            this.setState({ selectTab: "account" });
          }}
          selected={selectTab === "account"}
          title={"Account"}
        >
          <Account />
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
