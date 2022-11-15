window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/a159394fbb80465db4308e4d09bcceb6/Data")
    .then((response)=>{
        for (var i = 0; i < response.data.length; i++) {
            addExpense(response.data[i])
        }
        
    })
})
    
        


function saveToLocalStorage(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const discription = event.target.discription.value;
    const category = event.target.category.value;
    let obj = {
        amount,
        discription,
        category,
      }
     axios.post("https://crudcrud.com/api/a159394fbb80465db4308e4d09bcceb6/Data",obj)
     .then((response)=>{
       addExpense(response.data)
     }) 
     .catch((err) => {
        const er = document.getElementById('error');
        er.innerHTML = 'Something Went Wrong';
        console.log(err);
    })
}
function addExpense(expense){
    document.getElementById('amount').value = '';
    document.getElementById('discription').value = '';
    document.getElementById('category').value ='';

    if(localStorage.getItem(expense._id)!== null){
       removeExpense(expense._id);
    }
   
    const parentNode = document.getElementById('listOfExpense');
    const childHTML =  `<li id=${expense._id}> ${expense.amount} - ${expense.discription} - ${expense.category}
    <button class="editbtn" onCLick=editExpense('${expense.amount}','${expense.discription}','${expense.category}','${expense._id}')>Edit expense</button>
    <button  class="deletebtn" onCLick=deleteExpense('${expense._id}')>Delete expense</button>
    </li>`;

    parentNode.innerHTML =  parentNode.innerHTML + childHTML;
}

function deleteExpense(trackerId) {
    axios.delete(`https://crudcrud.com/api/a159394fbb80465db4308e4d09bcceb6/Data/${trackerId}`)
        .then((response) => {
            removeExpense(trackerId)
        })
        .catch((err) => {
            const er = document.getElementById('error');
            er.innerHTML = 'Something Went Wrong';
            console.log(err);
        })
}


function removeExpense(trackerId) {
    const parentNode = document.getElementById('listOfExpense');
    const deletingChildNode = document.getElementById(trackerId);
    if (deletingChildNode) {
        parentNode.removeChild(deletingChildNode);
    }
}

function editExpense(amount, discription, category,trackerId) {
    document.getElementById('amount').value = amount;
    document.getElementById('discription').value = discription;
    document.getElementById('category').value = category;
    deleteExpense(trackerId);
}