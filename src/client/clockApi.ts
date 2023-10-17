
// import { Axios } from "axios";
import axios from "axios";
import { ClockModel } from "../clock/model";

const BASE_URL = "http://localhost:8081"

const clockClient = axios.create({
  baseURL: BASE_URL,
})

export const getClock = async () => {
  const result = await clockClient.get("/clock")
  return result.data as ClockModel
}


