let students = [];

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('tableBody');
const summaryArea = document.getElementById('summaryArea');

const getRank = (score) => {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
};

function renderTable() {
    tableBody.innerHTML = "";
    let totalScore = 0;

    students.forEach((sv, index) => {
        totalScore += sv.score;
        const rank = getRank(sv.score);
        const row = document.createElement('tr');
        
        if (sv.score < 5) {
            row.classList.add('bg-yellow');
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score.toFixed(1)}</td>
            <td>${rank}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });

    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    summaryArea.innerText = `Tổng số sinh viên: ${students.length} | Điểm trung bình: ${avg}`;
}

function addStudent() {
    const name = txtName.value.trim();
    const scoreVal = txtScore.value;
    const score = parseFloat(scoreVal);

    if (name === "" || scoreVal === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ name, score });
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
    renderTable();
}

btnAdd.onclick = addStudent;

txtScore.onkeydown = (e) => {
    if (e.key === 'Enter') addStudent();
};

tableBody.onclick = (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
};