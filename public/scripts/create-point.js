const loader = document.querySelector("#loader");
const stateInput = document.querySelector("input[name=state]");

function populeteUFs(){
  const ufSelect = document.querySelector("select[name=uf]");
  
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json() )
  .then( states => {
    for(state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }
  })
}

// Chama função para preencher as UFs
populeteUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  
  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  
  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;
  citySelect.disabled = true;

  //console.log("carregando Cidades...");
  loader.classList.remove("hide");
  fetch(url)
  .then( res => res.json() )
  .then( cities => {
    for(city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    }
    citySelect.disabled = false;
    loader.classList.add("hide");
    //console.log("finalizado Cidades...");
  })
}

// Caso tenha alguma alteração nos itens do select com nome uf, ira realizar um função
document
  .querySelector("select[name=uf]")
  .addEventListener("change" , getCities)

// Itens de coleta
//pega todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target;

  //adicionar ou remover uma class no js
  itemLi.classList.toggle("selected");

  const itemID = itemLi.dataset.id;

  //console.log('ITEM ID: ', itemID)

  // verificar se existem itens selecionados. se sim
  // pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => item == itemID);
  
  // se ja estiver selecionado 
  if(alreadySelected >= 0){
    //tirar da seleção
    const filteredItems = selectedItems.filter(item => item != itemID);
    selectedItems = filteredItems;
  } else {
    // se não etiver selecionado, adicionar a seleção
    // adicionar à seleção
    selectedItems.push(itemID);
  }
  //console.log('Selected Items: ', selectedItems);
  
  // atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems;

}