const itemform=document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const btnClear=document.getElementById('clear');
const filterClear=document.getElementById('filter');
const itemBtn=itemform.querySelector('button');
let isEditMode=false;

function onAddSubmit(e){
    e.preventDefault();
    const newItem=itemInput.value;
    if(isEditMode){
        item=itemList.querySelector('.edit-mode');
        item.classList.remove('edit-mode');
        item.remove();
        isEditMode=false;

    }
    addItemToDom(newItem);
    addItemToStorage(newItem);
    itemInput.value='';
    clear();
}

function addItemToDom(item){
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button=createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}
function displayItems(){
    const itemFromStorage=getItemFromStorage();
    itemFromStorage.forEach((item)=>addItemToDom(item))
    clear();
}

function addItemToStorage(item){
    let itemFromStorage=getItemFromStorage();
    
    itemFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemFromStorage));
}

function getItemFromStorage(){
    let itemFromStorage;
    if(localStorage.getItem('items') === null){
        itemFromStorage=[];
    }else{
            itemFromStorage=JSON.parse(localStorage.getItem('items'));
    }
    return itemFromStorage;
}


function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}
itemform.addEventListener('submit',onAddSubmit);
document.addEventListener('DOMContentLoaded', displayItems);
////////2

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }else{
        setItemToEdit(e.target);
    }
}
function setItemToEdit(item){
    isEditMode=true;
    itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    itemBtn.innerHTML='<i class="fa-solid fa-plus"></i>UPDATE ITEM';
    itemBtn.style.backgroundColor='green';
    itemInput.value=item.textContent;
}


function removeItem(item){       
        if(confirm('Emin misin?')){
            item.remove();
            removeLocal(item.textContent)
            clear();
        }
    }
function removeLocal(item){
    let itemFromStorage=getItemFromStorage();
    itemFromStorage=itemFromStorage.filter((i)=>i!==item);
    localStorage.setItem('items',JSON.stringify(itemFromStorage));
}

function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items');
    
    clear();
}
itemList.addEventListener('click',onClickItem);


function clear(){
    itemInput.value='';
    const li=itemList.querySelectorAll('li');
    if(li.length===0){
        btnClear.style.display='none';
        filterClear.style.display='none';
    }else{
        btnClear.style.display='block';
        filterClear.style.display='block';
    }
    itemBtn.innerHTML='<i class=fa-solid fa-plus> </i> ADD ITEM';
    itemBtn.style.backgroundColor='#333';   
    isEditMode=false;
}
btnClear.addEventListener('click', clearItems);
clear();
///////////4 bak 10dan sonra

function onFilter(e){
    const items=document.querySelectorAll('li');
    const text=e.target.value.toLowerCase(); 
    items.forEach((itemm) => {
        const item=itemm.firstChild.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            itemm.style.display='flex';
        }else{
            itemm.style.display='none';
        }
    });
    
}

filterClear.addEventListener('input',onFilter);



