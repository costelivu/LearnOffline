# AlgoPath – aplicație PWA Android (offline)

## Pornire pe calculator

În directorul aplicației rulează `python -m http.server 8080`, apoi deschide `http://localhost:8080/`. Nu deschide `index.html` direct ca fișier pentru testarea PWA.

## Instalare pe Android

Publică **toate fișierele**, păstrând structura, pe un hosting static **HTTPS** (de exemplu GitHub Pages sau Netlify). Deschide adresa în Chrome pe Android, așteaptă prima încărcare, apoi folosește meniul browserului → `Instalează aplicația` / `Adaugă pe ecranul principal`. După prima încărcare online, verifică funcționarea în modul avion. Nu există server sau cont pentru a utiliza aplicația după instalare.

## Import de lecții de aici

Cere o lecție în *format AlgoPath JSON*, copiază întregul obiect JSON, deschide `Adaugă exerciții`, lipește și apasă `Importă din text`. Sau transferă un fișier `.json` pe Android și importă-l cu selectorul de fișiere. Acceptă și un array JSON cu mai multe lecții. Folosește „Copiază promptul” pentru a genera exerciții noi într-un format compatibil.

## Date, backup și limitări

Progresul și exercițiile adăugate sunt salvate local cu `localStorage`. Poți exporta un backup și restaura. Ștergerea datelor browserului poate elimina progresul și lecțiile importate; exportă periodic backup. Aplicația afișează și explică cod Java, dar **nu îl compilează/execută pe telefon**. Cache-ul PWA poate fi șters de Android/browser în situații de lipsă de spațiu; pentru zbor testează modul avion înainte să pleci. La actualizarea fișierelor, schimbă versiunea `CACHE` din sw.js.

## Fișiere

`index.html`, `styles.css`, `app.js`, `lessons.json`, `sw.js`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`.
