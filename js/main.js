
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList;



if (localStorage.getItem("ProductList") == null) {
    var productList = [];
}


else {
    productList = JSON.parse(localStorage.getItem("ProductList"))
    display(productList)
}




function addProduct() {

    if (validProductName() == true && validProductPrice() == true && validProductDesc() == true && validProductCat() == true) {

        var product = {
            name: productName.value,
            price: productPrice.value,
            cat: productCat.value,
            desc: productDesc.value,
        }

        productList.push(product);
        display(productList);
        clearFrom();
        localStorage.setItem("ProductList", JSON.stringify(productList))
    }

    else {

    }

}

function display(display) {
    var box = ``;


    for (var i = 0; i < display.length; i++) {
        box += `    <tr>
        <td>${i + 1}</td>
        <td>${display[i].newName ? display[i].newName : display[i].name}</td>
        <td>${display[i].price}</td>
        <td>${display[i].cat}</td>
        <td>${display[i].desc}</td>
        <td><button onclick="removeElement(${i})" class="btn deleteBtn btn-danger btn-sm">Delete</button></td>
        <td><button onclick = "updaetElement(${i}) " class="btn btn-warning btn-sm">Update</button></td>
    </tr>`;
    }

    document.getElementById("tBody").innerHTML = box;



}


function clearFrom() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}



function updaetElement(number) {
    show(number);
    changeButton(number);
}


function changeValue(number) {
    productList[number].name = productName.value;
    productList[number].price = productPrice.value;
    productList[number].cat = productCat.value;
    productList[number].desc = productDesc.value;

    display(productList)
    clearFrom()
}

function changeButton(number) {

    document.getElementById("button").hidden = true
    document.getElementById("button2").hidden = false;
    document.getElementById("button2").innerHTML = `<button  onclick="rest(${number})" class="btn mb-3 btn-info btn-lg">Update</button>`



}

function rest(number) {
    // show(number);
    document.getElementById("button").hidden = false;
    document.getElementById("button2").hidden = true;

    changeValue(number)
}

function removeElement(index) {

    productList.splice(index, 1)
    localStorage.setItem("ProductList", JSON.stringify(productList))

    display(productList);

}

function show(number) {

    productName.value = productList[number].name
    productPrice.value = productList[number].price
    productCat.value = productList[number].cat
    productDesc.value = productList[number].desc
}



function search(text) {

    var foundedItems = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(text.toLowerCase()) == true) {
            productList[i].newName = productList[i].name.toLowerCase().replace(text.toLowerCase(), `<span class="text-danger">${text}</span>`)
            console.log("Founded", i)
            foundedItems.push(productList[i])
        };

    }

    display(foundedItems)

}





function validProductName() {
    var regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(productName.value) == true) {
        productName.style.border = "none";
        document.getElementById("wonrgName").classList.add("d-none");
        return true;
    }

    else {
        productName.style.border = "solid red 5px";
        document.getElementById("wonrgName").classList.remove("d-none");
        return false
    }
}


function validProductPrice() {
    var regex = /^(?!0\d{3})[1-9]\d{3}$|10000$/;

    if (regex.test(productPrice.value) == true) {
        productPrice.style.border = "none";
        document.getElementById("wonrgPrice").classList.add("d-none");
        return true;
    }

    else {
        productPrice.style.border = "solid red 5px";
        document.getElementById("wonrgPrice").classList.remove("d-none");
        return false
    }
}



function validProductCat() {
    var regex = /^(tv|mobile|laptop|bestinstructor)$/i;

    if (regex.test(productCat.value) == true) {
        productCat.style.border = "none";
        document.getElementById("wonrgCat").classList.add("d-none");
        return true;
    }

    else {
        productCat.style.border = "solid red 5px";
        document.getElementById("wonrgCat").classList.remove("d-none");
        return false
    }
}


function validProductDesc() {
    var regex = /^(?=.{250,}).*$/s;

    if (regex.test(productDesc.value) == true) {
        productDesc.style.border = "none";
        document.getElementById("wonrgDesc").classList.add("d-none");
        return true;
    }

    else {
        productDesc.style.border = "solid red 5px";
        document.getElementById("wonrgDesc").classList.remove("d-none");
        return false
    }
}


