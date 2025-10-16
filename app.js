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
        newsList.innerHTML = '<p class="text-gray-500 p-4 border rounded-lg bg-white">Keine aktuellen Neuigkeiten vorhanden.</p>';
        return;
    }

    newsList.innerHTML = appData.news.map(item => `
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl">
                <div class="flex items-center mb-3">
                    <span class="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mr-3">${item.date}</span>
                    <h3 class="text-xl font-bold text-gray-800">${item.title}</h3>
                </div>
                <div class="text-gray-700 leading-relaxed">${item.contentHtml}</div>
            </div>
        `).join('');
}

function renderAppointments() {
    if (appData.appointments.length === 0) {
        appointmentsList.innerHTML = '<p class="text-gray-500 p-4 border rounded-lg bg-white">Aktuell sind keine Termine geplant.</p>';
        return;
    }

    appointmentsList.innerHTML = appData.appointments.map(item => `
            <div class="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500 flex items-start space-x-4">
                <div class="flex-shrink-0 text-center pt-1">
                    <i class="fas fa-clock text-xl text-green-600"></i>
                    <div class="text-xs text-gray-500">${item.time}</div>
                </div>
                <div>
                    <h4 class="text-lg font-semibold text-gray-800">${item.title}</h4>
                    <p class="text-gray-600">${item.location}</p>
                    <p class="text-sm text-gray-500 mt-1">am ${item.date}</p>
                </div>
            </div>
        `).join('');
}

function renderContacts() {
    if (appData.contacts.length === 0) {
        contactsList.innerHTML = '<div class="col-span-1 md:col-span-2"><p class="text-gray-500 p-4 border rounded-lg bg-white">Keine Kontakte hinterlegt.</p></div>';
        return;
    }

    contactsList.innerHTML = appData.contacts.map(item => `
            <div class="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                <div class="flex items-center mb-3">
                    <i class="fas fa-user-circle text-4xl text-gray-400 mr-4"></i>
                    <div>
                        <h4 class="text-xl font-bold text-gray-800">${item.name}</h4>
                        <p class="text-sm font-semibold text-blue-600">${item.role}</p>
                    </div>
                </div>
                <a href="mailto:${item.contact}" class="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out flex items-center">
                    <i class="fas fa-envelope mr-2 text-sm"></i> ${item.contact}
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