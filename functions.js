//predefined events
var eventsCollection = [
	{	
		id:1,
		eventName:"Play Shakespeare in love",
		limitedAccessFlag:false,
		timing:new Date(2018, 11, 21),
		price:10,
		guestList:[
			{
				firstName: "Georgi",
				lastName: "Georgiev",
				gender: 'M',
				age: 25,
				egn: '93092136697',
				wallet: 0

			}
		]
	},
	{	
		id:2,
		eventName:"House disco club",
		limitedAccessFlag:true,
		timing:new Date(2019, 1, 26),
		price:0,
		guestList:[
			{
				firstName: "Maria",
				lastName: "Angelova",
				gender: 'F',
				age: 21,
				egn: '9709213456',
				wallet: 100

			}
		]
	},
	{	
		id:3,
		eventName:"Balkanski Circus",
		limitedAccessFlag:false,
		timing:new Date(2019, 3, 14),
		price:30,
		guestList:[]
	}
];

var today = new Date();
var today = today.getTime();
var rateCollection = [];
var allGuestsCollection = [
{
	firstName: "Maria",
	lastName: "Angelova",
	gender: 'F',
	age: 21,
	egn: '9709213456',
    wallet: 100
}, {
	firstName: "Georgi",
	lastName: "Georgiev",
	gender: 'M',
	age: 25,
	egn: '93092136697',
	wallet: 0
}, {

}];


var checkIfEventIsArchived = function(eventId){
	var eventToBeProcessed = eventsCollection[eventId-1];
	if(eventToBeProcessed && eventToBeProcessed.timing.getTime() < today){
		return true;
	}
}

var hasEventBeenRated = false;

var getRatingOfEvent = function(eventId){
	hasEventBeenRated = false;

	var currEventRatingStatistics = rateCollection.filter(function(element){
		return element.eventId == eventId;
	})

	if(currEventRatingStatistics.length > 0){
		hasEventBeenRated = true;
	}

	var addedResult = 0;
	var counter = 0;
	var rating;

	if(hasEventBeenRated){
		for(var i=0; i < currEventRatingStatistics.length; i++){
			addedResult += currEventRatingStatistics[i].rate;
			counter++;
		}
		rating = addedResult / counter;

		if(rating > 6){
			rating = 6;
		}
	}else{
		rating = 0;
	}
	
	return rating;
}

var showDetailedInfoAboutEvents = function(collection){
	for(var i=0; i < collection.length; i++){
		var currEvent = collection[i];
		var ageRestriction = currEvent.limitedAccessFlag == true ? "18+" : "None";
		var evtTiming = currEvent.timing ? currEvent.timing : "No information";
		//show all the information about an event
		//additional-1 5.Events which are appropriate for underage have "#" in front of their name,
					//Events which are not - have "*" in front of their name
		//additional-2 3. Free events should be shown with "!". The paid ones should be shown with "$"				
		var distingushingAgeCharacter = currEvent.limitedAccessFlag == true ? "*" : "#";
		var distingushingPaidCharacter = currEvent.price && currEvent.price != 0 ? "$" : "!";
		var distinguishArchivedCurrentEvents = currEvent.timing.getTime() < today ? "~" : "";
		console.log(" ");
		console.log("***** Event " + (i+1) + "*****");
		console.log("Event Id: " + currEvent.id);
		console.log("Event Name: " + distinguishArchivedCurrentEvents + " " + distingushingPaidCharacter + " " + distingushingAgeCharacter + " " + currEvent.eventName);
		console.log("Price: " + currEvent.price);
		console.log("Age restriction: " + ageRestriction);

		if(currEvent.timing){
			console.log("Timing: " + currEvent.timing);
		}

		if(currEvent.timing.getTime() < today){
			console.log("Income: " + (currEvent.guestList.length * currEvent.price));
		}

		if(getRatingOfEvent(currEvent.id) == 0){
				console.log("Rating: Actualization to happen..." )
		}else{
			console.log("Rating: " + getRatingOfEvent(currEvent.id));
		}

		//show all the guests of an event
		for(var j=0; j < currEvent.guestList.length; j++){
			var guest = currEvent.guestList[j];
			var gender = guest.gender == "F" ? "female" : "male";
			console.log("***** Guest: " + (j+1) + "*****");
			console.log("Guest: " + guest.firstName + " " + guest.lastName);
			console.log("Age: " + guest.age);
			console.log("Gender: " + gender);

			if(guest.wallet != null && guest.wallet != undefined){
				console.log("Wallet: " + guest.wallet);
			}
		}
	}
}


var getFutureEvents = function(element){
	return element.timing.getTime() >= today;
}

