import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import axios from "../api/axiosinterceptor";
export const makeStripePayment = async () => {
  const toastId = toast.loading(<b>Starting Stripe Payment Process</b>);
  try {
    const stripe = await loadStripe(
      "pk_test_51OdbKnSDrQbUV5GODnck4S7qTTAI1C7Cb2IIjJmcb6HLlHymyzQXpfdTUfbn0hFEbzVcu9HijzBuWGKMfch1wU8O00ZTvLKR3G"
    );

    const response = await axios.post(
      "/create-checkout-session",
      { subPrice: 300 },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response)
    const result = stripe.redirectToCheckout({
      sessionId: response.data.sessionId,
    });
    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss(toastId);
    console.log(`error: ${error}`);
  }
};

export const makePaypalPayment = async (req, res) => {
  const toastId = toast.loading(<b>Starting Paypal Payment Process</b>);
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
    window.location.href = response?.data?.redirectUrl;
    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss(toastId);
    console.log(`error: ${error}`);
  }
};
