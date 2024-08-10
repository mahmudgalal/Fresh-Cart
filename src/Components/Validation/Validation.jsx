import * as Yup from "yup";


export let validationSchemaRegister = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min length is 3")
      .max(10, "Max length is 10")
      .required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().matches(/^[A-Z]\w{8,32}$/ ,  "Password must start with capital character and from 8 to 32 ex: (Ahmed123)").required("Password is Required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")] , "passwords don't match").required("Repassword is required"),
    phone: Yup.string().matches(/^(002|\+2)?01[0125][0-9]{8}$/ , "Enter Egyptian number").required("Phone is Required")
  });


  export let validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z]\w{8,32}$/,
        "Password must start with capital character and from 8 to 32 ex: (Ahmed123)"
      )
      .required("Password is Required"),
  });