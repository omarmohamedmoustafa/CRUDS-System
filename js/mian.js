var ProductNameInput = document.getElementById('ProductNameInput');//VARIABLE IS HOLDING WHOLE OBJECT 
var ProductPriceInput = document.getElementById('ProductPriceInput');//VARIABLE IS HOLDING WHOLE OBJECT
var ProductCategoryInput = document.getElementById('ProductCategoryInput');//VARIABLE IS HOLDING WHOLE OBJECT
var ProductDescriptionInput = document.getElementById('ProductDescriptionInput');//VARIABLE IS HOLDING WHOLE OBJECT
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var editBtn = document.getElementById('editBtn');
var delBtn = document.getElementById('deleteBtn');
var cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
var invalidInput = document.getElementById('invalidInput');
var ProductsArr;
var Gindex;
var noRes = document.getElementById('noResults');
(function OnLaunch()
{
    invalidInput.innerHTML='';
    if(localStorage.getItem('oldProducts'))
    {
        ProductsArr = JSON.parse(localStorage.getItem('oldProducts'));
        displayProducts(ProductsArr);
    }
    else
    {
        ProductsArr=[];
    }
})();

function addProductOnClick ()
{
    if(ProductNameInput.value && ProductPriceInput.value && ProductCategoryInput.value && ProductDescriptionInput.value)
    {
        var newProduct =
        {
            productName : ProductNameInput.value,
            productPrice : ProductPriceInput.value,
            productCategory : ProductCategoryInput.value,
            productDescription : ProductDescriptionInput.value
        }
        ProductsArr.push(newProduct);
        localStorage.setItem('oldProducts',JSON.stringify(ProductsArr));
        clearSearchBoxes();
        displayProducts(ProductsArr);
        invalidInput.classList.replace('text-danger', 'text-success')
        invalidInput.innerHTML='Product added successfully';
    }
    else if(!ProductNameInput.value && ProductPriceInput.value && ProductCategoryInput.value && ProductDescriptionInput.value )
    {
        invalidInput.classList.replace('text-success','text-danger')
        invalidInput.innerHTML='Please add Name';
    }
    else if(!ProductPriceInput.value && ProductNameInput.value && ProductCategoryInput.value && ProductDescriptionInput.value )
    {
        invalidInput.classList.replace('text-success','text-danger')
        invalidInput.innerHTML='Please add Price';
    }
    else if(!ProductCategoryInput.value && ProductPriceInput.value && ProductNameInput.value && ProductDescriptionInput.value )
    {
        invalidInput.classList.replace('text-success','text-danger')
        invalidInput.innerHTML='Please add Category';
    }
    else if(!ProductDescriptionInput.value && ProductPriceInput.value && ProductCategoryInput.value && ProductNameInput.value )
    {
        invalidInput.classList.replace('text-success','text-danger')
        invalidInput.innerHTML='Please add Description';
    }
    else
    {
        invalidInput.classList.replace('text-success', 'text-danger')
        invalidInput.innerHTML ='More than one field are empty';
    }

}

function clearSearchBoxes ()
{
    ProductPriceInput.value='';
    ProductCategoryInput.value='';
    ProductNameInput.value='';
    ProductDescriptionInput.value='';
}

function displayProducts(arrOfProducts)
{
    var products='';
    for(var i =0 ; i < arrOfProducts.length;i++)
    {
       products+=
       `<tr><td id:"index">${i+1}</td>
        <td>${arrOfProducts[i].productName}</td>
        <td>${arrOfProducts[i].productPrice}</td>
        <td>${arrOfProducts[i].productCategory}</td>
        <td>${arrOfProducts[i].productDescription}</td>
        <td><button onClick="editProduct(${i})" class="btn-dis btn btn-outline-info" id="editBtn">Edit</button></td>
        <td><button onClick="deleteProducts(${i})" id="deleteBtn" class="btn-dis btn btn-outline-danger">Delete</button></td> 
        </tr>`;
    }
    document.getElementById('tableEntry').innerHTML=products;
}

