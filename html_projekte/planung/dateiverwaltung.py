import os

# Pfad zum Ordner, der durchsucht werden soll
path = "/Users/dianahense/Desktop/html_projekte"

# Liste aller Dateien im Ordner
files = os.listdir(path)

# Schleife durch alle Dateien im Ordner
for file in files:
    # Überprüfen, ob es sich um eine TXT- oder MD-Datei handelt
    if file.endswith(".txt") or file.endswith(".md"):
        # Ausgabe des Dateinamens
        print(file)
