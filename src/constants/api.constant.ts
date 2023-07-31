export const EMAIL_STATUS = {
  valid: {
    valid: true,
    code_message: "VALID_EMAIL",
    message: "Email is valid",
  },
  invalid: {
    valid: false,
    code_message: "INVALID_EMAIL",
    message: "Email is not well formated",
  },
  disposable: {
    valid: false,
    code_message: "BLACKLISTED_EMAIL_DOMAIN",
    message: "Email domain is in the blacklist",
  },
};

export const ERRORS = {
  profile: {
    message: "User invalid or non-existent Api Key",
    status: 401,
  },
  requests: {
    message: "API Rate Limit Exceeded",
    status: 429,
  },
  email: {
    message: "The query email is required",
    status: 400,
  },
};

export const EMAIL_REGEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
