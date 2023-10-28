d <- read.csv("/Users/dianahense/Desktop/rcsv/ukraine3.txt", sep=",")
d
boxplot(d$Financial.commitments, d$Humanitarian.commitments, d$Military.commitments, d$Total.bilateral.commitments)
/Users/dianahense/Desktop