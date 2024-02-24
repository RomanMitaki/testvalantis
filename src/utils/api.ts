import md5 from "md5";
import { TIds, TItems } from "./types";

export const baseApiUrl = "http://api.valantis.store:40000/";
const password = "Valantis";
const currentDate = new Date().toISOString().split("T")[0].replace(/-/g, "");
const timeStamp = `${password}_${currentDate}`;
export const token = md5(timeStamp);

const requestIds = {
  action: "get_ids",
  params: {},
};

export const getIds = async (retries = 3) => {
  try {
    const res = await fetch(baseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": token,
      },
      body: JSON.stringify(requestIds),
    });
    if (!res.ok) {
      throw new Error(`Network response was not ok, status: ${res.status}`);
    }
    const data = await res.json();
    const result: TIds = data.result;
    return result;
  } catch (error) {
    error instanceof Error
      ? console.error("Fetch error:", error.message)
      : console.error("Unknown Error");
    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries - 1}`);
      await getIds(retries - 1);
    } else {
      console.log("Exceeded maximum number of retries");
    }
  }
};

export const getItems = async (retries = 3, ids: TIds) => {
  try {
    const res = await fetch(baseApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth": token,
      },
      body: JSON.stringify({
        action: "get_items",
        params: { ids: ids },
      }),
    });
    if (!res.ok) {
      throw new Error(`Network response was not ok, status: ${res.status}`);
    }
    const data = await res.json();
    const result: TItems = data.result;
    return result;
  } catch (error) {
    error instanceof Error
      ? console.error("Fetch error:", error.message)
      : console.error("Unknown Error");
    if (retries > 0) {
      console.log(`Retrying... Attempts left: ${retries - 1}`);
      await getIds(retries - 1);
    } else {
      console.log("Exceeded maximum number of retries");
    }
  }
};
