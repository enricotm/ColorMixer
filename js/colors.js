let colors = [];
for (let i=0; i<5; i++) {
    let color = `#${(Math.floor(Math.random()*16777216)).toString(16)}`;
    while (color.length < 7) {
        color = "#0"+color.slice(1);
    }
    colors.push(color);
    document.querySelector(`#hexColor${i}`).textContent = color;
    document.querySelector(`#hexColor${i}`).style.color = color;
    document.querySelector(`#inputColor${i}`).value = color;
}

for (let i=0; i<colors.length; i++) {
    let color = document.querySelector(`#inputColor${i}`);
    color.addEventListener('change', () => {
        document.querySelector(`#hexColor${i}`).textContent = color.value;
        document.querySelector(`#hexColor${i}`).style.color = color.value;
        colors[i] = color.value;
        document.querySelector(`#gradient`).style.background = `linear-gradient(90deg, ${colors[1]}, ${colors[2]})`;
        if (!document.querySelector("#corFinal").hidden) {
            BestCombination();
        }
    })
}

let qtdColors = 2;

const btnAddCor = document.querySelector("#btnAddCor");
btnAddCor.addEventListener('click', () => {
    if (qtdColors == 2) {
        document.querySelector("#plusSign2").hidden = false;
        document.querySelector("#color3").hidden = false;
        document.querySelector("#btnRmvCor").disabled = false;
    } else if (qtdColors == 3) {
        document.querySelector("#plusSign3").hidden = false;
        document.querySelector("#color4").hidden = false;
        document.querySelector("#btnAddCor").disabled = true;
    }
    qtdColors++;
    BestCombination();
})

const btnRmvCor = document.querySelector("#btnRmvCor");
btnRmvCor.addEventListener('click', () => {
    if (qtdColors == 4) {
        document.querySelector("#plusSign3").hidden = true;
        document.querySelector("#color4").hidden = true;
        document.querySelector("#btnAddCor").disabled = false;
    } else if (qtdColors == 3) {
        document.querySelector("#plusSign2").hidden = true;
        document.querySelector("#color3").hidden = true;
        document.querySelector("#btnRmvCor").disabled = true;
    }
    qtdColors--;
    BestCombination();
})

const btnCorFinal = document.querySelector("#btnCorFinal");
btnCorFinal.addEventListener('click', () => {
    if (document.querySelector("#corFinal").hidden) {
        document.querySelector("#corFinal").hidden = false;
        btnCorFinal.textContent = "Remover cor final";
        document.querySelector("#legendaGradiente").textContent = "% da cor mais relevante com a segunda mais relevante";
    } else {
        document.querySelector("#corFinal").hidden = true;
        btnCorFinal.textContent = "Adicionar cor final";
        document.querySelector("#legendaGradiente").textContent = "% da primeira cor com a segunda cor";
    }
    BestCombination();
})