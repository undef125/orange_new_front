
import { toast } from "react-toastify";

export const toastStarter = (message) => {
  return toast.loading(message, {
    autoClose: false,
  });
};
export const toastSuccess = (toastId, message) => {
  return toast.update(toastId.current, {
    render: message,
    type: toast.TYPE.SUCCESS,
    autoClose: 1000,
    isLoading: false,
  });
};
export const toastError = (toastId, error) => {
  return toast.update(toastId.current, {
    render: error.response.data.error,
    type: toast.TYPE.ERROR,
    autoClose: 1000,
    isLoading: false,
  });
};
