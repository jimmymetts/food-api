 function getData() {   /* function*/
const el = document.querySelector("#container"); /*queryselector targets first element that matches target*/
el.innerHTML = ""; /*empty string*/
fetch("http://localhost:8088/food") /*fetch local host*/
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            console.log(food.barcode); /* console log food barcode */
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`) /*fetch open food facts host*/
                .then(response => response.json())
                .then(productInfo => {
                    food.ingredients = productInfo.product.ingredients;
                    htmlEl(productInfo);
                });
        });
    });

    let htmlEl = (foodEl) => {
        console.log(foodEl);
        document.querySelector("#container").innerHTML += `
            <div class = “domEl”>
            <h2>${foodEl.product.product_name}</h2>
             <p>country of origin ${foodEl.product.countries_hierarchy}</p>
             </div>
            `;
            foodEl.product.ingredients.forEach(ingredient => {
                document.querySelector("#container").innerHTML += `
            <p>${ingredient.text}</p>
            `;
            });
     };

}

const el = document.querySelector("#container");
// const getDataButton = document.getElementById("btn-getData1");
// getDataButton.addEventListener("click", () => getData("Drinks"));

const getDataButton2 = document.getElementById("btn-getData2");
getDataButton2.addEventListener("click", () => getData("Food"));