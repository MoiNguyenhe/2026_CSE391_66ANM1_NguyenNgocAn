let students = [];
let filteredStudents = [];
let sortDirection = null;

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){

    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if(filteredStudents.length === 0){
        tbody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;
        document.getElementById("total").textContent = 0;
        document.getElementById("avg").textContent = 0;
        return;
    }

    let sum = 0;

    filteredStudents.forEach((sv,index)=>{

        sum += sv.score;

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("yellow");
        }

        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
        <button data-id="${sv.id}" class="delete">Xóa</button>
        </td>
        `;

        tbody.appendChild(tr);

    });

    document.getElementById("total").textContent = filteredStudents.length;

    let avg = (sum / filteredStudents.length).toFixed(2);
    document.getElementById("avg").textContent = avg;
}

function applyFilters(){

    let keyword = document.getElementById("search").value.toLowerCase();
    let rankFilter = document.getElementById("filterRank").value;

    filteredStudents = students.filter(function(sv){

        let matchName = sv.name.toLowerCase().includes(keyword);

        let matchRank = rankFilter === "all" || getRank(sv.score) === rankFilter;

        return matchName && matchRank;

    });

    if(sortDirection){

        filteredStudents.sort(function(a,b){

            if(sortDirection === "asc") return a.score - b.score;
            return b.score - a.score;

        });

    }

    renderTable();
}

function addStudent(){

    let nameInput = document.getElementById("name");
    let scoreInput = document.getElementById("score");

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === "" || isNaN(score) || score < 0 || score > 10){
        alert("Vui lòng nhập đúng dữ liệu");
        return;
    }

    students.push({
        id: Date.now(),
        name: name,
        score: score
    });

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    applyFilters();
}

document.getElementById("addBtn").onclick = addStudent;

document.getElementById("score").addEventListener("keydown",function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});

document.getElementById("search").addEventListener("input",applyFilters);

document.getElementById("filterRank").addEventListener("change",applyFilters);

document.getElementById("scoreHeader").addEventListener("click",function(){

    if(sortDirection === "asc"){
        sortDirection = "desc";
        this.innerHTML = "Điểm ▼";
    }else{
        sortDirection = "asc";
        this.innerHTML = "Điểm ▲";
    }

    applyFilters();
});

document.getElementById("tableBody").addEventListener("click",function(e){

    if(e.target.classList.contains("delete")){

        let id = Number(e.target.dataset.id);

        students = students.filter(function(sv){
            return sv.id !== id;
        });

        applyFilters();
    }
});

applyFilters();