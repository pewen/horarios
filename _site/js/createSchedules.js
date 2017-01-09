/*
  Create the Schedule
 */

// Generals variables
var data;
var hideCareer   = false;
var hideYear     = false;
var hideSubject  = false;
var hideTeaching = false;

var selectedCarrer;
var selectedYear;
var selectedSubject;
var selectedTeaching;

var colors = ['rgba(166,206,227, 0.8)', 'rgba(31,120,180, 0.8)',
	      'rgba(178,223,138, 0.8)', 'rgba(51,160,44, 0.8)',
	      'rgba(251,154,153, 0.8)', 'rgba(227,26,28, 0.8)',
	      'rgba(253,191,111, 0.8)', 'rgba(255,127,0, 0.8)',
	      'rgba(202,178,214, 0.8)', 'rgba(106,61,154, 0.8)',
	      'rgba(255,255,153, 0.8)', 'rgba(177,89,40, 0.8)'];

// Get the json with the data
$.ajax({
    type: "GET",
    dataType: "json",
    url: "data/data.json",
    success: function(requestJson) {
	data = requestJson;
	createCareerDivs();
    }
});


function createCareerDivs() {
    /*
      Create the button to selec the carrer
    */
    // Variables used to create the html rows
    var dataBrach = data;
    var length = Object.keys(dataBrach).length;
    var numberRow = 3;
    var rowClass = "firstButtons";
    
    // Variables used inside the template
    var template = careerTemplate;
    var myKeys = Object.keys(dataBrach);
    var colorsArray = [0, 1, 2];

    function textFunct(index) {	
	var name = myKeys[index];
	var color = colorsArray[index];
	var html = template.format(name, color);
	return html
    }

    var html = createHtmlByRow(length, numberRow, rowClass, textFunct);
    addHtmlWithEffect(html, 'carrer');

    // Listen for a transition
    var e = document.getElementsByClassName('carrer')[0];
    e.addEventListener(whichTransitionEvent(), function(event){
	if (hideCareer) {
	    hideCareer = false;
	    createYearDiv();
	}
    });
}

function hideCarrerDivs(selected) {
    /*
      On click over any carrer buttons, hide all them.
     */
    hideCareer = true;
    selectedCareer = selected;
    var dataBrach = data;
    // Apply the effect
    hideEffect(dataBrach, selected);

    // Show the restart button
    var restButton = document.getElementsByClassName('rest-button')[0];
    restButton.style.display = 'block';
}


function createYearDiv() {
    /*
      Create the button to selec the year
    */
    // Variables used to create the html rows
    var dataBrach = data[selectedCareer];
    var length = Object.keys(dataBrach).length;
    var numberRow = 3;
    var rowClass = "secondsButtons";

    // Variables used inside the template
    var template = yearTemplate;
    var myKeys = Object.keys(dataBrach);
    var colorsArray = colors;

    function textFunct(index) {
	var name = myKeys[index];
	var color = colorsArray[index];
	var html = template.format(name, color, selectedCareer);
	return html
    }

    var html = createHtmlByRow(length, numberRow, rowClass, textFunct);
    addHtmlWithEffect(html, 'year');

    // Listen for a transition
    var e = document.getElementsByClassName('year')[0];
    e.addEventListener(whichTransitionEvent(), function(event){
	if (hideYear) {
	    hideYear = false;
	    createSubjectsDiv();
	}
    });
}

function hideYearDivs(selected) {
    /*
      On click over any year buttons, hide all them.
     */
    hideYear = true;
    selectedYear = selected;
    var dataBrach = data[selectedCareer];
    // Apply the effect
    hideEffect(dataBrach, selected);
}


function createSubjectsDiv() {
    /*
      Create the button to selec the subjects
     */
    // Variables used to create the html rows
    var dataBrach = data[selectedCareer][selectedYear];
    var length = Object.keys(dataBrach).length;
    var numberRow = 3;
    var rowClass = "thirdButtons";

    // Variables used inside the template
    var template = subjectsTemplate;
    var myKeys = Object.keys(dataBrach);
    var colorsArray = colors;

    function textFunct(index) {	
	var name = myKeys[index];
	var color = colorsArray[index];
	var html = template.format(name, color);
	return html
    }

    var html = createHtmlByRow(length, numberRow, rowClass, textFunct);
    addHtmlWithEffect(html, 'subjects');

    // Listen for a transition
    var e = document.getElementsByClassName('subjects')[0];
    e.addEventListener(whichTransitionEvent(), function(event){
	if (hideSubject) {
	    hideSubject = false;
	    createTeachingDiv();
	}
    });
}

function hideSubjectsDivs(selected) {
    /*
      On click over any subjects buttons, hide all them.
     */
    hideSubject = true;
    selectedSubject = selected;
    var dataBrach = data[selectedCareer][selectedYear];
    // Apply the effect
    hideEffect(dataBrach, selected);
}


