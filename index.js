import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {getDatabase, ref, child, get, set} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBAw73ShYEOs3BkMR5ghq0ZpDpyDhEqsMg",
  authDomain: "hotel-login-37c4b.firebaseapp.com",
  projectId: "hotel-login-37c4b",
  storageBucket: "hotel-login-37c4b.appspot.com",
  messagingSenderId: "1075700540532",
  appId: "1:1075700540532:web:cd5496375a13b8f8515d21",
  measurementId: "G-RB63C2Y1LG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
// Sign Up elements
const email = document.getElementById("email");
const phone = document.getElementById("mobno");
const password = document.getElementById("pass");
const confirm_password = document.getElementById("Cpass")
const signUp = document.getElementById("signup")
// Sign in elements
const semail = document.getElementById("semail");
const spassword = document.getElementById("spass");
const singIn = document.getElementById("singIn");

function AddData(){
    set(ref(db, 'Customer/' + email.value),{
        cust_email: email.value,
        cust_phone: phone.value,
        cust_password: password.value 
    }).then(()=>{
        alert("Welcome!!! Thank You For Signing Up with us.");
    }).catch((error)=>{
        alert("Unsuccessful");
        console.log(error);
    })
}

let pass;
function RetData(){
    const dbRef = ref(db);

    get(child (dbRef, 'Customer/' + semail.value))
    .then((snapshot)=>{
        if(snapshot.exist()){
            pass = snapshot.val().cust_password;
        }
        else{
            document.getElementById("noAccount").style = {display : block,
            color: red};
        }
    })
    .catch((error)=>{
        alert("Unsuccessful");
        console.log(error);
    })
}

singIn.addEventListener("click",CheckPassword());

function CheckPassword(){
    RetData();
    if(pass === spassword.value){
        window.location.href = "home.html";
    }
    else{
        alert("Wrong Password!!");
    }
}


signUp.addEventListener("click",ValidPassword());
function ValidPassword(){
    if(password.value === confirm_password.value){
        AddData();
    }else{
        alert("password does't match with confirm password");
    }
}
