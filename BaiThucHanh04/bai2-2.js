const form = document.getElementById("orderForm");

const prices = {
Ao:150000,
Quan:200000,
Giay:500000
};

function showError(id,msg){
document.getElementById(id+"Error").innerText = msg;
}

function clearError(id){
document.getElementById(id+"Error").innerText="";
}


function validateProduct(){

const product = document.getElementById("product").value;

if(product===""){
showError("product","Vui lòng chọn sản phẩm");
return false;
}

clearError("product");
return true;
}


function validateQuantity(){

const qty = document.getElementById("quantity").value;

if(qty==="" || qty<1 || qty>99){
showError("quantity","Số lượng 1-99");
return false;
}

clearError("quantity");
return true;
}


function validateDate(){

const input = document.getElementById("deliveryDate").value;

if(input===""){
showError("date","Chọn ngày giao");
return false;
}

const today = new Date();
const selected = new Date(input);

const maxDate = new Date();
maxDate.setDate(today.getDate()+30);

if(selected < today){
showError("date","Không chọn ngày quá khứ");
return false;
}

if(selected > maxDate){
showError("date","Không quá 30 ngày");
return false;
}

clearError("date");
return true;

}


function validateAddress(){

const address = document.getElementById("address").value.trim();

if(address.length<10){
showError("address","Ít nhất 10 ký tự");
return false;
}

clearError("address");
return true;

}


function validateNote(){

const note = document.getElementById("note").value;

if(note.length>200){
showError("note","Tối đa 200 ký tự");
return false;
}

clearError("note");
return true;

}


function validatePayment(){

const methods = document.getElementsByName("payment");

for(let m of methods){
if(m.checked){
clearError("payment");
return true;
}
}

showError("payment","Chọn phương thức");
return false;

}



function updateTotal(){

const product = document.getElementById("product").value;
const qty = document.getElementById("quantity").value;

if(product && qty){

const total = prices[product] * qty;

document.getElementById("total").innerText =
Number(total).toLocaleString("vi-VN")+" đ";

}

}



document.getElementById("product").addEventListener("change",updateTotal);
document.getElementById("quantity").addEventListener("input",updateTotal);



document.getElementById("note").addEventListener("input",function(){

const note = this.value.length;

document.getElementById("noteCount").innerText =
note + "/200";

if(note>200){
document.getElementById("noteCount").style.color="red";
}else{
document.getElementById("noteCount").style.color="gray";
}

});



form.addEventListener("submit",function(e){

e.preventDefault();

const valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment();

if(valid){

const product = document.getElementById("product").value;
const qty = document.getElementById("quantity").value;
const date = document.getElementById("deliveryDate").value;
const total = document.getElementById("total").innerText;

const box = document.getElementById("confirmBox");

box.style.display="block";

box.innerHTML =
`
<p>Sản phẩm: ${product}</p>
<p>Số lượng: ${qty}</p>
<p>Tổng tiền: ${total}</p>
<p>Ngày giao: ${date}</p>

<p>Xác nhận đặt hàng?</p>

<button onclick="confirmOrder()">Xác nhận</button>
<button onclick="cancelOrder()">Hủy</button>
`;

}

});


function confirmOrder(){

document.getElementById("orderForm").style.display="none";

document.getElementById("confirmBox").style.display="none";

document.getElementById("success").innerText=
"Đặt hàng thành công 🎉";

}


function cancelOrder(){

document.getElementById("confirmBox").style.display="none";

}