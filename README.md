# YDS + AUZEF + Uluslararası İlişkiler Teorileri — v7 temiz paket

## Kurulum
Bu ZIP, GitHub Pages'e doğrudan yüklenebilecek şekilde hazırlanmıştır.
ZIP'i açtığınızda `index.html` ve JavaScript dosyaları ilk seviyede görünür.
GitHub deposunun ana dizinine bu dosyaların tamamını yükleyin; `index.html` bir alt klasörde kalmamalıdır.

GitHub: Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

## İçerik
- YDS kelime bankası ve deneme: `words.js`, `index.html`
- AUZEF soru bankası: `auzef.js`
- Uluslararası İlişkiler Teorileri modülü: `theory-data.js`, `theory.js`
- PWA/çevrimdışı önbellek: `manifest.json`, `sw.js`
- Kaynak Word belgeleri: `kaynaklar/`

## Önemli
Mevcut çalışan GitHub deponuzun üzerine yüklemeyin. Yeni ve ayrı bir depo kullanın.
Uygulama statik dosyalardan oluşur; sunucu veya API anahtarı gerektirmez.
İlerleme bilgileri kullanılan tarayıcıda localStorage ile saklanır.
