let day = { // day input and its habshtakanat
    birth : $('#day'), // select day input field
    current : new Date().getDate(), //get current day
    message : 'must be a valid day' // day error message
}

let month = { // month input and its habshtakanat
    birth : $('#month'), // select month input field
    current : new Date().getMonth() + 1, // get current month
    message : 'must be a valid month' // month error message
}

let year = { // year input and its habshtknat
    birth : $('#year'), // select year input field
    current : new Date().getFullYear(), // get current year
    message : 'Must be in the past' // year error message
}

let emptyMsg = 'This field is required'; // empty input field message error
let _30Months = ['4','6','9','11']; // 30 days months
let calcButton = $('#button'); // select submit button
let days, months, years; // variables for storing output data

function handleError(element){ // code to excute when input value is invalid
    element.birth.css('border-color', '#f00'); // change input border color to red
    element.birth.parent().css('color', '#f00'); // change label color to red
    element.birth.next().html( element.message ); // show error message
    element.isValid = false; // set isValid property to false
}

function normalize(element){ // code to excute when input value is valid
    element.birth.css('border-color', '#dbdbdb'); // change input border color to gray
    element.birth.parent().css('color', '#000'); // change label color to black
    element.birth.next().html( '' ); // remove error message 
    element.isValid = true; // set isValid property to true
}

function validateDay(){ // function to validate day input value
    switch (true) { 
        case (day.birth.val() == ''): // if the input field is empty
            handleError(day); // call function to handle error 
            day.birth.next().html( emptyMsg ) ; // show empty field error message
        break;
        case (parseInt( day.birth.val() ) < 1 ):  // if the birth day value is negative or zero
            handleError(day); // call function to handle error
        break;
        case ( _30Months.includes(month.birth.val()) && parseInt( day.birth.val() ) > 30 ): // if the birth month is 30 days and birth day value is greater than 30
            handleError(day); // call function to handle error
        break;
        case (parseInt(year.birth.val()) % 4 != 0): // if the year is simple
            if(parseInt(month.birth.val()) == 2 && parseInt(day.birth.val()) > 28){ // if the birth month is 2 and birth day is greater than 28 
                handleError(day); // call function to handle error
                } else { // if the birth day is 28 or less
                normalize(day); // call function to remove error message
            }
        break;
        case (parseInt(year.birth.val()) % 4 == 0): // if the year is leap
            if(parseInt(month.birth.val()) == 2 && parseInt(day.birth.val()) > 29){ // if the birth month is 2 and the birth day is greater than 28
                handleError(day); // call function to handle error message
                } else { // if the birth day is 29 or less
                normalize(day); // call function to remove error message
            }
        break;
        default : // if the birth day is valid
            normalize(day); // call function to remove error message
    }
}

function validateMonth(){ // function to validate birth month
    if(month.birth.val() == ''){ // if the month input field is empty
        handleError(month); // call function to handle error message
        month.birth.next().html( emptyMsg ); // show empty error message
    } else if ( parseInt( month.birth.val() ) < 1 || parseInt( month.birth.val() ) > 12) { // if the birth month is not between 1 and 12
        handleError(month); // call function to handle error message
    } else { // if the birth month is valid
        normalize(month); // call function to remove error messages
    } 
}

function validateYear(){ // function to validate year input 
    if(year.birth.val() == ''){ // if the year input field is empty
        handleError(year); // call function to handle error message
        year.birth.next().html( emptyMsg ); // show empty field error message
    } else if ( parseInt( year.birth.val() ) < 1 || parseInt( year.birth.val() ) > year.current) { // if the birht year is not between 1 and current year
        handleError(year); // call function to handle error message
    } else { // if the year is valid
        normalize(year); // remove error message
    } 
}

function validateInputs(){ // function to call all validate functions
    validateDay(); // call validate day function
    validateMonth(); // call validate month function
    validateYear(); // cll validate year function
}

function clearInputs(){ // function to clear all inputs 
    $('input').val(''); // select all inputs field and remove its content
}

function calcAge(){ // the main function to validate inputs and calculate age 
    validateInputs(); // validate all data 
    if(day.isValid && month.isValid && year.isValid){ // if all data is valid
        let birth = { // stor user data in an object
            day : parseInt(day.birth.val()), // stor birth day as a number
            month : parseInt(month.birth.val()), // store birth month as a number
            year : parseInt(year.birth.val()) // store birth year as a number
        }

        function calc(){  // function to calculate age
            days = day.current - birth.day; // store days 
            months = month.current - birth.month; // store months
            years = year.current - birth.year; // store years

            day.current = new Date().getDate(); // reset the current day
            month.current = new Date().getMonth() +1; // reset the current month
            year.current = new Date().getFullYear(); // reset the current year

            $('#years').html( years ); // display the years
            $('#months').html( months ); // display the months
            $('#days').html( days ); // display the days
            clearInputs(); // clear inputs content
        }
        if( birth.day > day.current ){ // if the birth day is greater than current day
            day.current += 30; // add 30 days to birth day
            month.current -= 1; // subtract 1 from birth month
            if( birth.month > month.current ){ // if the birth month is greater than current month
                month.current += 12; // add 12 to birth month
                year.current -= 1; // subtract 1 from birth year
                calc(); // then call calculate age function
            } else { // if the the birth month is not greater than current month
                calc(); // call calculate age function
            }
        } else { // if the birth day is not greater than the current day 
            if( birth.month > month.current ){ // if the birth month is greater than the current month
                month.current += 12; // add 12 to the birth month
                year.current -= 1; // subtract 1 from current year
                calc(); // then call calculate age function
            } else { // if the birth month is not greater than the current month
                calc(); // call calculate age function
            }
        }
    }
}
calcButton.click( calcAge );