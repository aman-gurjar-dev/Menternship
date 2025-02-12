const Loginvalidation = (Value) => {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (!Value.Email.trim()) {
    errors.Email = "Email should not be empty";
  } else if (!emailPattern.test(Value.Email)) {
    errors.Email = "Invalid email format";
  }

  if (!Value.Password.trim()) {
    errors.Password = "Password should not be empty";
  } else if (!passwordPattern.test(Value.Password)) {
    errors.Password =
      "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one digit";
  }

  return errors;
};

export default Loginvalidation;