function searchProducts (keyword)
{
    var searchRes=[];
    for(var i =0 ; i < ProductsArr.length ; i++)
    {
        if(ProductsArr[i].productName.toLowerCase().includes(keyword.toLowerCase()))
        {
            searchRes.push(ProductsArr[i]);
        }
    }
    displayProducts(searchRes);
    if(!searchRes.length)
    {
        noRes.innerHTML =`No results for ${keyword}`;
    }
    else
    {
        noRes.innerHTML ='';
    }
    
}

function deleteProducts(index) 
{
    ProductsArr.splice(index,1);
    localStorage.setItem('oldProducts',JSON.stringify(ProductsArr));
    displayProducts(ProductsArr);
    invalidInput.innerHTML='Deleted Successfully!'
}

var dis_btns= document.getElementsByClassName('btn-dis');
function editProduct(index)
{
    Gindex=index;
    addBtn.classList.add('d-none');
    ProductNameInput.value = ProductsArr[index].productName;
    ProductPriceInput.value= ProductsArr[index].productPrice;
    ProductDescriptionInput.value = ProductsArr[index].productDescription;
    ProductCategoryInput.value = ProductsArr[index].productCategory;
    updateBtn.classList.replace('d-none','d-inline-block');
    updateBtn.classList.replace('btn-success', 'btn-outline-success');
    cancelUpdateBtn.classList.replace('d-none','d-inline-block');
    for(var i=0 ; i<dis_btns.length;i++)
    {
        dis_btns[i].disabled=true;
    }
}
function saveChanges()
{
    if(ProductNameInput.value && ProductPriceInput.value && ProductCategoryInput.value && ProductDescriptionInput.value)
    {
        ProductsArr[Gindex].productName=ProductNameInput.value;
        ProductsArr[Gindex].productPrice=ProductPriceInput.value;
        ProductsArr[Gindex].productDescription=ProductDescriptionInput.value;
        ProductsArr[Gindex].productCategory=ProductCategoryInput.value;
        displayProducts(ProductsArr);
        localStorage.setItem('oldProducts',JSON.stringify(ProductsArr));
        invalidInput.classList.replace('text-danger','text-success')
        invalidInput.innerHTML='Edit saved';
    }
    else
    {
        invalidInput.classList.replace('text-success','text-danger')
        invalidInput.innerHTML ='All fields must be filled';
    }
    for(var i=0 ; i<dis_btns.length;i++)
    {
        dis_btns[i].disabled=false;
    }
    addBtn.classList.replace('d-none','d-inline-block');
    updateBtn.classList.add('d-none');
    cancelUpdateBtn.classList.replace('d-inline-block','d-none');
    clearSearchBoxes();
    invalidInput.classList.replace('text-danger','text-success')
}
function noChanges()
{
    for(var i=0 ; i<dis_btns.length;i++)
    {
        dis_btns[i].disabled=false;
    }
    displayProducts(ProductsArr);
    localStorage.setItem('oldProducts',JSON.stringify(ProductsArr));
    addBtn.classList.replace('d-none','d-inline-block');
    updateBtn.classList.add('d-none');
    cancelUpdateBtn.classList.replace('d-inline-block','d-none');
    clearSearchBoxes();
    invalidInput.innerHTML='No changes..';
}

// function validateName() {
//     var nameRegex = /^[A-Z][a-z]{3,8}$/;
//     if(nameRegex.test(ProductNameInput.value))
//     {
//         ProductNameInput.classList.add('is-invalid');
//         ProductNameInput.classList.replace('is-invalid', 'is-valid');
//         return true;
//     }
//     else
//     {
//         ProductNameInput.classList.add('is-valid');
//         ProductNameInput.classList.replace('is-valid', 'is-invalid');
//         return false;
//     }
// }
// updateBtn.classList.replace('btn-outline-success', 'btn-success');