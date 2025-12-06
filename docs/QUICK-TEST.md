# 🧪 Quick Testing Guide

## Cara Cepat Test Config YAML

### 1. Test Config dengan Script

```bash
npm run test:config
```

Output yang diharapkan:

```
🧪 Testing YAML Configuration Loading
==================================================
📁 Reading config from: .../config/example-site.yaml

✅ Test 1: Site Config
  Name: My Awesome Website
  Description: A demo website built with Server-Driven UI

✅ Test 2: Theme Colors
  Primary: #0066cc
  Secondary: #666666
  Accent: #f59e0b

✅ Test 3: Pages
  Total pages: 1
  First page slug: /
  First page title: Home
  Sections count: 5

✅ Test 4: Sections Detail
  1. Type: hero            ID: home-hero
     └─ Buttons: 2
  2. Type: features        ID: features
     └─ Items: 3
  3. Type: stats           ID: none
     └─ Items: 4
  4. Type: team            ID: none
     └─ Members: 3
  5. Type: testimonials    ID: none
     └─ Items: 3

✅ Test 5: Validation
  ✅ All validations passed!

📊 Summary:
  Site: My Awesome Website
  Pages: 1
  Total Sections: 5

✅ Config loaded successfully!
```

### 2. Test di Browser

```bash
# Start development server
npm run dev

# Buka browser ke:
http://localhost:3000/test
```

### 3. Test dengan Config Berbeda

Edit file di `app/test/page.tsx` line 11:

```typescript
// Ganti dari:
const configPath = path.join(process.cwd(), 'config', 'example-site.yaml');

// Menjadi:
const configPath = path.join(process.cwd(), 'config', 'test-minimal.yaml');
```

## Checklist Testing

- [ ] Script test berhasil jalan (`npm run test:config`)
- [ ] Tidak ada error di console
- [ ] Site name muncul di header
- [ ] Theme colors diterapkan (cek CSS variables)
- [ ] Semua 5 sections ter-render
- [ ] Debug panel menampilkan JSON dengan benar
- [ ] Hero section memiliki 2 buttons
- [ ] Features section memiliki 3 items
- [ ] Stats section memiliki 4 items
- [ ] Team section memiliki 3 members
- [ ] Testimonials section memiliki 3 items

## Test Cases

### ✅ Test Case 1: Full Config (example-site.yaml)

- Config: `config/example-site.yaml`
- Expected: 5 sections, semua lengkap dengan content

### ✅ Test Case 2: Minimal Config (test-minimal.yaml)

- Config: `config/test-minimal.yaml`
- Expected: 2 sections (hero + features), minimal content

### 🎯 Test Case 3: Custom Config

Buat file baru `config/custom-test.yaml`:

```yaml
site:
  name: 'My Custom Test'
  theme:
    primary: '#ff0000'
pages:
  - slug: '/'
    sections:
      - type: hero
        props:
          title: 'Custom Hero'
```

## Troubleshooting

### ❌ Error: Cannot read config

**Solusi**: Pastikan file YAML ada di folder `config/`

### ❌ Error: Invalid YAML syntax

**Solusi**: Cek indentasi YAML (pakai spaces, bukan tabs)

### ❌ Sections tidak render

**Solusi**:

1. Cek debug panel apakah data ter-load
2. Pastikan component untuk section type tersebut ada
3. Lihat console browser untuk error details

### ❌ Theme tidak apply

**Solusi**: Periksa CSS variables di browser DevTools (Elements > Styles)
