import * as Yup from "yup";

export const userInforSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter First Name"),
    lastName: Yup.string().min(2).max(25).required("Please enter Last Name"),

    email: Yup.string().email().required("Please enter your email"),
}) 