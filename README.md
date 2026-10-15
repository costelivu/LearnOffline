# AlgoPath v2 — PWA offline pentru Android

## Publicare pe GitHub Pages

1. Dezarhivează `algopath-v2-github-pages.zip`.
2. Creează un repository **public** pe GitHub, de exemplu `algopath`.
3. Intră în repository → **Add file** → **Upload files** și încarcă **conținutul folderului** (nu folderul și nu ZIP-ul). `index.html` trebuie să fie în rădăcina repo-ului.
4. **Settings → Pages → Build and deployment → Deploy from a branch → main → / (root) → Save**.
5. După publicare deschide `https://UTILIZATOR.github.io/algopath/` în Chrome Android.
6. Instalează prin meniul Chrome, intră o dată online și testează în modul avion. La actualizări importante, fă backup înainte de a înlocui fișierele repo-ului.

## Cum imporți materiale noi

În **Setări → Import materiale JSON**, lipește un obiect, o listă de obiecte sau un pachet cu `items`; apoi **Previzualizează importul** și **Salvează**. Detectarea duplicatelor este bazată pe ID și text exact normalizat, nu garantat semantic. Pentru importuri voluminoase se afișează primele 100 de intrări în previzualizare, iar totalurile privesc pachetul complet.

Exemplu:

```json
{"schemaVersion":"2.0","packId":"my-java-pack","packVersion":1,"items":[{"id":"java-q-custom-001","version":1,"type":"quiz","title":"Exemplu HashMap","categories":["Java","Collections"],"difficulty":"easy","content":{"question":"Ce întoarce HashMap.get pentru o cheie absentă?","options":[{"id":"a","text":"null"},{"id":"b","text":"false"},{"id":"c","text":"aruncă mereu o excepție"}],"correctOptionId":"a","shortExplanation":"Returnează null.","detailedExplanation":"Pentru a distinge cheia absentă de o valoare null, folosește containsKey."}}]}
```

## Backup și restaurare

- **Export backup complet** salvează materialele importate, progresul, categoriile, istoricul și setările.
- **Combină backup** suprapune datele din backup cu cele existente când ID-urile coincid; pentru coliziuni sunt preferate datele din backup.
- **Înlocuiește tot** șterge datele utilizatorului prezente și le înlocuiește cu cele din fișier. Solicită confirmare.
- Colecția inițială (`content.json`) rămâne inclusă în aplicație, independent de backup.

## Arhitectură și offline

HTML/CSS/JS static + IndexedDB + Service Worker. Fără server sau dependențe externe; fișierele statice sunt păstrate în Cache Storage. Actualizarea se face prin schimbarea fișierelor de pe GitHub Pages și **modificarea identificatorului CACHE din `sw.js`**, pentru a descărca noile resurse. Datele locale din IndexedDB nu sunt șterse la actualizarea cache-ului.

## Limite cunoscute, importante

- Biblioteca conține **100 intrări algoritmi** pornite de la **20 de algoritmi de bază**, cu variante de studiu (nu 100 algoritmi distincți), plus **700 grile** pornite de la **235 concepte-fapt** cu reformulări. În total 800 intrări numerice solicitate, dar nu 800 subiecte independente. **Este o bibliotecă demonstrativă care are nevoie de extindere și revizuire editorială** înainte de pregătirea serioasă pentru interviuri.
- Pașii de execuție ai algoritmilor sunt descriptivi, nu un debugger, iar diagramele interactive și animațiile reale pentru arbori/grafuri nu sunt încă implementate.
- Nu există compilare Java în aplicație, nici editor de cod executabil.
- Vizualizarea SQL/Java nu folosește în prezent syntax highlighting lexical; codul are afișare monospace, numere de linie și setări de dimensiune, wrap și ecran complet.
- Nu există încă administrare completă (ștergerea/redenunirea/mutarea categoriilor pe item sau trasee editoriale personalizate). Poți crea categorii și importa materiale multicategorie.
- Nu s-au efectuat teste E2E reușite într-un browser real sau pe Android, deoarece browserul automatizat a returnat `ERR_BLOCKED_BY_ADMINISTRATOR` pentru serverul local și URL-uri de test. Sunt necesare teste manuale după publicare.

## Prompt pentru conținut nou fără duplicate

> Generează [N] materiale pentru AlgoPath v2, domeniul [Java/Spring/Hibernate/SQL/Algoritmi], subiectele [..], nivel [easy/medium/hard], în română. Folosește formatul JSON `schemaVersion=2.0`, `packId`, `packVersion`, `items`, conform exemplului din README. Pentru quiz, EXACT trei opțiuni și un singur `correctOptionId`, cu `shortExplanation` și `detailedExplanation`; pentru algoritm, `statement`, `input`, `output`, `hints`, `simpleSolution`, `optimalCode`, `explanation`, `complexity`, `steps`. Compară ID-ul, întrebarea și conceptele cu **manifestul exportat din Setări → Export manifest anti-duplicate**, pe care îl atașez. Nu crea reformulări care testează exact același fapt; validează JSON și verifică factual răspunsurile. Dacă manifestul lipsește, nu pretinde că ai verificat lipsa duplicatelor.

## Actualizare v2.1 – întrebări și afișare Java
- Codul Java este afișat cu indentare automată pe blocuri `{}`, instrucțiuni `;`, numere de linie, font ajustabil, wrap/scroll și ecran complet. Formatarea este pentru afișare; la expresii Java complexe, verifică și codul original dacă este necesar.
- Întrebările au `Sari peste` (nu marchează răspunsul), `Următoarea întrebare`, filtre `Toate`, `Doar nerăspunse`, `Ultimul răspuns greșit`, `Ultimul răspuns corect` în Bibliotecă și buton pentru începerea listei filtrate.
- La răspuns, progresul se salvează în IndexedDB; întrebările greșite pot fi repetate. Dacă o întrebare este ulterior rezolvată corect, nu mai apare în filtrul „Ultimul răspuns greșit”.
- `Setări → Resetarea progresului` permite resetarea unei categorii sau a întregului progres, cu confirmare. Materialele și favoritele sunt păstrate; istoricul accesării materialelor resetate este eliminat.
- Am mărit versiunea cache-ului Service Worker; după publicare, deschide aplicația conectat la internet și apoi redeschide-o pentru a activa noua versiune. Exportă un backup înainte de actualizare.