var getPastEvents = function(element){
	return element.timing.getTime() < today;
}

var showListOfEvents = function(type){
	if(type == "all" || !type){
		showDetailedInfoAboutEvents(eventsCollection);
	}else if(type == "F"){ // F - future
		var futureEvents = eventsCollection.filter(getFutureEvents);
		showDetailedInfoAboutEvents(futureEvents);
	}else if(type == "P"){//P - Past
		var pastEvents = eventsCollection.filter(getPastEvents);
		showDetailedInfoAboutEvents(pastEvents);

	}
}

var checkIfThereIsFilledId = function(action, eventId){
	if(!eventId){
		alert("Please, fill in the id of the event you would like to " + action + "!");
		return false;
	}else{
		return true;
	}
}

var checkIfThereIsSuchId = function(eventId){
	eventToBeProcessed = eventsCollection[eventId-1];
	if(!eventToBeProcessed){
		alert("There is no event with this id.");
		return false;
	}else{
		return true;
	}
}

var deleteEvent = function(eventId){
	if(!checkIfThereIsFilledId('delete', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	if(checkIfEventIsArchived(eventId)){
		alert("The event is in the past. It cannot be changed!");
		return;
	}

	var eventToRemove = eventsCollection[eventId-1];
	eventsCollection.splice(eventId-1, 1);

	for(var i=0; i < eventsCollection.length; i++){
		var currEvent = eventsCollection[i];
		if(currEvent.id > eventId){
			currEvent.id = currEvent.id - 1;
		}
	}
	alert("Event '" + eventToRemove.eventName + "' with id " + eventToRemove.id + " was successfully deleted!");	
}

var checkIfThereIsEventName = function(eventName){
	if(!eventName){
		alert("Please, fill in event name!");
		return false;
	}else{
		return true;
	}
}

//additional-1
var isAddingNewAllowed = true;
var enableDisableAddingNewEventsAndGuests = function(){
	isAddingNewAllowed = isAddingNewAllowed == true ? false : true;
}
var checkIfNewIsAllowed = function(){
	if(!isAddingNewAllowed){
		return false;
	}else{
		return true;
	}
}

var checkIfAgeRestrictionOk = function(ageRestriction){
	if(ageRestriction && typeof(ageRestriction) != "boolean"){
		alert("If you want to add age restriction to the event, please fill in true!");
		return false;
	}
}

var addEvent  = function(eventName, year, month, day, hours, minutes, price, limitedAccessFlag){
	if(!checkIfNewIsAllowed()){
		alert("Sorry, the system is closed for adding new events!");
		return;
	}

	if(!checkIfThereIsEventName(eventName)){
		return;
	}

	if(!year || !month || !day){
		alert("Please, fill in date of the event!");
		return;
	}

	var newEvent = {
		id: eventsCollection.length == 0 ? 1 : eventsCollection.length + 1,
		eventName: eventName,
		price: price ? price: 0,
		limitedAccessFlag: limitedAccessFlag ? limitedAccessFlag: false,
		timing:new Date(year, month, day, hours, minutes),
		guestList:[]
	}
	
	eventsCollection.push(newEvent);
	alert("Event " + eventName + " was successfully added!");
}



var editEvent = function(eventId, eventName, year, month, day, hours, minutes, ageRestriction){
	if(!checkIfThereIsFilledId('edit', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	if(checkIfEventIsArchived(eventId)){
		alert("The event is in the past. It cannot be changed!");
		return;
	}

	if(!checkIfThereIsEventName(eventName)){
		return;
	}

	if(!year || !month || !day){
		alert("Please fill in date of the event!");
	}

	if(!checkIfAgeRestrictionOk(ageRestriction)){
		return;
	}

	var eventToBeChanged = eventsCollection[eventId-1];
	eventToBeChanged.eventName = eventName;
	eventToBeChanged.ageRestriction = ageRestriction;
	eventToBeChanged.timing = new Date(year, month, day, hours, minutes);
}

var checkIfGuestIsVip = function(egn){
	var counter = 0;
	for(var i = 0; i < eventsCollection.length; i++){
		var currEvent = eventsCollection[i]
		for(var k = 0; k < currEvent.guestList.length; k++){
			var currGuest = currEvent.guestList[k];
			if(currGuest.egn == egn){
				counter++;
			}
		}
	}
	if(counter == 5){
		return true;
	}
	return false;
}

var checkIfEventIsAppropriate = function(limitedAccessFlag, age){
	if(limitedAccessFlag && age < 18){
		alert("This guest is too young for the event!");
		return false;
	}else{
		return true;
	}
}

var addGuestToEvent = function(eventId, egn, firstName, lastName, age, gender, wallet){
	var isGuestRegistered = false;
	var newGuestToEvent = {};
	var currEvent = eventsCollection[eventId-1];

	if(!checkIfNewIsAllowed()){
		alert("Sorry, the system is closed for adding new guests!");
		return;
	}

	if(checkIfEventIsArchived(eventId)){
		alert("The event is in the past. It cannot be changed!");
		return;
	}

	if(!checkIfThereIsFilledId('add guest to', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	if(!currEvent){
		alert("There is no event with such id!");
		return;
	}

	if(!egn){
		alert("Please fill in egn!");
		return;
	}

	var isThereSuchGuest = false;
	//check if there is a guest with this egn
	for(var i=0; i < currEvent.guestList.length; i++){
		if(currEvent.guestList[i].egn == egn){
			isThereSuchGuest = true;
			alert('There is already a registered guest with this egn to this event!');
			break;		
		}
	}

	if(isThereSuchGuest){
		return;
	}
	//check if guest is registered in the system
	for(var i=0; i < allGuestsCollection.length; i++){
		var currGuest = allGuestsCollection[i];
		if(currGuest.egn == egn){
			isGuestRegistered = true;

			if(!checkIfEventIsAppropriate(currEvent.limitedAccessFlag, currGuest.age)){
				return;
			}

			if(checkIfGuestIsVip(egn) == true){
				currGuest.isVip = true;
				console.log("This is a VIP client. This event is free for him/her!");
			}else{
				if(currGuest.wallet < currEvent.price){
					alert("Guest's wallet doesn't have enough availability. Registration for " + currEvent.eventName + " cannot be completed!");
					return;
				}
				currGuest.wallet -= currEvent.price;
			}

			newGuestToEvent = currGuest;

			break;
		}
	}

	if(!isGuestRegistered){
		if(!firstName || !lastName || !age || !gender || !egn){
			alert("This guest is not registered in the system. Please, fill in all all the information required so that they can be succesfully registered in the system and for " + currEvent.eventName + "!");
			return;
		}

		if(!wallet){
			alert("Please, put some money into the guest's wallet so that they can be successfully registered in the system and for " + currEvent.eventName + "!");
			return;
		}
			
		newGuestToEvent = {
			firstName: firstName,
			lastName: lastName,
			gender: gender,
			age: age,
			egn: egn,
			wallet: wallet
		}

		if(!checkIfEventIsAppropriate(currEvent.limitedAccessFlag, newGuestToEvent.age)){
			return;
		}

		allGuestsCollection.push(newGuestToEvent);
	}

		currEvent.guestList.push(newGuestToEvent);
		alert(newGuestToEvent.firstName + ' ' + newGuestToEvent.lastName + " has been succesfully added as a guest to " + currEvent.eventName);
}


var getFemaleGuests = function(guest){
	return guest.gender == 'F';
}

var getMaleGuests = function(guest){
	return guest.gender == 'M';
}

var filterEventGuests = function(eventId, gender){
	if(!checkIfThereIsFilledId('filter', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	var chosenEvent = eventsCollection[eventId-1];

	if(gender == 'F'){
		chosenEvent.filteredGuestsList = chosenEvent.guestList.filter(getFemaleGuests);
	}else if(gender == 'M'){
		chosenEvent.filteredGuestsList = chosenEvent.guestList.filter(getMaleGuests);
	}
	console.log("Event: " + chosenEvent.eventName);

	if(!gender){
		for(var i = 0; i < chosenEvent.guestList.length; i++){
			var guest = chosenEvent.guestList[i];
			console.log("***** Guest " + (i+1) + " *****");
			console.log("Name: " + guest.firstName + " " + guest.lastName);
			console.log("Age: " + guest.age);
		}
		return;
	}

	if(chosenEvent.filteredGuestsList.length > 0){
		for(var i=0; i< chosenEvent.filteredGuestsList.length; i++){
			var guest = chosenEvent.filteredGuestsList[i];
			console.log("***** Guest " + (i+1) + " *****");
			console.log("Name: " + guest.firstName + " " + guest.lastName);
			console.log("Age: " + guest.age);
		}
	}else{
		var gender = gender == 'F' ? 'female' : 'male';
		console.log("There are no " + gender + " guests to this event.");
	}
	
}

var removeGuestByEgn = function(eventId, egn){
	if(!checkIfThereIsFilledId('delete guest from', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	if(checkIfEventIsArchived(eventId)){
		alert("The event is in the past. It cannot be changed!");
		return;
	}

	var currEvent = eventsCollection[eventId-1];
	var searchedGuest = currEvent.guestList.find(function(guest){
		return guest.egn == egn;
	})

	if(searchedGuest){
		for(var i=0; i < currEvent.guestList.length; i++){
			var guest = currEvent.guestList[i];
			if(guest.egn == egn){
				currEvent.guestList.splice(i, 1);
				alert("Guest with egn " + egn + "has been successfully removed from event with id " + eventId);
				break;
			}
		}
	}else{
		alert("There is no guest with such egn to the chosen event!");
	}
}

//additional-1 3. Get the event with the biggest number of guests
var getTheMostAttendedEvent = function(){
	var biggestGuestNumber = 0;
	var biggestGuestNumberEventCollection = [];

	for(var i = 0; i < eventsCollection.length; i++){
		var currEvent = eventsCollection[i];
		if(currEvent.guestList.length > 0){
			if(currEvent.guestList.length > biggestGuestNumber){
				biggestGuestNumber = currEvent.guestList.length;
				biggestGuestNumberEventCollection = [];
				biggestGuestNumberEventCollection.push(currEvent);
			}else if(currEvent.guestList.length == biggestGuestNumber){
				biggestGuestNumberEventCollection.push(currEvent);
			}
		}
	}

	if(eventsCollection.length == 0){
		console.log("There are no events");
	}else if(biggestGuestNumberEventCollection.length == 0){
		console.log("There are no guests to any of the events.")
	}else if(biggestGuestNumberEventCollection.length < eventsCollection.length){
		console.log("The most attended event/s is/are: ");
		for(var i = 0; i < biggestGuestNumberEventCollection.length; i++){
			var currEvent = biggestGuestNumberEventCollection[i];
			console.log( (i+1) + ' ' + currEvent.eventName);
		}
	}else if(biggestGuestNumberEventCollection.length == eventsCollection.length){
		console.log("All events have the same number of guests.")
	}
}
//additional-1 4. Get all the events, which are appropriate for underage guests
var getAllAppropriateForUnderageEvents = function(){
	var appropriateForUnderageCollection = [];
	console.log("Event appropriate for underage guests: ")
	for(var i = 0; i < eventsCollection.length; i++){
		var currEvent = eventsCollection[i];
		if(!currEvent.limitedAccessFlag){
			appropriateForUnderageCollection.push(currEvent);
			console.log(currEvent.eventName);
		}
	}
	if(appropriateForUnderageCollection.length == 0){
		console.log("There are no such events!");
	}
} 
//additional-1 6.Filter events by criteria, using a callback function
var filterEventsByCriteria = function(value, callback){
	var filteredEventsCollection = [];
	for(var i = 0; i < eventsCollection.length; i++){
		filteredEventsCollection.push(callback(eventsCollection[i], value));
	}
}

var filterByAgeRestriction = function(element, value){
	if(element.limitedAccessFlag == value){
		console.log(element);
		return element;
	}
}
var filterByName = function(element, value){
	if(element.eventName == value){
		console.log(element);
		return element;
	}
}

var rateEvent = function(eventId, rate, egn){

	if(!checkIfThereIsFilledId('rate', eventId)){
		return;
	}

	if(!checkIfThereIsSuchId(eventId)){
		return;
	}

	if(!checkIfEventIsArchived(eventId)){
		alert("The event hasn't happened yet. You cannot rate it.");
		return;
	}

	if(!rate || rate < 1 || rate > 10){
		alert("Please, fill in rate between 1 and 10!");
		return;
	}

	if(!egn){
		alert("Please, fill in your egn!");
	}

	var checkIfGuestAttendedTheEvent = false;

	for(var i = 0; i < eventsCollection.length; i++){
		var currEvent = eventsCollection[i];
		if(currEvent.id == eventId){
			for(var k=0; k < currEvent.guestList.length; k++){
				var currGuest = currEvent.guestList[k];
				if(currGuest.egn == egn){
					checkIfGuestAttendedTheEvent = true;
					break;
				}
				break;
			}
		}
	}
	if(!checkIfGuestAttendedTheEvent){
		alert("You haven't attended the event, so you are not allowed to rate it.");
		return;
	}

	var rateObject = {
				eventId:eventId,
				rate:rate,
				egn:egn
	};

	var isAlreadyRatedByThePerson = false;
	for(var j = 0; j < rateCollection.length; j++){
		if(rateCollection[j].eventId == eventId && rateCollection[j].egn == egn){
			isAlreadyRatedByThePerson = true;
			alert("You have already rated this event");
			break;
		}
	}

	if(isAlreadyRatedByThePerson){
		return;
	}

	rateCollection.push(rateObject);
	alert("Your vote is accepted and is going to be processed.");
}




