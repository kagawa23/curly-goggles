import { options } from "./index";
import Mock from "mockjs";

export async function get(url, queryParm, opt = {}) {
  try {
    const query = Object.keys(queryParm)
      .reduce((res, v) => `${res}${v}=${queryParm[v]}&`, "")
      .slice(0, -1);
    console.log(query);
    let response = await fetch(`${url}?${query}`, { ...options, opt });
    let responseJson = await response.json();
    return Mock.mock(responseJson);
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function post(url, body, opt = {}) {
  try {
    // const query = Object.keys(queryParm)
    //   .reduce((res, v) => `${res}${v}=${queryParm[v]}&`, "")
    //   .slice(0, -1);
    // console.log(query);
    let response = await fetch(`${url}`, {
      ...options,
      opt,
      method: "POST",
      body: JSON.stringify(body)
    });
    let responseJson = await response.json();
    return Mock.mock(responseJson);
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
