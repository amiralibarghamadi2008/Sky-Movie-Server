import Validator from "fastest-validator";

const userValidator = new Validator();

const userValidationSchema = {
    $$strict: false,
    firstName: {
        type: "string",
        optional: true,
        max: 30,
        trim: true,
        messages: {
            stringMin: "نام باید حداقل ۳ کاراکتر باشد",
            stringMax: "نام باید حداکثر ۳۰ کاراکتر باشد",
        }
    },
    phoneNumber: {
        type: "string",
        pattern: /^09[0-9]{9}$/,
        trim: true,
        required: true,
        messages: {
            required: "شماره تلفن الزامی است",
            stringPattern: "شماره تلفن باید با 09 شروع شود و 11 رقم باشد",
        }
    },
    userCode: {
        type: "string",
        optional: true,
    }
};

const validateUser = userValidator.compile(userValidationSchema);

export const validateUserData = (data) => {
    const result = validateUser(data);
    
    if (result !== true) {
        return {
            isValid: false,
            errors: result.map(err => ({
                field: err.field,
                message: err.message
            }))
        };
    }
    
    return { isValid: true };
};

export const checkUser = (data) => {
    return userValidator.validate(data, userValidationSchema);
};