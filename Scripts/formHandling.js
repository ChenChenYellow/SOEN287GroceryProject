const email = document.getElementById('inputEmail');
const firstName = document.getElementById('inputFirstName');
const form = document.getElementById('form1')

console.log('running script');

form.addEventListener('submit', function(event){
    let database=
        {
        "email": email.value,
        "firstname": firstName.value
        };
    alert("Add to database, email " + database["email"]  + " firstname " +  database["firstname"]);

});