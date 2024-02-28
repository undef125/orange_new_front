import axios from "@/app/api/axiosinterceptor";

const protectRoute = async () => {
  try {
    const resp = await axios.get("verifyusertokenroute");
    return resp.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export default protectRoute;
