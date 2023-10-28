x <- c("Vergrämung", "Hund", "Begehung", "Vergrämung/Hund/Begehung", "Drohne")
y <- c(37.40, 35.60, 33.2, 30.1, 22.8)

data5 <- data.frame(Bezeichnung = dnamen, Ergebnis = datapro)
data5

ggplot(data=data5, aes(y="Ergebnis")) 
plot(y, type="h", main="Kitztote durch Mahd trotz Such- bzw
Vergrämungsaktion", lwd=20, bty="o",ylab="Häufigkeit", xlab="Bezeichnung", col="green" )

# Darstellung von Plots

library(ggplot2)

ggplot(data5) +
  aes(x = Bezeichnung, weight = Ergebnis) +
  geom_bar(fill = "#BBA284") +
  labs(title = "Kitzverluste in % ") +
  theme_light() +
  theme(
    plot.title = element_text(size = 17L,
                              face = "bold",
                              hjust = 0.5)
  )

ggplot(data5, aes(x="", y=Ergebnis, fill=Häufigkeit)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(amount, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL)


ggplot(data5) +
  aes(y = Bezeichnung, 
      x = Ergebnis) +
  geom_col(size = 3, color = "blue") 

ggplot(data5) +
  aes(y = Bezeichnung, 
      x = Ergebnis) +
  geom_point()

ggplot(data5) +
  aes(y = Bezeichnung,
      x = Ergebnis) +
  geom_boxplot()

# shape = Darstellungsform der Punkte

ggplot(data5) +
  aes(x = Bezeichnung, 
      y = Ergebnis) +
geom_point(size = 4, color = "blue", shape = 8) + geom_smooth(method = "lm")



boxplot(data5$Ergebnis, col="green")
median(data5$Ergebnis)
mean(data5$Ergebnis)


#Dataframe erstellen für Kreisdiagramm
data <- data.frame("amount" = c("Vergrämung", "Hund", "Begehung", "Vergrämung/Hund/Begehung", "Drohne", "sonstige"),
                   "category" = c(9, 26, 29, 26, 7, 3))

#Kreisdiagramm erstellen
ggplot(data, aes(x="", y=amount, fill=category)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) 

ggplot(data, aes(x="", y=category, fill=amount)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(category, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL)

ggplot(data, aes(x="", y=category, fill=amount)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(category, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme_classic() +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) 


ggplot(data, aes(x="", y=category, fill=amount)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(category, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme_classic() +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) 


#Dataframe erstellen für Kreisdiagramm - Erfolgsquote
data <- data.frame("Bezeichnung" = c("Vergrämung", "Hund", "Begehung", "Vergrämung/Hund/Begehung", "Drohne"),
                   "Ergebnis" = c(62.6, 64.4, 66.8, 69.9, 77.2))

#Kreisdiagramm erstellen
ggplot(data, aes(x="", y=Bezeichnung, fill=Ergebnis)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) 

ggplot(data, aes(x="", y=Bezeichnung, fill=Ergebnis)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(Bezeichnung, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL)

ggplot(data, aes(x="", y=Bezeichnung, fill=Ergebnis)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(Bezeichnung, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme_classic() +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) 


ggplot(data, aes(x="", y=Ergebnis, fill=Bezeichnung)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(Ergebnis, "%")), position = position_stack(vjust=0.5)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme_classic() +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) 

ggplot(data, aes(x="", y=Ergebnis, fill=Bezeichnung)) +
  geom_bar(stat="identity", width=1) +
  coord_polar("y", start=0) +
  geom_text(aes(label = paste0(Bezeichnung)), position = position_stack(vjust=0.7)) +
  labs(x = NULL, y = NULL, fill = NULL) +
  theme_classic() +
  theme(axis.line = element_blank(),
        axis.text = element_blank(),
        axis.ticks = element_blank()) 


ggplot(data) +
  aes(x = Ergebnis, weight = Bezeichnung) +
  geom_bar(fill = "grey") +
  labs(title = "Effizienz in % ") +
  theme_light() +
  theme(
    plot.title = element_text(size = 17L,
                              face = "bold",
                              hjust = 0.5))

ggplot(data) +
  aes(x = amount, weight = category) +
  geom_bar(fill = "grey") +
  labs(title = "Effizienz in % ") +
  theme_light() +
  theme(
    plot.title = element_text(size = 17L,
                              face = "bold",
                              hjust = 0.5))


boxplot(data$Ergebnis, ylab = "in %", col=(c("lightblue", family = c("mono"))))


ggplot(data) +
  aes(y = Ergebnis,
      x = Bezeichnung) +
  geom_point(shape = 23, size = 5, fill = "lightblue") 

  boxplot(data$category, ylab = "in %", col=(c("pink", family = c("mono"))))

# Vorlage und Beispiele

boxplot(IQ~Geschlecht, xlab="Geschlecht", ylab="IQ", col=(c("lightblue","pink")))

library(ggplot2)

ggplot(data) + 
  aes(x = category, weight = amount) +
  geom_boxplot()

ggplot(data) +
  aes(x = amount, weight = category) +
  geom_point(aes(shape = 1), size = 5, fill = "red")
         

  
 
 
 
 
   
 

