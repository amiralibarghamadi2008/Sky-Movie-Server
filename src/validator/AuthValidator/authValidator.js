import v from "../config.js";

const sendSmsSchema = {
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      stringPattern: "شماره موبایل باید ۱۱ رقم بوده و با 09 شروع شود.",
    },
  },
  $$strict: true,
};

const verifySmsSchema = {
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      stringPattern: "شماره موبایل وارد شده نامعتبر است.",
    },
  },
  otpCode: {
    type: "string",
    min: 4,
    max: 6,
    messages: {
      stringMin: "کد تایید نباید کمتر از ۴ رقم باشد.",
      stringMax: "کد تایید نباید بیشتر از ۶ رقم باشد.",
    },
  },
  $$strict: true,
};

const signInSchema = {
  phoneNumber: {
    type: "string",
    pattern: /^09[0-9]{9}$/,
    messages: {
      stringPattern: "شماره موبایل وارد شده نامعتبر است.",
    },
  },
  otpCode: {
    type: "string",
    min: 4,
    max: 6,
  },
  firstName: {
    type: "string",
    trim: true,
    min: 2,
    max: 30,
    optional: true,
    messages: {
      stringMin: "نام کاربر حداقل باید ۲ کاراکتر باشد.",
      stringMax: "نام کاربر نمی‌تواند بیشتر از ۳۰ کاراکتر باشد.",
    },
  },
  $$strict: true,
};

export const validateSendSms = v.compile(sendSmsSchema);
export const validateVerifySms = v.compile(verifySmsSchema);
export const validateSignIn = v.compile(signInSchema);