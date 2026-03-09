const form = document.getElementById("registerForm");

function showError(id,message){
document.getElementById(id+"Error").innerText = message;
}

function clearError(id){
document.getElementById(id+"Error").innerText = "";
}


function validateFullname(){

const fullname = document.getElementById("fullname").value.trim();
const regex = /^[A-Za-zÀ-ỹ\s]+$/;

if(fullname===""){
showError("fullname","Không được để trống");
return false;
}

if(fullname.length<3){
showError("fullname","Ít nhất 3 ký tự");
return false;
}

if(!regex.test(fullname)){
showError("fullname","Chỉ chứa chữ cái");
return false;
}

clearError("fullname");
return true;
}


function validateEmail(){

const email = document.getElementById("email").value.trim();
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email===""){
showError("email","Không được để trống");
return false;
}

if(!regex.test(email)){
showError("email","Email không hợp lệ");
return false;
}

clearError("email");
return true;
}


function validatePhone(){

const phone = document.getElementById("phone").value.trim();
const regex = /^0\d{9}$/;

if(phone===""){
showError("phone","Không được để trống");
return false;
}

if(!regex.test(phone)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
return false;
}

clearError("phone");
return true;
}


function validatePassword(){

const password = document.getElementById("password").value;
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(password===""){
showError("password","Không được để trống");
return false;
}

if(!regex.test(password)){
showError("password","≥8 ký tự, có hoa, thường, số");
return false;
}

clearError("password");
return true;
}


function validateConfirmPassword(){

const password = document.getElementById("password").value;
const confirm = document.getElementById("confirmPassword").value;

if(confirm!==password){
showError("confirmPassword","Mật khẩu không khớp");
return false;
}

clearError("confirmPassword");
return true;
}


function validateGender(){

const genders = document.getElementsByName("gender");

for(let g of genders){
if(g.checked){
clearError("gender");
return true;
}
}

showError("gender","Vui lòng chọn giới tính");
return false;
}


function validateTerms(){

const terms = document.getElementById("terms");

if(!terms.checked){
showError("terms","Bạn phải đồng ý điều khoản");
return false;
}

clearError("terms");
return true;
}


form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms();

if(valid){

const name = document.getElementById("fullname").value;

form.style.display="none";

document.getElementById("success").innerHTML =
"Đăng ký thành công! 🎉<br>Xin chào <b>"+name+"</b>";

}

});


document.getElementById("fullname").addEventListener("blur",validateFullname);
document.getElementById("email").addEventListener("blur",validateEmail);
document.getElementById("phone").addEventListener("blur",validatePhone);
document.getElementById("password").addEventListener("blur",validatePassword);
document.getElementById("confirmPassword").addEventListener("blur",validateConfirmPassword);


document.querySelectorAll("input").forEach(function(input){

input.addEventListener("input",function(){

const id=input.id;

if(id){
clearError(id);
}

});

});