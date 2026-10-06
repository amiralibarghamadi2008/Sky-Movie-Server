import v from "../config.js";

const changeRoleSchema = {
  role: {
    type: "enum",
    values: ["ADMIN", "USER"],
    messages: {
      enumValue: "نقش کاربر فقط می‌تواند 'ADMIN' یا 'USER' باشد.",
    },
  },
  $$strict: true,
};

const banUserSchema = {
  isBanned: {
    type: "boolean",
    convert: true,
    messages: {
      boolean: "وضعیت مسدودسازی باید یک مقدار بولین (true یا false) باشد.",
    },
  },
  $$strict: true,
};

export const validateChangeRole = v.compile(changeRoleSchema);
export const validateBanUser = v.compile(banUserSchema);
