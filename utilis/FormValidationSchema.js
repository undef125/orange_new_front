import * as Yup from "yup";

export const signUpValidationOne = Yup.object({
  name: Yup.string().min(3).required("Please enter name"),
  surname: Yup.string().min(3).required("Please enter surname"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  userName: Yup.string().min(3).required("Please enter username").matches(/^[a-zA-Z0-9]+$/, 'Username should not contain special characters'),
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

export const loginValidationSchema = Yup.object({
  emailorusername: Yup.string().required("Email/Username is required"),
  password: Yup.string().required("Please enter password"),
});

export const categoriesValidationSchema = Yup.object({
  categoryName: Yup.string().required("Category name is required"),
  categoryImage: Yup.string().required("Category image is required"),
  categoryDescription: Yup.string(),
});

export const productsValidationSchema = Yup.object({
  images: Yup.array().of(Yup.string()).required("Please provide images for your product"),
  name: Yup.string().required("Name of product is required"),
  description: Yup.string().required("Product description is required"),
  price: Yup.number().required("Product price is required"),
  discountPrice: Yup.number(),
  categoryId: Yup.string().required("Please select any category"),
  model: Yup.string(),
  servesFor: Yup.string(),
  howToUse: Yup.string(),
  sizes: Yup.string(),
  buttonText: Yup.string(),
  checkoutText: Yup.string(),
});
