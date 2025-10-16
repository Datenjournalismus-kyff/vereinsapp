// KORREKTUR DES FEHLERS: Verwende 'var' oder stelle sicher, dass DATA_STORE existiert,
// ohne 'const' zu verwenden, um den doppelten Variablenfehler zu vermeiden.
var DATA_STORE = typeof DATA_STORE !== 'undefined' ? DATA_STORE : { news: [], appointments: [], contacts: [] };

const appData = {
    news: DATA_STORE.news || [],
    appointments: DATA_STORE.appointments || [],
    contacts: DATA_STORE.contacts || []
};

const newsList = document.getElementById('news-list');
const appointmentsList = document.getElementById('appointments-list');
const contactsList = document.getElementById('contacts-list');
let currentTab = 'news'; // Startet mit Neuigkeiten

// --- Render Funktionen (Unverändert) ---

function renderNews() {
    if (appData.news.length === 0) {
        newsList.innerHTML = '<div class="bg-white text-center p-8 rounded-lg shadow-md"><p class="text-gray-500">Keine aktuellen Neuigkeiten vorhanden.</p></div>';
        return;
    }

    newsList.innerHTML = appData.news.map(item => `
        <article class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-start">
                <div class="flex-shrink-0 text-center mr-5">
                    <div class="bg-teal-100 text-teal-600 font-bold text-lg w-16 h-16 rounded-lg flex flex-col justify-center items-center">
                        <span>${item.date.split('.')[0]}</span>
                        <span class="text-xs uppercase tracking-wider">${new Date(item.date.split('.')[2], item.date.split('.')[1] - 1, item.date.split('.')[0]).toLocaleString('de-DE', { month: 'short' })}</span>
                    </div>
                </div>
                <div class="flex-grow">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">${item.title}</h3>
                    <div class="text-gray-600 leading-relaxed prose">${item.contentHtml}</div>
                </div>
            </div>
        </article>
    `).join('');
}

function renderAppointments() {
    if (appData.appointments.length === 0) {
        appointmentsList.innerHTML = '<div class="bg-white text-center p-8 rounded-lg shadow-md"><p class="text-gray-500">Aktuell sind keine Termine geplant.</p></div>';
        return;
    }

    appointmentsList.innerHTML = appData.appointments.map(item => `
        <div class="bg-white p-5 rounded-lg shadow-sm border-l-4 border-teal-500 flex items-center space-x-5 hover:shadow-md transition-shadow duration-300">
            <div class="flex-shrink-0 text-teal-500">
                <i class="fas fa-calendar-check text-3xl"></i>
            </div>
            <div class="flex-grow">
                <h4 class="text-xl font-semibold text-gray-800">${item.title}</h4>
                <p class="text-gray-600">${item.location}</p>
            </div>
            <div class="text-right text-gray-500">
                <div class="font-semibold">${item.date}</div>
                <div class="text-sm">${item.time}</div>
            </div>
        </div>
    `).join('');
}

function renderContacts() {
    if (appData.contacts.length === 0) {
        contactsList.innerHTML = '<div class="col-span-full bg-white text-center p-8 rounded-lg shadow-md"><p class="text-gray-500">Keine Kontakte hinterlegt.</p></div>';
        return;
    }

    contactsList.innerHTML = appData.contacts.map(item => `
        <div class="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div class="mb-4">
                <i class="fas fa-user-circle text-6xl text-gray-300"></i>
            </div>
            <h4 class="text-xl font-bold text-gray-800">${item.name}</h4>
            <p class="text-teal-600 font-semibold mb-3">${item.role}</p>
            <a href="mailto:${item.contact}" class="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-teal-100 hover:text-teal-700 transition-colors duration-300">
                <i class="fas fa-envelope-open-text mr-2"></i> Kontaktieren
            </a>
        </div>
    `).join('');
}

// --- Tab Management (Funktioniert bereits) ---

function showTab(tabName) {
    currentTab = tabName;

    // Verstecke alle Inhalte
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    // Zeige den ausgewählten Inhalt
    document.getElementById(`content-${tabName}`).classList.remove('hidden');

    // Setze aktive Klasse für Buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        if (button.getAttribute('data-tab') === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// --- Initialisierung (Funktioniert bereits) ---

function initApp() {
    // Führe alle Render-Funktionen aus
    renderNews();
    renderAppointments();
    renderContacts();

    // Setze Event-Listener für Tab-Buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const tab = e.currentTarget.getAttribute('data-tab');
            showTab(tab);
        });
    });

    // Zeige den initialen Tab
    showTab(currentTab);
}

// Starte die App, sobald das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);