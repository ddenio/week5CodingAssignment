//Plan on making a menu app that allows someone to log their Magic the Gathering Card collection

class Card {
    constructor(name, set, color, rarity) {
        this.name = name;
        this.set = set;
        this.color = color;
        this.rarity = rarity;
    }

    describe() {
        return `${this.name} is from the ${this.set} set and is classified as ${this.rarity}.`;
    }
}

class Collector {
    constructor(name) {
        this.name = name;
        this.collection = [];
    }

    addCard(card) {
        if (card instanceof Card) {
            this.collection.push(card);
        } else {
            throw new Error(`You can only add an instance of Card. Argument is not a card: ${card}`);
        }
    }

    describe() {
        return `${this.name} has ${this.collection.lenth} cards in their collection.`;
    }
}

//Adding Menu Class for our menu

class Menu {
    constructor() {
        this.collectors = [];                  // <== initiales our Collectors as an empty array; all the collectors that exist
        this.selectedCollector = null;         // <== For whatever Collector we have selected, set to null to start since when we start, no Collector is selected
    }

    start() {                                  // <== creating our start method, will be the entry point to our application
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {               // While user selects any option other than 0
            switch (selection) {
                case '1':                        //Selection 1 from user to create an instance of our createCollector() method to create a Collector
                    this.createCollector();
                    break;
                case '2':                       //Selection 2 from user to create an instance of our viewCollector() method to view any of one our Collectors
                    this.viewCollector();
                    break;
                case '3':                     //Selection 3 from user to create an instance of our deleteCollector() method to delete a Collector
                    this.deleteCollector();
                    break;
                case '4':                    //selection 4 from user to create an instance of our displayCollectors() method to display all of our Collectors
                    this.displayCollectors();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Thank you for using my Magic the Gathering Collectors App, goodbye!');        // If 0 is indeed selected it will break us out of our loop, and alert the user with the message 'Thank you for joining us!'
    }

    showMainMenuOptions() {
        return prompt(`
        Welcome to our Magic the Gathering Card Collection App! 
        Please select an option below:

            0) Exit
            1) Create New Collector
            2) View Collector
            3) Delete Collector
            4) Display all Collectors
        `);
    }

    showCollectorMenuOptions(collectorInfo) {
        return prompt(`
            0) Back
            1) Create a card
            2) Delete a card
            ----------------------

            ${collectorInfo}
        `);
    }

    displayCollectors() {
        let collectorString = '';                           //start with blank string, so that we can build our string with information on our Collectors
        for (let i = 0; i < this.collectors.length; i++) {            //iterate through our collectors from our array
            collectorString += i + ') ' + this.collectors[i].name + '\n';                   //grab each collector, and get name for each collector, then add new line
        }
        alert(collectorString);                                               //outside forloop now
    }

    createCollector() {
        let name = prompt('Enter a name for new Collector:');                 //our Collector Class only takes one parameter, 'name'
        this.collectors.push(new Collector(name));                        //Creating a new instance of our Collector Class, adding in our name argument that we get from user
    }

    viewCollector() {
        let index = prompt('Enter the index of the collector that you would like to view:');
        if (index > -1 && index < this.collectors.length) {       //validating user input, making sure they dont enter anything less than 0, or greater than the length of our array
            this.selectedCollector = this.collectors[index];     //setting our selectedCollector class property from null to whatever index the user has chosen.
            let description = 'Collector Name: ' + this.selectedCollector.name + '\n';   //setting description of Collector to be printed out
            
            for (let i = 0; i < this.selectedCollector.collection.length; i++) {        //Now we want to add all the card descriptions to the specific Collector
                description += i + ') ' + this.selectedCollector.collection[i].name + ' - ' + this.selectedCollector.collection[i].set 
                    + ' set - ' + this.selectedCollector.collection[i].color + ' - ' + this.selectedCollector.collection[i].rarity + '\n';
            } 

            let selection = this.showCollectorMenuOptions(description);          //havent built 'showCollectorMenuOptions' method, using  'top-down' method
            switch (selection) {
                case '1':
                    this.createCard();
                    break;
                case '2':
                    this.deleteCard();
            }
        }
    }

    deleteCollector() {
        let index = prompt('Enter the Collector you wish to delete:');
        if (index > -1 && index < this.collectors.length) {
            this.collectors.splice(index, 1);
        }
    }

    createCard() {
        let name = prompt('Enter the name for a new card:');
        let set = prompt('Enter the set your card is from:');
        let color = prompt('Enter the color of your card:');
        let rarity = prompt('Enter the rarity of your card:');
        this.selectedCollector.collection.push(new Card(name, set, color, rarity));
    }

    deleteCard() {
        let index = prompt('Enter the index of the card you wish to delete:');
        if (index > -1 && index < this.selectedCollector.collection.length) {
            this.selectedCollector.collection.splice(index, 1);
        }
    }
}


let menu = new Menu();                 //creating an instance of our Menu Class
menu.start();
