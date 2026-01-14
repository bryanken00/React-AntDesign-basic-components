export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]+$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphabetic: /^[a-zA-Z]+$/,
  numeric: /^\d+$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  creditCard: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
  passwordSmallLetter: /[a-z]/,
  passwordCapitalLetter: /[A-Z]/,
  passwordNumber: /[0-9]/,
  passwordSpecialChar: /[!@#$%^&)(+=.-]/,
  passwordLength: /.{8,}/,
};

export const validationRules = {
  required: (msg = "This field is required") => ({
    required: true,
    message: msg,
  }),

  email: (msg = "Please enter a valid email") => ({
    type: "email",
    message: msg,
  }),

  url: (msg = "Please enter a valid URL") => ({ type: "url", message: msg }),

  minLength: (min, msg) => ({
    min,
    message: msg || `Minimum ${min} characters required`,
  }),

  maxLength: (max, msg) => ({
    max,
    message: msg || `Maximum ${max} characters allowed`,
  }),

  pattern: (regex, msg) => ({ pattern: regex, message: msg }),

  phone: (msg = "Please enter a valid phone number") => ({
    pattern: patterns.phone,
    message: msg,
  }),

  strongPassword: (min = 8) => ({
    validator: (_, value) => {
      if (!value)
        return Promise.reject(new Error("Please input your password!"));

      const errors = [];
      if (!/[a-z]/.test(value)) errors.push("At least 1 lowercase letter");
      if (!/[A-Z]/.test(value)) errors.push("At least 1 uppercase letter");
      if (!/[0-9]/.test(value)) errors.push("At least 1 digit");
      if (!/[!@#$%^&)(+=.-]/.test(value))
        errors.push("At least 1 special character (!@#$%^&)(+=.-)");
      if (value.length < min) errors.push(`At least ${min} characters`);

      if (errors.length === 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(new Error(errors.join(", ")));
      }
    },
  }),

  numberRange: (min, max, msg) => ({
    type: "number",
    min,
    max,
    message: msg || `Value must be between ${min} and ${max}`,
  }),

  confirmPassword: (getFieldValue, msg = "Passwords do not match") => ({
    validator: (_, value) =>
      !value || getFieldValue("password") === value
        ? Promise.resolve()
        : Promise.reject(new Error(msg)),
  }),

  custom: (fn) => ({ validator: fn }),

  noWhitespace: (msg = "Whitespace is not allowed") => ({
    whitespace: true,
    message: msg,
  }),
};

export const combineRules = (...rules) => rules.filter(Boolean);
