document.getElementById("phone").addEventListener("input", function() {
    let input = this.value.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

    // Перевіряємо, чи вже є префікс
    if (!input.startsWith('38')) {
        input = '38' + input;
    }

    // Форматуємо номер
    let formattedInput = '+38-';
    if (input.length > 2) {
        formattedInput += input.substring(2, 5);
    }
    if (input.length >= 5) {
        formattedInput += '-' + input.substring(5, 7);
    }
    if (input.length >= 7) {
        formattedInput += '-' + input.substring(7, 9);
    }
    if (input.length >= 9) {
        formattedInput += '-' + input.substring(9, 12);
    }

    this.value = formattedInput;
});


function formatDate(input) {
    input = input.replace(/\D/g, '');
    let formattedInput = '';

    if (input.length > 0) {
        formattedInput += input.substring(0, 2);
        if (input.length >= 2) {
            formattedInput += '.' + input.substring(2, 4);
        }
        if (input.length >= 4) {
            formattedInput += '.' + input.substring(4, 8);
        }
    }

    return formattedInput;
}

document.getElementById("date").addEventListener("input", function() {
    this.value = formatDate(this.value);
});

document.getElementById("checkIn").addEventListener("input", function() {
    this.value = formatDate(this.value);
});

document.getElementById("checkOut").addEventListener("input", function() {
    this.value = formatDate(this.value);
});

document.getElementById("preferences").addEventListener("change", function() {
    let preferencesDetails = document.getElementById("preferencesDetails");
    if (this.value === "yes") {
        preferencesDetails.style.display = "block";
    } else {
        preferencesDetails.style.display = "none";
    }
});

function validateForm1() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let date = document.getElementById("date").value.trim();

    if (name === "" || phone === "" || email === "" || date === "") {
        document.getElementById("error1").style.display = "block";
    } else {
        document.getElementById("error1").style.display = "none";
        showForm2();
    }
}

function validateForm2() {
    let spaceType = document.getElementById("spaceType").value.trim();
    let numPeople = document.getElementById("numPeople").value.trim();
    let checkIn = document.getElementById("checkIn").value.trim();
    let checkOut = document.getElementById("checkOut").value.trim();
    let location = document.getElementById("location").value.trim();
    let preferences = document.getElementById("preferences").value;
    let preferencesDetails = document.getElementById("preferencesDetails").value.trim();

    let valid = true;

    if (spaceType === "" || numPeople === "" || checkIn === "" || checkOut === "" || location === "") {
        valid = false;
    }

    if (preferences === "yes" && preferencesDetails === "") {
        valid = false;
    }

    if (!valid) {
        document.getElementById("error2").style.display = "block";
    } else {
        document.getElementById("error2").style.display = "none";
        showForm3();
    }
}

function showForm2() {
    document.getElementById("form1").style.display = "none";
    document.getElementById("form2").style.display = "block";
}

function showForm1() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form1").style.display = "block";
}

function showForm3() {
    document.getElementById("form2").style.display = "none";
    document.getElementById("form3").style.display = "block";

    let requestNumber = Math.floor(Math.random() * 999) + 1;
    document.getElementById("requestNumber").textContent = "Номер запиту: " + requestNumber;
}