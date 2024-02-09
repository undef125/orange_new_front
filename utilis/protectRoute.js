import axios from "@/app/api/axiosinterceptor";

const protectRoute = async() => {
  try {
    const resp = await axios.get("verifyusertokenroute");
    return true
  } catch (error) {
    return false
  }
}

export default protectRoute;