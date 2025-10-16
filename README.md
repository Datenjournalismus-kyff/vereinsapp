# Vereins-Info-Zentrale

Dies ist eine einfache, dateibasierte Informationszentrale für einen Verein oder eine kleine Organisation. Sie zeigt Neuigkeiten, Termine und Ansprechpartner auf einer einzigen, übersichtlichen Seite an.

## Wie es funktioniert

Die App ist eine statische Webseite, die ihre Inhalte aus Markdown-Dateien (`.md`) generiert, die in den folgenden Ordnern liegen:

- `news/`
- `appointments/`
- `contacts/`

Ein Node.js-Skript (`generate_data.js`) liest diese Dateien, wandelt sie in ein strukturiertes Datenformat um und speichert sie in `data.js`. Diese Datei wird dann von der `index.html` verwendet, um die Inhalte dynamisch darzustellen.

## Inhalte bearbeiten

Um Inhalte hinzuzufügen oder zu ändern, müssen Sie nur die Markdown-Dateien in den entsprechenden Ordnern bearbeiten, hinzufügen oder löschen.

### Neuigkeiten

- **Ordner:** `news/`
- **Dateiname:** `JJJJMMTT-titel-der-neuigkeit.md`
- **Inhalt:** Der Text der Neuigkeit im Markdown-Format.

**Beispiel:** `20251015-neue-webseite-live.md`

### Termine

- **Ordner:** `appointments/`
- **Dateiname:** `JJJJMMTT-HHMM-titel-des-termins.md`
- **Inhalt:** Der Ort des Termins.

**Beispiel:** `20251120-1900-vorstandssitzung.md`

### Kontakte

- **Ordner:** `contacts/`
- **Dateiname:** `Nachname-Vorname.md`
- **Inhalt:**
  - Zeile 1: Vollständiger Name
  - Zeile 2: Rolle oder Funktion
  - Zeile 3: E-Mail-Adresse

**Beispiel:** `Mustermann-Max.md`

## Lokale Entwicklung

Um die App lokal zu testen, benötigen Sie Node.js und npm.

1. **Abhängigkeiten installieren:**
   ```bash
   npm install
   ```

2. **Daten generieren:**
   Nachdem Sie Änderungen an den Markdown-Dateien vorgenommen haben, führen Sie diesen Befehl aus, um die `data.js` zu aktualisieren:
   ```bash
   npm run generate
   ```

3. **Lokalen Server starten:**
   Dieser Befehl startet einen einfachen Webserver, und Sie können die App in Ihrem Browser unter `http://localhost:8080` aufrufen.
   ```bash
   npm run start
   ```