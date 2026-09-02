# استفاده از نسخه سبک و استیبل نود
FROM node:20-alpine

# ساخت پوشه کاری پروژه
WORKDIR /app

# کپی کردن فایل‌های پکیج برای کش شدن بهتر لایه‌ها
COPY package*.json ./

# نصب پکیج‌ها فقط برای پروداکشن
RUN npm install --production

# کپی کردن کل کدهای پروژه
COPY . .

# باز کردن پورت بک‌اند
EXPOSE 5000

# اجرای پروژه در محیط Production
CMD ["npm", "start"]