import { AppRegistry } from "react-native";
import App from "./app/index";
AppRegistry.registerComponent("DogSay", () => App);

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
