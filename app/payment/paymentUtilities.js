import { loadStripe } from "@stripe/stripe-js";
import axios from "../api/axiosinterceptor";
export const makeStripePayment = async () => {
  try {
    const stripe = await loadStripe(
      "pk_test_51OdbKnSDrQbUV5GODnck4S7qTTAI1C7Cb2IIjJmcb6HLlHymyzQXpfdTUfbn0hFEbzVcu9HijzBuWGKMfch1wU8O00ZTvLKR3G"
    );

    const response = await axios.post(
      "/create-checkout-session",
      { subPrice: 100 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    const result = stripe.redirectToCheckout({
      sessionId: response.data.id,
    });
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

export const makePaypalPayment = async (req, res) => {
    console.log("gggggggggggggggggggggggggg")
  try {
    const response = await axios.post(
      "/paypal-order",
      { subPrice: 100 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
      console.log(response)
    window.location.href = response?.data?.redirectUrl;
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
