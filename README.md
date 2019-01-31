﻿Основни задачи
О.З - основни задачи
Д.П- допълнителни задачи

eventsCollection - колекция, която държи всички събития (О.З -> 1.)

showListOfEvents()/showListOfEvents("all") - визуализира подробно информацията за всички съществуващи събития и техните гости(О.З -> 2.) (Д.П.1 -> 2.) (Д.П.1 -> 5.) (Д.П.2 -> 3.) (Д.П.3 -> 2.)(Д.П.3 -> 4.)(Д.П.3 -> 5.)(Д.П.3 -> 6.)
showListOfEvents("P") - визуализира подробно информацията за миналите събития и техните гости (Д.П.3 -> 3.)
showListOfEvents("F") - визуализира подробно информацията за бъдещите събития и техните гости (Д.П.3 -> 3.)

deleteEvent() - ако няма подадено id на събитие, излиза грешка, че е необходимо да се подаде такова
deleteEvent(2) - изтрива събитието с посоченото id (О.З -> 3.)

addEvent() - ако не са попълнени данни за събитието, излиза грешка, че не може да бъде добавено (О.З -> 4.)
addEvent("Fantastic concert") - дава грешка, че трябва да бъде попълнена датата на събитието (О.З -> 4.)
addEvent("Fantastic concert", 2019) - дава грешка, че трябва да бъде попълнена датата на събитието (О.З -> 4.)
addEvent("Fantastic concert", 2019, 3, 12, 16, 45) - добавя безплатно събитие, подходящо за непълнолетни (О.З -> 4.)
addEvent("Fantastic concert", 2019, 3, 12, 16, 45, 40, 'da') - опит за добавяне на събитие, струващо 40лв, което има ограничение за възраст. Дава грешка за формата на ограничението.
addEvent("Fantastic concert", 2019, 3, 12, 16, 45, 40, true)
 - добавя събитие, струващо 40лв, което има ограничение за възраст. (О.З -> 4.)(Д.П.2 -> 1., 2.)

editEvent()
 (О.З -> 5.)
editEvent(190) - дава грешка, че не съществува такова събитие (О.З -> 5.)
editEvent(2, 'Amazing show')- дава грешка, че трябва да бъде попълнена датата на събитието (О.З -> 5.)
editEvent(2, "Amazing show", 2019, 6, 6,1,35, 'sdsdd') (О.З -> 5.)
editEvent(2, "Amazing show", 2019, 4,30,11,20) - успешна редакция на събитие (О.З -> 5.)
editEvent(1) - опит за редакция на минало събитие (Д.П.3 -> 1.)


addGuestToEvent(7,'9709213456') - опит за добавяне на клиент към несъществуващо събитие (О.З -> 6.)
addGuestToEvent(2,'9709213456') - опит за добавяне на един и същи клиент към същото събитие (О.З -> 6.)
addGuestToEvent(2,'8674968541') - опит за добавяне на клиент, който не е регистриран в системата (О.З -> 6.)
addGuestToEvent(2,'8903041345', "Marina", "Videnova", 14, 'F', 100) - опит за добавяне на непълнолетен клиент към събитие 18+ (О.З -> 6.)
addGuestToEvent(2,'8903041345', "Marina", "Videnova", 24, 'F', 100) - успешно добавяне на гост към събитие (О.З -> 6.)
addGuestToEvent(2,'8903211345', "Marina", "Videnova", 24, 'F') - опит за добавяне на клиент без портфейл (Д.П.2 -> 4.)(Д.П.2 -> 1.) (Д.П.2 -> 5.)

filterEventGuests(2) - връща всички гости на дадено събитие (О.З -> 7.) 
filterEventGuests(2, 'F') - връщата жените на събитието (О.З -> 7.) 
filterEventGuests(2, 'M') - връща мъжете на събитието (О.З -> 7.) 

removeGuestByEgn(2,'3233') - опит за премахване на клиент от събитие по ЕГН - грешно ЕГН
removeGuestByEgn(2,'9709213456') - успешно премахване на гост от събитие (О.З -> 8.) 

enableDisableAddingNewEventsAndGuests() (Д.П.1 -> 1.)
addEvent('Awesome', 2019, 7,23,19,30) - опит за добавяне на ново събитие при затворена система (Д.П.1 -> 1.)
addGuestToEvent(3, '566565656', 'Milena', 'Atanasova', 24, 'F') -опит за добавяне на нов клиент при затворена система (Д.П.1 -> 1.)

getTheMostAttendedEvent() - (Д.П.1 -> 3.)

getAllAppropriateForUnderageEvents() - (Д.П.1 -> 4.)

filterEventsByCriteria(true, filterByAgeRestriction) (Д.П.1 -> 6.)
filterEventsByCriteria('sadsa', filterByName) (Д.П.1 -> 6.)
filterEventsByCriteria('House disco club', filterByName) (Д.П.1 -> 6.)

rateEvent(1, 9, '987654321') - опит да се оцени събитие от клиент, който не е присъствал на него (Д.П.3 -> 3.)
rateEvent(2, 9, '987654321') - опит да се оцени бъдещо събитие (Д.П.3 -> 3.)
rateEvent(1, 9, '93092136697') - успешна оценка на събитие (Д.П.3 -> 3.)
