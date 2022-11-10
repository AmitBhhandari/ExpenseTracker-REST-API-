window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/ce49f490d75548c2add4c76159006bea/Data")
    .then((response)=>{
        
            addExpense(response.data) 
        
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
     axios.post("https://crudcrud.com/api/ce49f490d75548c2add4c76159006bea/Data",obj)
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
    const childHTML =  `<li id=${expense._id}> ${expense.amount} - ${expense.discription} - ${expense.catagory}
    <button class="editbtn" onCLick=editExpense('${expense.amount}','${expense.discription}','${expense.category}','${expense._id}')>Edit expense</button>
    <button class="deletebtn" onCLick=deleteExpense('${expense._id}')>Delete expense</button>
    </li>`;

    parentNode.innerHTML =  parentNode.innerHTML + childHTML;
}

function deleteExpense(trackerId) {
    axios.delete(`https://crudcrud.com/api/ce49f490d75548c2add4c76159006bea/Data/${trackerId}`)
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