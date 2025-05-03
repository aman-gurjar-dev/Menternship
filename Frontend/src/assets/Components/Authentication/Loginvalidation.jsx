const Loginvalidation = (values) => {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ✅ Ensure email exists before calling .trim()
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Invalid email format";
  }

  // ✅ Ensure password exists before calling .trim()
  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

export default Loginvalidation;
