
# Ticket System

 Aplikasi ini bertujuan untuk menyediakan sistem tiket yang memungkinkan pengguna untuk mengajukan permintaan, keluhan, atau masalah teknis terkait dengan aplikasi. Tim teknis dapat mengelola tiket yang masuk dan memantau serta menyelesaikan masalah dengan lebih efisien

## Features

- Pengguna dapat mengajukan tiket untuk permintaan, keluhan, atau masalah teknis melalui aplikasi.
- Setiap tiket akan diberikan nomor unik sebagai identifikasi.
- Tim teknis dapat melihat daftar tiket yang masuk dan mengelola setiap permintaan dengan mengubah status tiket (admin).
- Status tiket dapat berupa "menunggu tindakan", "sedang dalam proses", "sedang direspon", atau "telah selesai".
- Pengguna dapat melacak status permintaan mereka dan mendapatkan pembaruan dari tim teknis melalui aplikasi.
- Prioritas tiket diterapkan untuk memberikan perhatian lebih cepat kepada permintaan mendesak atau masalah kritis dengan prioritas ['Critical', 'High', 'Medium', 'Low']
- Terdapat feature search dan pagination yang memudahkan teknisi untuk menemukan tiket sesuai dengan kriteria tertentu.


## Tech Stack

**Backend:** Express.js, NodeJs

**Authentication:** JSON Web Tokens (JWT)

**Database:** MongoDB

**Unit Test:** Jest

**Logger:** Morgan, Winston



## Installation

1. Clone respositori ini:

```bash
  git clone https://github.com/hikio-17/ticket-system.git
```
2. Pindah ke direktori proyek:

```bash
  cd ticket-system
```
3. Instal dependencies:

```bash
  npm install
```
4. Konfigurasi
- Salin file .env.example ke .env dan atur konfigurasi yang diperlukan, seperti koneksi database dan kunci rahasia JWT.

5. Jalankan aplikasi:

```bash
  npm run start
```

Secara default aplikasi akan dijalankan di `http://localhost:5000`
## Documentation Api

Dokumentasi API lengkap dapat ditemukan di [tautan Postman berikut](https://documenter.getpostman.com/view/20149138/2s93sW9b3i)

API ini menggunakan format permintaan dan respons JSON. Silakan merujuk ke dokumentasi API untuk mempelajari lebih lanjut tentang setiap endpoint, parameter yang diperlukan, dan contoh permintaan dan respons yang diharapkan.



## Authors

- [@hikio-17](https://hikio-17.github.io/)

