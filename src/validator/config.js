import Validator from "fastest-validator";

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    required: "فیلد '{field}' الزامی است و باید ارسال شود.",
    string: "فیلد '{field}' باید از نوع متنی (String) باشد.",
    stringEmpty: "فیلد '{field}' نباید خالی ارسال شود.",
    stringMin: "طول فیلد '{field}' نباید کمتر از {expected} کاراکتر باشد.",
    stringMax: "طول فیلد '{field}' نباید بیشتر از {expected} کاراکتر باشد.",
    stringPattern: "فرمت وارد شده برای '{field}' نامعتبر است.",
    number: "فیلد '{field}' باید یک عدد معتبر باشد.",
    numberMin: "مقدار فیلد '{field}' نباید کمتر از {expected} باشد.",
    numberMax: "مقدار فیلد '{field}' نباید بیشتر از {expected} باشد.",
    numberInteger: "مقدار فیلد '{field}' باید یک عدد صحیح باشد.",
    numberPositive: "مقدار فیلد '{field}' باید یک عدد مثبت باشد.",
    array: "فیلد '{field}' باید یک آرایه باشد.",
    arrayEmpty: "آرایه '{field}' نباید خالی باشد.",
    enumValue:
      "مقدار '{actual}' برای '{field}' مجاز نیست. مقادیر معتبر: {expected}",
    boolean: "فیلد '{field}' باید مقدار بولین (true یا false) باشد.",
    url: "فیلد '{field}' باید یک آدرس اینترنتی (URL) معتبر باشد.",
  },
});

v.add("objectId", {
  type: "string",
  pattern: /^[0-9a-fA-F]{24}$/,
  messages: {
    stringPattern: "شناسه ارسالی برای '{field}' یک ObjectId معتبر مانگوس نیست.",
  },
});

export default v;
