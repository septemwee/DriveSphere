# DriveSphere Drone Log Project

ยินดีต้อนรับสู่โพรเจกต์ **DriveSphere**!  
นี่คือโพรเจกต์ **Full-Stack**  
สำหรับบันทึกและตรวจสอบข้อมูล Log (เช่น อุณหภูมิ)  
จากโดรน

โพรเจกต์นี้ถูกสร้างขึ้นเพื่อสาธิตการทำงานร่วมกันระหว่าง  
**Frontend** (Next.js) ที่ทันสมัย  
และ **Backend** (Express.js)  
ที่ทำหน้าที่เป็น Proxy API  
เพื่อเชื่อมต่อกับบริการภายนอกอย่างปลอดภัย

---

## Features

* **Frontend (ส่วนหน้าเว็บ):**
    * **Dynamic Log Table:**  
      แสดงผล Log ของโดรนในรูปแบบตารางที่อ่านง่าย
    * **Pagination:**  
      ระบบแบ่งหน้าที่มีประสิทธิภาพ เพื่อรองรับข้อมูลจำนวนมาก
    * **Log Submission Form:**  
      ฟอร์มสำหรับส่งข้อมูลอุณหภูมิใหม่
    * **Responsive Design:**  
      ออกแบบด้วย Tailwind CSS เพื่อรองรับการใช้งานบนมือถือและเดสก์ท็อป

* **Backend (ส่วนเซิร์ฟเวอร์):**
    * **API Proxy:**  
      ทำหน้าที่เป็นเซิร์ฟเวอร์ตัวกลาง (BFF) รับคำสั่งจาก Frontend  
      และไปดึงข้อมูลจาก API ภายนอกอีกที
    * **Secure:**  
      ซ่อน API Token และ URL ของ API ภายนอกไว้ที่เซิร์ฟเวอร์  
      ป้องกันไม่ให้ข้อมูลสำคัญรั่วไหลไปที่ฝั่ง Client
    * **Multiple Endpoints:**  
      ให้บริการ API สำหรับดึงข้อมูล Config, Status, และ Logs  
      รวมถึงการสร้าง Log ใหม่

---

## Tech Stack

| ส่วน | เทคโนโลยี | รายละเอียด |
| :--- | :--- | :--- |
| **Frontend** | React (Next.js) | Framework หลักสำหรับสร้าง UI |
| | TypeScript | เพิ่มความเสถียรให้โค้ด JavaScript |
| | Tailwind CSS | สำหรับการออกแบบ UI สมัยใหม่ |
| **Backend** | Node.js | สภาพแวดล้อมสำหรับรัน JavaScript |
| | Express.js | Framework หลักสำหรับสร้าง API Server |
| | `node-fetch` | สำหรับยิงไปหา API ภายนอก |
| | `dotenv` | จัดการ Environment Variables |
| **Deployment** | Vercel | แพลตฟอร์มสำหรับ Deploy ทั้ง Frontend และ Backend |
| **Code** | Git & GitHub | สำหรับการจัดการเวอร์ชัน (Monorepo/Submodule) |

---

## Structure

โพรเจกต์นี้ถูกออกแบบในโครงสร้างแบบ **Monorepo**  
(หรือโพรเจกต์ที่เชื่อมต่อกัน)  
โดยแบ่งการทำงานออกเป็น 2 ส่วนหลัก  
ซึ่งถูก deploy แยกกันบน Vercel:

### 1. [Assignment #1: Backend (Express API)](./drone-server/README.md)

* **โฟลเดอร์:** `drone-server` 
* **หน้าที่:**  
  เซิร์ฟเวอร์ API ที่สร้างด้วย Express.js ทำหน้าที่เป็น  
  'Backend-for-Frontend' (BFF)  
  รับคำสั่งจาก Frontend, ซ่อน API Token ที่แท้จริง,  
  และไปดึงข้อมูลจาก External API ภายนอก  
* **ลิงก์ Deploy:**  
  [**Backend Live (Vercel)**](https://drive-sphere-server.vercel.app)  
* **คำอธิบายเพิ่มเติม:**  
  [ดู API Endpoints และวิธีรันใน Readme ของ Assignment #1](./drone-server/README.md)


### 2. [Assignment #2: Frontend (Next.js App)](./drone-web/README.md)

* **โฟลเดอร์:** `drone-web`
* **หน้าที่:**  
  ส่วนติดต่อผู้ใช้ (UI) ที่สร้างด้วย Next.js และ Tailwind CSS  
  ทำหน้าที่แสดงผลข้อมูลที่สวยงามและใช้งานง่าย  
  ผู้ใช้สามารถดูตาราง Log ที่มีการแบ่งหน้า  
  และส่งข้อมูลใหม่ผ่านฟอร์ม  
* **ลิงก์ Deploy:**  
  [**Frontend Live (Vercel)**](https://drive-sphere-web.vercel.app)  
* **คำอธิบายเพิ่มเติม:**  
  [ดูวิธีรัน Frontend ใน Readme ของ Assignment #2](./drone-web/README.md)

---

## Deployment

โพรเจกต์นี้ถูก Deploy แยกออกเป็น 2 ส่วนบน **Vercel** ดังนี้:

| ส่วน | URL | รายละเอียด |
|------|-----|-------------|
|  **Frontend (Web App)** | [https://drive-sphere-web.vercel.app](https://drive-sphere-web.vercel.app) | เว็บแอป Next.js สำหรับดูบันทึกโดรน |
|  **Backend (API Server)** | [https://drive-sphere-server.vercel.app](https://drive-sphere-server.vercel.app) | Express.js API สำหรับเชื่อมต่อกับระบบภายนอก |

---

## หมายเหตุ

* Backend ใช้ **Express + Node.js** ที่ deploy บน Vercel แบบ Serverless Function  
* Frontend ใช้ **Next.js 15 + TypeScript** และเชื่อมต่อกับ Backend ผ่านตัวแปร `NEXT_PUBLIC_API_URL`  
* โครงสร้างทั้งคู่สามารถรันแยกกันได้ในเครื่อง (localhost)  
  หรือเชื่อมต่อกันบน Production environment ผ่าน Vercel  