function createTeachingDiv() {
    /*
      Create the button to selec the teaching
    */
    // Variables used to create the html rows
    var dataBrach = data[selectedCareer][selectedYear][selectedSubject];
    var length = Object.keys(dataBrach).length;
    var numberRow = 4;
    var rowClass = "thirdButtons";

    // Variables used inside the template
    var template = teachingTemplate;
    var colorsArray = colors;
    var myKeys = Object.keys(dataBrach);

    function textFunct(index) {	
	var name = dataBrach[index]['docente'];
	var place = dataBrach[index]['cubiculo'];
	var phone = dataBrach[index]['interno'];
	var days = dataBrach[index]['dias'];
	var color = colors[index];
	var html = teachingTemplate.format(name, color, place,
					   phone, days);
	return html;
    }

    var html = createHtmlByRow(length, numberRow, rowClass, textFunct);
    addHtmlWithEffect(html, 'teaching');
}

function createHtmlByRow(length, numberRow, rowClass, textFunct) {
    /*
      Create some text (textFunct) into the correct number of row.
     */

    // Limits of the for to create the radios's div
    var rest = length % numberRow;
    var numberIterations = length - rest;

    // Create the office html only if is multiple of numberRow
    var html = '';
    for (var i = 0; i < numberIterations; i += numberRow) {
	html += '<div class="row ' + rowClass + '">';
	for (var j = 0; j < numberRow; j++) {
	    var index = i + j;
	    html += textFunct(index);
	}
	html += '</div><!--/row -->';
    }

    // Create the rest of the offices
    html += '<div class="row ' + rowClass + '">';
    for (var i = 0; i < rest; i ++) {
	var index = numberIterations + i;
	html += textFunct(index);
    }
    html += '</div><!--/row -->';

    return html;
}

function addHtmlWithEffect(html, className) {
    /*
      Add the new text to the rest of the code with effet
    */

    // Append the html
    var container = document.getElementById('schedules');
    container.innerHTML = html;
    
    // Show the carrer divs with the transition effect
    // Set the timeOut to give time to the browser
    // to draw the new elements
    window.setTimeout(function() {
	for (div of document.getElementsByClassName(className)) {
	    div.style.transform = "scale(1)";
	}
    }, 10);
}

function hideEffect(dataBrach, selected) {
    /*
      Simple efect to hide all the buttons
     */
    // Index of the selected button
    var allKeys = Object.keys(dataBrach);
    var index = allKeys.indexOf(selected);

    // Direction of the selected buttom
    var direction = index % 3;
    if (direction == 0) {
	var origin = "bottom left";
    }
    else if (direction == 1) {
	var origin = "center center";
    }
    else {
	var origin = "bottom right";
    }

    // Add the zoom efect to the selected carrer button
    var divSelected = document.getElementById(selected);
    divSelected.style.transition = "all 1s ease-in-out";

    for (id in dataBrach){
	var div = document.getElementById(id);
	if (id != selected){
	    div.style.transform = "scale(0)";
	}
	else {
	    div.style.transform = "scale(0,0)";
	    div.style.transformOrigin = origin;
	}
    }
}

function whichTransitionEvent() {
    /*
      Detecting CSS Animation Completion standardized browsers require.
      From Modernizr.
     */
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
	'transition':'transitionend',
	'OTransition':'oTransitionEnd',
	'MozTransition':'transitionend',
	'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

/*
  Differents used templates
*/

// Template of the each carrer
// {0}: carrer name
// {1}: index of background image
var careerTemplate = `
<article id="{0}" class="col-md-4 carrer carrer-{1}"
         onclick="hideCarrerDivs('{0}');">
  <header class="major">
    <h3>{0}</h3>
    <p>Nisl sed aliquam</p>
  </header>
  <a href="#" class="link primary"></a>
</article>`;

// Template of the year button
// {0}: year
// {1}: background color
// {2}: name of carrer
var yearTemplate = `
<article id="{0}" class="col-md-4 year" style="background:{1}"
         onclick="hideYearDivs('{0}')">
  <header class="major">
    <h3>{0}</h3>
    <p>{2}</p>
  </header>
  <a href="#" class="link primary"></a>
</article>`;

// Template of the subjects button
// {0}: subjects name
// {1}: background color
var subjectsTemplate = `
<article id="{0}" class="col-md-4 subjects" style="background-color:{1}"
         onclick="hideSubjectsDivs('{0}')">
  <header class="major">
    <h3>{0}</h3>
  </header>
  <a href="#" class="link primary"></a>
</article>`;

// Template of the teaching button
// {0}: teaching name
// {1}: background color
// {2}: cubiculo
// {3}: interno
// {4}: horarios
var teachingTemplate = `
<article id="{0}" class="col-sm-3 teaching" style="background-color:{1}">
  <header class="">
    <h3>{0}</h3>
  </header>
  <span>Cubiculo: {2}</span></br>
  <span>Interno: {3}</span></br>
  <span>Horarios consulta: {4}</span>  
  <a href="#" class="link primary"></a>
</article>`;
