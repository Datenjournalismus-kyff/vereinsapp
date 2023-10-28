https://bookdown.org/valerie_hase/Github/tutorial-9-suche-manipulation-von-string-patterns.html

# Datei einlesen und Opjekt zuweisen
d1 <- read.csv("/Users/dianahense/Desktop/rcsv/mitglieder.csv", sep=",", header=T)
d1

d2 <- read.csv("/Users/dianahense/Desktop/rcsv/alter.csv", sep=",", header=T)
d2

# zeigt eine Liste mit eienr Anzahl von Geburtstagen (z.B. 06.06. = 2)
table(d2$Geburtstag)

# zeigt M und W an
table(d2$Geschlecht)

# vergleicht Geschlecht und Alter
table(d2$Geschlecht, d2$AlterStichtag)


ggplot(data=d2, aes(x=Geschlecht)) +
  geom_boxplot() 


# Suchfunktion - nach "Geburtstag"

d1 <- read.csv("/Users/dianahense/Desktop/rcsv/mitglieder.csv", sep=",", header=T)
d1
x1 <- grep(pattern = "05-10", x = d1$Geburtstag, value =TRUE)
data1 <-subset(d1, Geburtstag == x1)
data1

x1 <- grep(pattern = "04-17", x = d1$Geburtstag, value =TRUE,)
subset (d1, Geburtstag == x1,)
     
   
# Suche nach Nachnamen

x2 <- grep(pattern = "Hense", x = d1$Nachname,  value = TRUE)
data2 <-subset(d1, Nachname == x2)
data2

x2 <- grep(pattern = "Schuchardt", x = d1$Nachname,  value = TRUE)
subset(d1, Nachname == x2)

ggplot(d2) + ylab("Anzahl") +
  aes(x = AlterStichtag) + 
  geom_histogram(size = 1, color = "blue")


# Listen Selection

select.list(d1)

# für Geburtstag 8 Spalte
Selection: 8 

str(d1)

head(d1)

heute <- Sys.Date()
print(heute)


