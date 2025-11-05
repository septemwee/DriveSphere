# Assignment 1: Backend (API Proxy Server)

ยินดีต้อนรับสู่ส่วน **Backend (API Server)** ของโพรเจกต์ **DriveSphere** นี่คือส่วนของระบบที่พัฒนาโดยใช้ **Express.js** ทำหน้าที่เป็น **Backend-for-Frontend (BFF)** หรือ **Proxy Server** สำหรับรับคำสั่งจาก Frontend และเชื่อมต่อกับ API ภายนอกอย่างปลอดภัย โดยจะจัดรูปแบบข้อมูลและซ่อน API Token เพื่อป้องกันการรั่วไหลของข้อมูลสำคัญ



## Features

* **API Proxy**  
  ทำหน้าที่เป็นเซิร์ฟเวอร์ตัวกลาง (BFF) ระหว่าง Frontend และ API ภายนอก โดยจะดึงข้อมูลและจัดรูปแบบก่อนส่งกลับไปให้ฝั่งผู้ใช้
* **Secure API Handling**  
  ใช้ Environment Variables เพื่อซ่อน Token และ URL ที่สำคัญ ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต
* **Lightweight Express Server**  
  ใช้เพียง Express.js และ CORS เพื่อให้บริการ API อย่างมีประสิทธิภาพ
* **Multiple Endpoints**  
  รองรับ API สำหรับ Config, Status, Logs และการสร้าง Log ใหม่



## Tech Stack

| ส่วน | เทคโนโลยี | รายละเอียด |
| :--- | :--- | :--- |
| **Backend** | Node.js | สภาพแวดล้อมสำหรับรัน JavaScript |
|  | Express.js | Framework หลักสำหรับสร้าง API Server |
|  | CORS | อนุญาตให้ Frontend ต่างโดเมนเรียก API ได้ |
|  | Dotenv | จัดการ Environment Variables |
| **Deployment** | Vercel | ใช้สำหรับ Deploy เป็น Serverless Function |
| **Version Control** | Git & GitHub | สำหรับจัดการเวอร์ชันของโค้ด |



## Structure

* **โฟลเดอร์:** `drone-server`  
* **หน้าที่:**  
  ทำหน้าที่เป็น Proxy API ระหว่าง Frontend กับ External API ภายนอก เพื่อซ่อน Token จริงและกรองข้อมูลที่จำเป็น  
* **ลิงก์ Deploy:**  
  [Backend Live (Vercel)](https://drive-sphere-server.vercel.app)  
* **คำอธิบายเพิ่มเติม:**  
  API นี้ถูกใช้โดย Frontend ในการดึง Config, Status และ Log ของโดรน  



## การติดตั้งและรันโปรเจกต์ (Backend)

1. **เข้าสู่โฟลเดอร์โปรเจกต์**
    ```bash
    cd drone-server
    ```

2. **ติดตั้ง Dependencies**
    ```bash
    npm install
    ```

3. **สร้างไฟล์ Environment Variables**
    สร้างไฟล์ชื่อ `.env` ภายในโฟลเดอร์ `drone-server` และเพิ่มค่าดังนี้ (ปรับตาม Environment ของคุณ)

    ```env
    # พอร์ตที่เซิร์ฟเวอร์นี้จะรัน
    PORT=3001

    # URL ของ API ภายนอกที่เก็บข้อมูล Config (Server1)
    CONFIG_URL=https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec 

    # URL ของ API ภายนอกที่เก็บข้อมูล Log (Server2)
    LOG_URL=https://app-tracking.pockethost.io/api/collections/drone_logs/records

    # API Token สำหรับใช้กับ LOG_URL (Server2)
    LOG_API_TOKEN=20250901efx
    ```

4. **รัน Server**
    ```bash
    node index.js
    ```
    เซิร์ฟเวอร์จะรันที่ `http://localhost:3001`



## API Endpoints

เซิร์ฟเวอร์นี้เปิดให้บริการ API สำหรับ Frontend ใช้งาน  
โดยมี Endpoint หลักดังนี้

### 1️. Get Drone Configuration
* **Method:** `GET`  
* **Endpoint:** `/configs/:droneId`  
* **การทำงาน:**  
  ดึงข้อมูล Config จาก `CONFIG_URL` แล้วค้นหาโดรนที่มี ID ตรงกัน ส่งกลับเฉพาะฟิลด์สำคัญ เช่น `drone_id`, `drone_name`, `light`, `country`, `weight`

### 2️. Get Drone Status
* **Method:** `GET`  
* **Endpoint:** `/status/:droneId`  
* **การทำงาน:**  
  ดึงข้อมูลจาก `CONFIG_URL` และส่งกลับเฉพาะสถานะ (`condition`) ของโดรน


### 3️. Get Paginated Logs
* **Method:** `GET`  
* **Endpoint:** `/logs-paginated/:droneId`  
* **Query Params:** `?page=1`  
* **การทำงาน:**  
  ดึงข้อมูล Log จาก `LOG_URL` (ใช้ Token) รองรับระบบแบ่งหน้า (`perPage = 12`)  และส่งกลับข้อมูลทั้งหมดจาก API (เช่น `items`, `page`, `totalPages`)


### 4️. Create New Log
* **Method:** `POST`  
* **Endpoint:** `/logs`  
* **Body:**  
  ```json
  {
    "drone_id": "3001",
    "drone_name": "Drone A",
    "country": "Thailand",
    "celsius": 29
  }
* **การทำงาน:**  
  รับข้อมูลจาก Frontend และส่งไปยัง LOG_URL (พร้อม Token) เพื่อบันทึก Log ใหม่

### 5. Get Logs
* **Method:** `GET`  
* **Endpoint:** `/logs/:droneId`  
* **Body:**  
  ```json
  {
    "drone_id": "3001",
    "drone_name": "Drone A",
    "country": "Thailand",
    "celsius": 29
  }
* **การทำงาน:**  
  คล้ายกับ /logs-paginated/:droneId แต่จะส่งกลับเฉพาะ Array items (ไม่มี totalPages)



## Deployment

โพรเจกต์นี้ถูก Deploy บน Vercel ในรูปแบบ Serverless Function สามารถเข้าถึงได้ที่ `https://drive-sphere-server.vercel.app`

