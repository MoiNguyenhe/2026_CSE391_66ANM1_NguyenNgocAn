

// HIỂN THỊ BẢNG
function renderTable(list = employees) {
  const tableBody = document.getElementById("tableBody");
  let html = "";

  if (list.length === 0) {
    html = `<tr><td colspan="5">No data</td></tr>`;
  } else {
    list.forEach(emp => {
      html += `
        <tr>
          <td>${emp.name}</td>
          <td>${emp.phone}</td>
          <td>${emp.email}</td>
          <td>${emp.date}</td>
          <td>${emp.position}</td>
        </tr>
      `;
    });
  }

  tableBody.innerHTML = html;
}

// MỞ FORM
function openForm() {
  document.getElementById("popup").style.display = "block";
}

// ĐÓNG FORM
function closeForm() {
  document.getElementById("popup").style.display = "none";
  clearForm();
}

// RESET FORM
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";
  document.getElementById("position").value = "";

  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("dateError").innerText = "";
}

// VALIDATE
function validateField() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let date = document.getElementById("date").value;

  let ok = true;

  // reset lỗi
  document.getElementById("nameError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("dateError").innerText = "";

  if (!name) {
    document.getElementById("nameError").innerText = "Không được để trống";
    ok = false;
  }

  if (!email) {
    document.getElementById("emailError").innerText = "Không được để trống";
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    document.getElementById("emailError").innerText = "Email không hợp lệ";
    ok = false;
  }

  
  if (!date) {
    document.getElementById("dateError").innerText = "Chọn ngày";
    ok = false;
  }

  return ok;
}

// NÚT LƯU
function addEmployee() {
  if (!validateField()) return;

  const emp = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    date: document.getElementById("date").value,
    position: document.getElementById("position").value.trim()
  };

  employees.push(emp);

  renderTable();
  closeForm();
}

// TÌM KIẾM
function searchEmployee() {
  let keyword = document.getElementById("searchInput").value.toLowerCase();

  let result = employees.filter(emp =>
    emp.name.toLowerCase().includes(keyword)
  );

  renderTable(result);
}

// realtime search
document.getElementById("searchInput").oninput = searchEmployee;

// render lần đầu
renderTable();