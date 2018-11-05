//used jQuery only

var today = new Date();
var todayDate = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();

var currentMonth;
var currentYear;

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

showCalendar(year, month);


// previous and next buttons, onclick doesn't work on jsfiddle
document.getElementById("prev").addEventListener("click", function() {

	$("tbody").fadeOut(80, function() {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear -= 1;
    } else {
     currentMonth--;
    }
    showCalendar(currentYear, currentMonth);
  });
  $("tbody").fadeIn(80);
})

document.getElementById("next").addEventListener("click", function() {

  $("tbody").fadeOut(80, function() {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear += 1;
    } else {
     currentMonth++;
    }
    showCalendar(currentYear, currentMonth);
  })
	$("tbody").fadeIn(80);
})



// input section --------------------------
document.getElementById("submit").addEventListener("click", function() {
	
  $("tbody").fadeOut(80, function() {
  	// if put these vars outside, else statement is fired
    var yearRegex = /^[1-2][0|9]\d{2}/g;
    var yearInput = document.getElementById("year-input").value;
    var monthInput = document.getElementById("month-input").value;
    console.log(yearInput);
    console.log(monthInput);
    if (yearRegex.test(yearInput) && monthInput>0) {
      showCalendar(yearInput, monthInput);
      document.getElementById("year-input").value = "";
    } else {
     alert("please put valid years preceding from 1901");
     //clear input
     document.getElementById("year-input").value = "";
    }
  });
  
  $("tbody").fadeIn(80);
})


// generate html for calendar
function showCalendar(y, m) {

// after input month&year, prev&next button would jump to current prev/next month
// so I put global vars
  currentMonth = m;
  currentYear = y;

  var tBody = document.getElementById("tbody");
  tBody.innerHTML = "";

  // show header
  var dateHead = document.getElementById("date-head");
  dateHead.innerHTML = months[m] + " " + y;

  // get starting day of month
  var startDay = (new Date(y, m, 1)).getDay(); // 2nd arg is february
  // day arg 32 is at least 1 day more than total days, minus 32
  // so for Feb, 32 - (4"th march") = 28
  var daysInMonth = 32 - new Date(y, m, 32).getDate();


  // show dates on table
  var dateHolder = 1;

  for (let i = 0; i < 6; i++) {
    var tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      // if on first row and startDay hasn't started yet
      if (i === 0 && j < startDay) {
        let td = document.createElement("td");
        let dateNum = document.createTextNode("");
        td.appendChild(dateNum);
        tr.appendChild(td);
        // if month length is finished
      } else if (dateHolder > daysInMonth) {
      	// if new row is empty, then stop
      	if (j===0) {break;}
        //if new row has at least one date, rest make blank cells till weekend
        let td = document.createElement("td");
        let dateNum = document.createTextNode("");
        td.appendChild(dateNum);
        tr.appendChild(td);
        
      } else {
        let td = document.createElement("td");
        let dateNum = document.createTextNode(dateHolder);
        td.appendChild(dateNum);

				// colorcode date if it's current month and date is today
        if (y === today.getFullYear() && m === today.getMonth() && td.innerHTML == todayDate) {
        	td.className += "date-active";
        }
        tr.appendChild(td);

        dateHolder++;
      }

    }

    tBody.appendChild(tr);
    


  }

}


