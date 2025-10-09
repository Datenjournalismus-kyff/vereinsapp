// Dieses Skript generiert die finale data.js aus allen Markdown-Dateien in den Ordnern 'news', 'appointments' und 'contacts'.

const fs = require('fs');
const path = require('path');

// --- Konfiguration ---
const NEWS_DIR = path.join(__dirname, 'news');
const APPOINTMENTS_DIR = path.join(__dirname, 'appointments');
// NEU: Konfiguration für den Kontakte-Ordner
const CONTACTS_DIR = path.join(__dirname, 'contacts');
const OUTPUT_FILE = path.join(__dirname, 'data.js');
// Entfernt: CONTACTS_DATA da sie nun dynamisch geladen werden


// --- Hilfsfunktionen ---

/**
 * Eine einfache, manuelle Konvertierung von Markdown zu HTML.
 * @param {string} markdownText - Der reine Markdown-Text.
 * @returns {string} - Der konvertierte HTML-Text.
 */
function simpleMarkdownToHtml(markdownText) {
    let html = markdownText.trim();

    // Konvertiere **Text** zu <strong>Text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Konvertiere *Text* oder _Text_ zu <em>Text</em>
    html = html.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');

    // Ersetze doppelte Zeilenumbrüche (\n\n) durch </p><p> für Absätze
    html = html.replace(/\n\n/g, '</p><p>');

    // Umhülle den gesamten Inhalt mit dem ersten Absatz-Tag
    return `<p>${html}</p>`;
}

/**
 * Liest und verarbeitet Markdown-Dateien aus einem bestimmten Verzeichnis.
 * @param {string} directory - Der Pfad zum Verzeichnis (news oder appointments).
 * @param {Function} processor - Eine Funktion, die Dateinamen und Inhalt verarbeitet.
 * @returns {Array} - Das verarbeitete Daten-Array.
 */
function processMarkdownFiles(directory, processor) {
    if (!fs.existsSync(directory)) {
        console.warn(`WARNUNG: Der Ordner ${directory} wurde nicht gefunden.`);
        return [];
    }

    const dataArray = [];
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.md'));

    // Sortiere die Dateien absteigend nach Dateinamen (neueste/aktuellste zuerst)
    // Bei Kontakten ist die Sortierung weniger wichtig, aber wir behalten sie.
    files.sort().reverse();

    for (const file of files) {
        const filePath = path.join(directory, file);
        const content = fs.readFileSync(filePath, 'utf8');

        const item = processor(file, content);
        dataArray.push(item);

        // Anzeige des verarbeiteten Titels/Datums/Namens
        console.log(`- Verarbeitet: ${item.title || item.date || item.name}`);
    }
    return dataArray;
}

// --- Prozessorfunktionen ---

function newsProcessor(file, content) {
    // Dateinamen-Schema: YYYYMMDD-titel-der-neuigkeit.md
    const parts = file.replace('.md', '').split('-');

    let title = 'Unbekannte Neuigkeit';
    let date = 'Unbekanntes Datum';

    if (parts.length >= 2) {
        const datePart = parts[0];
        const titleParts = parts.slice(1);

        const year = datePart.substring(0, 4);
        const month = datePart.substring(4, 6);
        const day = datePart.substring(6, 8);
        date = `${day}.${month}.${year}`;

        title = titleParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ').replace(/-/g, ' ');
    }

    return {
        id: file,
        date: date,
        title: title,
        contentHtml: simpleMarkdownToHtml(content)
    };
}

function appointmentsProcessor(file, content) {
    // Dateinamen-Schema: YYYYMMDD-HHMM-titel.md
    const parts = file.replace('.md', '').split('-');

    let title = 'Unbekannter Termin';
    let date = 'Unbekanntes Datum';
    let time = '';

    if (parts.length >= 3) {
        const datePart = parts[0];
        const timePart = parts[1];
        const titleParts = parts.slice(2);

        const year = datePart.substring(0, 4);
        const month = datePart.substring(4, 6);
        const day = datePart.substring(6, 8);
        date = `${day}.${month}.${year}`;

        const hour = timePart.substring(0, 2);
        const minute = timePart.substring(2, 4);
        time = `${hour}:${minute} Uhr`;

        title = titleParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ').replace(/-/g, ' ');
    }

    // Inhalt (Location)
    const location = content.trim();

    return {
        id: file,
        date: date,
        time: time,
        title: title,
        location: location
    };
}

// NEUE Prozessorfunktion für Kontakte
function contactsProcessor(file, content) {
    // Erwartet, dass der Inhalt der Markdown-Datei im Format "Name\nRole\nContact" ist.
    // KORREKTUR: Robusteres Splitten, um alle gängigen Zeilenumbrüche zu behandeln und leere Zeilen zu ignorieren.
    const lines = content.trim().split(/[\r\n]+/).map(line => line.trim()).filter(line => line.length > 0);

    // Der Dateiname wird als ID verwendet.
    // Die Daten werden in dieser Reihenfolge erwartet:
    // lines[0] = Name
    // lines[1] = Rolle
    // lines[2] = Kontakt (E-Mail)
    const name = lines[0] || file.replace('.md', '');
    const role = lines[1] || 'Keine Rolle angegeben';
    const contact = lines[2] || 'Kein Kontakt angegeben';

    return {
        id: file,
        name: name,
        role: role,
        contact: contact
    };
}


/**
 * Liest alle Datenquellen und kombiniert sie in einer einzigen data.js.
 */
function generateAllData() {
    console.log('Starte Generierung der kombinierten Daten (data.js)...');

    const newsData = processMarkdownFiles(NEWS_DIR, newsProcessor);
    const appointmentsData = processMarkdownFiles(APPOINTMENTS_DIR, appointmentsProcessor);
    // NEU: Kontakte dynamisch laden
    const contactsData = processMarkdownFiles(CONTACTS_DIR, contactsProcessor);

    const combinedData = {
        news: newsData,
        appointments: appointmentsData,
        contacts: contactsData
    };

    // Erzeuge den finalen JavaScript-Code
    const jsContent = `var DATA_STORE = ${JSON.stringify(combinedData, null, 2)};\n`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log(`Erfolgreich kombinierte Daten in ${OUTPUT_FILE} geschrieben.`);
    console.log(`Daten: ${newsData.length} News, ${appointmentsData.length} Termine, ${contactsData.length} Kontakte.`);
}

generateAllData();

