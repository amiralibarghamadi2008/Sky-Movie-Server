import "dotenv/config";
import axios from 'axios';

export default async function sendSMSWithPattern (userPhoneNumber, generatedCode) {
  try {
    const url = 'https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber';

    const payload = {
      username: process.env.SMS_USERNAME,
      password: process.env.SMS_PASSWORD,
      to: userPhoneNumber,
      text: String(generatedCode), 
      bodyId: Number(process.env.SMS_BODY_ID)
    };


    const response = await axios.post(url, payload);

    if (response.data && response.data.RetStatus === 1) {
      console.log(`💥 پیامک با موفقیت ارسال شد! شناسه تراکنش: ${response.data.Value}`);
      return response.data.Value; 
    } else {
      console.error("خطا در پاسخ ملی پیامک:", response.data);
      throw new Error(response.data.StrRetStatus || 'خطای ناشناخته از وب‌سرویس');
    }

  } catch (error) {
    console.error('خطا در سرویس ارسال پیامک الگو:', error.message);
    throw error;
  }
};