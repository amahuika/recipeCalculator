const breadRecipes = {

    whiteDough: {
        doughDiv: 1.6,
        concentrate: 5,
        yeast: 3,
        water: 64
    },
    sweetDough: {
        doughDiv: 1.57,
        concentrate: 15,
        yeast: 5.5,
        water: 57.7
    },
    ciabatta: {
        doughDiv: 1.77,
        concentrate: 4,
        yeast: 1,
        water: 66,
        secondWater: 6,
    }
};

const inputField = document.querySelector(".input");
const mainContainer = document.querySelector('.main-content');
const resetButton = document.querySelector(".reset");
const calculateButton = document.querySelector(".calculate");

let doughWeight;
let doughType;
document.querySelector(".form-select").addEventListener('change', function () {
    doughType = this.value;
    if (doughType === 'sweet' || doughType === 'white') {
        inputField.innerHTML = "";
        inputField.innerHTML = `<input class="form-control dough-weight mt-2" type="number" placeholder="Dough Weight kg"
        aria-label="default input example">`;
    } else if (doughType === 'ciabatta') {
        inputField.innerHTML = "";
        inputField.innerHTML = `<input class="form-control mt-2 fiveC" type="number" placeholder="How many 5/C"
        aria-label="default input example">
        <input class="form-control mt-2 fourC" type="number" placeholder="How many 4/C"
        aria-label="default input example">`;

    }
    // console.log(doughType);
});


calculateButton.addEventListener('click', function (e) {
    e.preventDefault();

    if (doughType === 'white') {
        const white = breadRecipes.whiteDough;
        const doughWeight = document.querySelector('.dough-weight').value;

        mainContainer.classList.add('d-none');
        inputField.innerHTML = "";
        inputField.innerHTML = calcDough(white, doughWeight);


        resetButton.classList.remove('d-none');
        calculateButton.classList.add('d-none');

    } else if (doughType === 'sweet') {
        const sweet = breadRecipes.sweetDough;
        const doughWeight = document.querySelector('.dough-weight').value;

        mainContainer.classList.add('d-none');

        inputField.innerHTML = "";
        inputField.innerHTML = calcDough(sweet, doughWeight);

        resetButton.classList.remove('d-none');
        calculateButton.classList.add('d-none');

    } else if (doughType === 'ciabatta') {
        const ciabatta = breadRecipes.ciabatta;
        const fourC = document.querySelector('.fourC').value;
        const fiveC = document.querySelector('.fiveC').value;
        doughWeight = (fourC * 4) + (fiveC * 5)

        mainContainer.classList.add('d-none');

        inputField.innerHTML = "";
        inputField.innerHTML = calcDough(ciabatta, doughWeight);

        resetButton.classList.remove('d-none');
        calculateButton.classList.add('d-none');
    }


})

document.querySelector(".reset").addEventListener('click', function (e) {
    e.preventDefault();
    mainContainer.classList.remove('d-none');
    inputField.innerHTML = '';
    resetButton.classList.add('d-none');
    calculateButton.classList.remove('d-none');

})


function calcDough(dough, weight) {
    let extraWater;
    const flour = weight / dough.doughDiv;
    const concentrate = (flour / 100) * dough.concentrate;
    const yeast = (flour / 100) * dough.yeast;
    const water = (flour / 100) * dough.water;
    if (doughType === 'ciabatta') {
        extraWater = (flour / 100) * dough.secondWater;
    }

    return ` <table class="table table-striped table-bordered">
                <tr>
                    <td>Flour</td>
                    <td>${flour.toFixed(2)} kg</td>
                </tr>
                <tr>
                    <td>Concentrate</td>
                    <td>${concentrate.toFixed(2)} kg</td>
                   
                </tr>
                <tr>
                    <td>Yeast</td>
                    <td>${yeast.toFixed(2)} kg</td>
                </tr>
                <tr>
                    <td>Water</td>
                    <td>${water.toFixed(2)} litres</td>
                </tr>
                ${doughType === 'ciabatta' ? ` <tr>
                <td>Second Water</td>
                <td>${extraWater.toFixed(2)} litres</td>
                </tr>` : ""}
            </table>`;
}