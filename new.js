let userForm = document.getElementById("user_form");
let userEntries=[];
if(localStorage.getItem("userEntries")===null)
{
    userEntries =[];
    console.log("if");
}
else{
   userEntries = JSON.parse(localStorage.getItem("userEntries")); 
   console.log("else");
}
//console.log(userEntries);

let errors=[]
const retieveEntries = ()=>{
    let entries = localStorage.getItem('userEntries')
    if(entries){
        entries=JSON.parse(entries)
    }else{
        entries=[]
    }
    return entries
}
const displayEntries = ()=>{
let entries=retieveEntries()
const tbleEntries = entries.map((entry)=>{
const nameCell = `<td class='border px-4 py-2'>${entry.FullName}</td>`
const emailCell = `<td class='border px-4 py-2'>${entry.email}</td>`
const passwordCell = `<td class='border px-4 py-2'>${entry.password}</td>`
const dobCell = `<td class='border px-4 py-2'>${entry.dob}</td>`
const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptTerms}</td>`
const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`
return row

}).join('\n')
const table =` <table class='table-auto w-full'>
    <tr>
    <th class='px-4 py-2 '>Name </th>
    <th class='px-4 py-2 '>Email </th>
    <th class='px-4 py-2 '>Password </th>
    <th class='px-4 py-2 '>Dob </th>
    <th class='px-4 py-2 '>Accepted terms? </th>
    </tr>${tbleEntries}
</table>`
let details = document.getElementById('user-entries')
details.innerHTML=table
}

const saveUserForm = (event)=>{
event.preventDefault();
const FullName = document.getElementById('name').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
const dob = document.getElementById('dob').value
const acceptTerms = document.getElementById('acceptTerms').checked
var currentYear = new Date().getFullYear();
var birthYear = dob.split("-");
let year=birthYear[0]
var age = currentYear-year
console.log({age,currentYear,birthYear})
if(age < 18 || age > 55){
    document.getElementById('dob').style='border:1px solid red'
  return  alert("Age must be between 18 and 55")

}else{
    document.getElementById('dob').style='border:none'

    const entry ={
        FullName,
        email,
        password,
        dob,
        acceptTerms
     }
     userEntries.push(entry);
     localStorage.setItem("userEntries",JSON.stringify(userEntries))
    displayEntries()
    userForm.reset()
   
}
 
}
userForm.addEventListener('submit',saveUserForm)
displayEntries()