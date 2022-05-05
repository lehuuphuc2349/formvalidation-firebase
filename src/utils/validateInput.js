export const validationInput = (typeErrorInput, errors) => {
  // Case fullname
  if (typeErrorInput === "fullname" && errors?.fullname?.type === "required")
    return "Please enter your fullname";
  if (typeErrorInput === "fullname" && errors?.fullname?.type === "minLength")
    return "Minimum number of characters is 6";
  if (typeErrorInput === "fullname" && errors?.fullname?.type === "maxLength")
    return "Maximum number of characters is 15";

  // Case username
  if (typeErrorInput === "username" && errors?.username?.type === "required")
    return "Please enter your username";
  if (typeErrorInput === "username" && errors?.username?.type === "minLength")
    return "Minimum number of characters is 6";
  if (typeErrorInput === "username" && errors?.username?.type === "maxLength")
    return "Maximum number of characters is 15";

  // Case Email
  if (typeErrorInput === "email" && errors?.email?.type === "required")
    return "Please enter your email";
  if (typeErrorInput === "email" && errors?.email?.type === "pattern")
    return "Your format email is incorrect";

  // Case Password
  if (typeErrorInput === "password" && errors?.password?.type === "required")
    return "Please enter your password";
  if (typeErrorInput === "password" && errors?.password?.type === "minLength")
    return "Minimum number of characters is 6";
  if (typeErrorInput === "password" && errors?.password?.type === "maxLength")
    return "Maximum number of characters is 15";
};
