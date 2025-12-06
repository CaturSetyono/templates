# Testing Guide - Web Builder

## 📋 Overview

Panduan ini menjelaskan cara menjalankan testing untuk website yang dikonfigurasi menggunakan file YAML.

## 🚀 Quick Start

### 1. Jalankan Development Server

```bash
npm run dev
```

### 2. Akses Test Page

Buka browser dan kunjungi:

```
http://localhost:3000/test
```

## 📂 File Testing yang Tersedia

### `app/test/page.tsx`

Halaman testing utama yang:

- ✅ Membaca config dari `config/example-site.yaml`
- ✅ Merender semua sections yang didefinisikan
- ✅ Menampilkan debug panel dengan informasi lengkap
- ✅ Memperlihatkan struktur data site & page config

## 🧪 Apa yang Akan Terlihat di Test Page?

1. **Header Debug** - Menampilkan nama site dari config
2. **Rendered Sections** - Semua komponen dari YAML akan di-render:
   - Hero Section
   - Features Section
   - Stats Section
   - Team Section
   - Testimonials Section
3. **Debug Panel** - Informasi teknis:
   - Site configuration lengkap
   - List semua sections dengan tipe dan ID
   - Full page config dalam format JSON

## 🎨 Sections yang Ditest

Berdasarkan `example-site.yaml`, sections berikut akan di-render:

| Section      | Type           | ID          | Description                       |
| ------------ | -------------- | ----------- | --------------------------------- |
| Hero         | `hero`         | `home-hero` | Welcome banner dengan CTA buttons |
| Features     | `features`     | `features`  | Grid 3 kolom fitur-fitur utama    |
| Stats        | `stats`        | -           | Statistik dengan animasi          |
| Team         | `team`         | -           | Grid team members 3 kolom         |
| Testimonials | `testimonials` | -           | Customer testimonials             |

## 🔍 Cara Testing Manual

### Test 1: Verifikasi Config Loading

```bash
# Lihat console di browser (F12)
# Pastikan tidak ada error saat load YAML
```

### Test 2: Verifikasi Theme

Cek di debug panel apakah theme colors sudah sesuai:

```yaml
primary: '#0066cc'
secondary: '#666666'
accent: '#f59e0b'
```

### Test 3: Verifikasi Sections Count

Di debug panel, hitung jumlah sections:

- Harus ada **5 sections** (Hero, Features, Stats, Team, Testimonials)

### Test 4: Verifikasi Props

Klik expand di debug panel dan cek:

- Hero title: "Welcome to Our Website"
- Features: 3 items
- Stats: 4 items
- Team: 3 members
- Testimonials: 3 items

## 🧩 Modifikasi Config untuk Testing

Edit `config/example-site.yaml` untuk test berbagai scenario:

### Test Case 1: Ubah Theme

```yaml
site:
  theme:
    primary: '#ff0000' # Red theme
    secondary: '#00ff00'
    accent: '#0000ff'
```

### Test Case 2: Tambah Section Baru

```yaml
- type: grid
  props:
    title: 'Test Grid Section'
    columns: 2
```

### Test Case 3: Ubah Layout

```yaml
- type: features
  props:
    columns: 2 # Ubah dari 3 ke 2 kolom
```

## 🐛 Troubleshooting

### Error: Cannot find module 'js-yaml'

```bash
npm install js-yaml @types/js-yaml
```

### Error: YAML file not found

Pastikan file `config/example-site.yaml` ada dan path-nya benar.

### Sections tidak muncul

Cek di debug panel apakah `sections` array terisi. Jika kosong, ada masalah di parsing YAML.

## 📊 Expected Results

Jika semua berjalan dengan baik, Anda akan melihat:

- ✅ Header biru dengan nama site
- ✅ Hero section dengan gradient background
- ✅ Features grid dengan 3 kartu
- ✅ Stats section dengan angka
- ✅ Team section dengan 3 foto placeholder
- ✅ Testimonials section dengan 3 review
- ✅ Debug panel di bawah dengan JSON lengkap

## 🎯 Next Steps

Setelah testing dasar berhasil:

1. ✏️ Edit `example-site.yaml` untuk custom content
2. 🎨 Test dengan theme colors berbeda
3. 📱 Test responsive di mobile view
4. ➕ Tambah sections baru
5. 🔄 Test dengan multiple pages

## 📝 Notes

- Config file dibaca saat **build time** di Next.js 14
- Untuk production, gunakan Edge Config atau CMS
- Debug panel sebaiknya di-disable di production
