var ingredients = [
        {"ingredient": "all-purpose flour", "type": "dry", "quantity": 1.75, "unit": "cups"},
        {"ingredient": "baking powder", "type": "dry", "quantity": 1, "unit": "tbsp"},
        {"ingredient": "sugar", "type": "dry", "quantity": 1, "unit": "tbsp"},
        {"ingredient": "salt", "type": "dry", "quantity": 0.5, "unit": "tsp"},
        {"ingredient": "eggs", "type": "wet", "quantity": 3, "unit": "large"},
        {"ingredient": "melted butter", "type": "wet", "quantity": 8, "unit": "tbsp"},
        {"ingredient": "milk", "type": "wet", "quantity": 1.5, "unit": "cups"},
        {"ingredient": "vanilla extract", "type": "wet", "quantity": 2, "unit": "tsp"}
    ];

var instructions =  ["Stir together dry ingredients.",
            "Stir together wet ingredients.",
            "Add wet ingredients to dry ingredients and stir slightly to form a lumpy batter.",
            "Scoop .25 cups at a time onto buttered griddle over medium high heat.",
            "Cook until slightly brown on each side."];

pancakeBatter.ingredients = ingredients;
pancakeBatter.instructions = instructions;


var blueberryPancakes = Object.create(pancakeBatter);
blueberryPancakes.extras = [{"ingredient": "blueberries", "type": "dry", "quantity": 0.25, "unit": "lb"}];


var chocolateChipPancakes = Object.create(pancakeBatter);
chocolateChipPancakes.extras = [{"ingredient": "chocolate chips", "type": "dry", "quantity": 0.25, "unit": "lb"}];


var bananaSourCreamPancakes = Object.create(pancakeBatter);

bananaSourCreamPancakes.ingredients[2].quantity = 3;