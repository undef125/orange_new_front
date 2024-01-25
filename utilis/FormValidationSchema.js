import * as Yup from "yup";

export const signUpValidationOne = Yup.object({
  name: Yup.string().min(3).required("Please enter name"),
  surname: Yup.string().min(3).required("Please enter surname"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  userName: Yup.string().min(3).required("Please enter username"),
  password: Yup.string().min(3).max(15).required("Please enter password"),
  businessName: Yup.string()
    .min(3)
    .max(15)
    .required("Please enter businessname"),
  whatsappcc: Yup.number().required("Please enter country code"),
  whatsappnum: Yup.number().required("Please enter whatsapp number"),
  isAgreed: Yup.boolean().oneOf([true], "You must accept the terms"),
});

export const signUpValidationTwo = Yup.object({
  country: Yup.string().required("Country is required"),
  postalcode: Yup.number().required("Postal code is required"),
  stateprovince: Yup.string().required("State/Province is required"),
  city: Yup.string().required("City is required"),
  description: Yup.string().required("Description is required"),
  short: Yup.string().required("Short description is required"),
  telephonecc: Yup.number().required("Telephone country code is required"),
  telephonenum: Yup.number().required("Telephone number is required"),
  isAgreed: Yup.boolean().oneOf([true], "You must accept the terms"),
});
