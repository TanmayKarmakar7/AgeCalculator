const dateInput = document.querySelector("#date-input");

dateInput.max = new Date().toISOString().split("T")[0];


function calculateAge(){
    const userDOB = new Date(dateInput.value);
    const today = new Date();

    if (isNaN(userDOB)) {
        alert("Please enter a valid date.");
        location.reload();
        return;
    }

    if (userDOB > today) {
        alert("Error: Birthdate cannot be in the future!");
        return;
    }

    const DOBDate = userDOB.getDate();
    const DOBMonth = userDOB.getMonth() + 1;
    const DOBYear = userDOB.getFullYear();
    
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    
 
    let days, months, years;
    
    years = todayYear - DOBYear;

    if(todayMonth >= DOBMonth){
        months = todayMonth - DOBMonth;
    } else {
        years--;
        months = 12 + todayMonth - DOBMonth;
    }

    if(todayDate >= DOBDate){
        days = todayDate - DOBDate;
    } else {
        months--;
        days = getDaysInMonths(DOBYear, DOBMonth) + todayDate - DOBDate;
    }

    if(months < 0){
        months = 11;
        years--;
    }

    displayAge(years, months, days);

// Calculate next birthday
let nextBirthdayYear = (todayMonth > DOBMonth || (todayMonth === DOBMonth && todayDate > DOBDate)) ? todayYear + 1 : todayYear;
let nextBirthday = new Date(nextBirthdayYear, DOBMonth - 1, DOBDate);

let nextMonths, nextDays;

if (nextBirthday > today) {
    nextMonths = DOBMonth - todayMonth;
    if (nextMonths < 0) nextMonths += 12;

    nextDays = DOBDate - todayDate;
    if (nextDays < 0) {
        nextMonths--;
        if (nextMonths < 0) nextMonths += 12;
        nextDays = getDaysInMonths(todayYear, todayMonth) + nextDays;
    }
}

document.querySelector("#next-birthday-months").innerHTML = nextMonths < 10 ? `0${nextMonths}` : nextMonths;
document.querySelector("#next-birthday-days").innerHTML = nextDays < 10 ? `0${nextDays}` : nextDays;
    
};

function getDaysInMonths(year, month){
    return new Date(year, month, 0).getDate();
};

function displayAge(years, months, days){

    document.querySelector("#years").innerHTML = years < 10 ? `0${years}`: years; 

    document.querySelector("#months").innerHTML = months < 10 ? `0${months}`: months; 

    document.querySelector("#days").innerHTML = days < 10 ? `0${days}`: days; 
};

document.querySelector(".arrow-btn").addEventListener("click", calculateAge);

dateInput.addEventListener("keydown", (e) => {
    if(e.key == 'Enter'){
        calculateAge();
    }
});
