//-----------------------------------------------------------------------------//

// store.js - script for storing and editing JSON in local storage

//-----------------------------------------------------------------------------//
//These watch for button clicks to change the form. Also hide the form as soon as it's loaded while showing table content.

$('#add-data').on('click', getData);
$('#database-layout').on('click', '.edit-data', editData);
$('#database-layout').on('click', '.delete-data', deleteData);

$('#database-layout').slideDown(170);
$('#character-form').slideUp(170);

//-----------------------------------------------------------------------------//
//This looks to see if their is already a count in local storage. If there isn't the count is set to 0. If there is, it will pick up from the last count.

var count;
if (localStorage.count) {
	count = localStorage.count;
}else {
	count = 0;
}

$('#database-layout').slideDown(170);
$('#character-form').slideUp(170);

//-----------------------------------------------------------------------------//
//function gets new data and pushes to localStorage

function getData(){
  if (count === 'add-cha') {
    count = localStorage.count;
  }
  
	var chName = $('#data-name').val();
	var chRace = $('#select-race option:selected').val();
	var chClass = $('#select-class option:selected').val();
	var chStr = $('#data-str').val();
	var chDex = $('#data-dex').val();
	var chCon = $('#data-con').val();
	var chInt = $('#data-int').val();
	var chWis = $('#data-wis').val();
	var chCha = $('#data-cha').val();
	var chPor = $('#data-file').val();
	
	localStorage.setItem('name'+count, chName);
	localStorage.setItem('race'+count, chRace);
	localStorage.setItem('class'+count, chClass);
	localStorage.setItem('str'+count, chStr);
	localStorage.setItem('dex'+count, chDex);
	localStorage.setItem('con'+count, chCon);
	localStorage.setItem('int'+count, chInt);
	localStorage.setItem('wis'+count, chWis);
	localStorage.setItem('cha'+count, chCha);
	localStorage.setItem('portrait'+count, chPor);

    count = localStorage.count;
	++count;
	localStorage.setItem('count', count);
	
	clearInputs();
	generateTable();
	event.preventDefault();
}

//-----------------------------------------------------------------------------//
//This function generates the table each time a JSON object is added, edited, or removed.

function generateTable (){
	var chart = $('#database-layout');
	$('.data').remove();
	for(var i=0; i<count; ++i) {
      if (localStorage['str'+i] !== undefined){
		var row = $('<div>').addClass('row data').attr('id', i);
		var col = $('<div>').addClass('col').text(localStorage['name'+i]);
		row.append(col);
		col = $('<div>').addClass('col').text(localStorage['race'+i]);
		row.append(col);
		col = $('<div>').addClass('col').text(localStorage['class'+i]);
		row.append(col);
		col = $('<div>').addClass('col').html('<div class="statnumbers"><p>Str:'+localStorage['str'+i]+'</p>'+'<p>Dex:'+localStorage['dex'+i]+'</p>'+'<p>Con:'+localStorage['con'+i]+'</p></div>'+'<div class="statnumbers"><p>Int:'+localStorage['int'+i]+'</p>'+'<p>Wis:'+localStorage['wis'+i]+'</p>'+'<p>Cha:'+localStorage['cha'+i]+'</p></div>');
		row.append(col);
		col = $('<div>').addClass('col').text(localStorage['portrait'+i]);
		row.append(col);
		col=$('<div>').addClass('col').html('<button class="edit-data" id="'+i+'">Edit</button><button class="delete-data" id="'+i+'">Delete</button>');
		row.append(col);
		
		chart.append(row);
      }
    }
}

//-----------------------------------------------------------------------------//
//This function deletes the JSON and div row

function deleteData() {
  var i = $(this).attr('id');
  
  localStorage.removeItem('name'+i);
  localStorage.removeItem('race'+i);
  localStorage.removeItem('class'+i);
  localStorage.removeItem('str'+i);
  localStorage.removeItem('dex'+i);
  localStorage.removeItem('con'+i);
  localStorage.removeItem('int'+i);
  localStorage.removeItem('wis'+i);
  localStorage.removeItem('cha'+i);
  localStorage.removeItem('portrait'+i);
    
  generateTable();
}

//-----------------------------------------------------------------------------//
//This clears the input fields

function editData() {
  count = $(this).attr('id');
  
  var chName = $('#data-name').val(localStorage['name'+count]);
  var chRace = $('#select-race').val(localStorage['race'+count]);
  var chClass = $('#select-class').val(localStorage['class'+count]);
  var chStr = $('#data-str').val(localStorage['str'+count]);
  var chDex = $('#data-dex').val(localStorage['dex'+count]);
  var chCon = $('#data-con').val(localStorage['con'+count]);
  var chInt = $('#data-int').val(localStorage['int'+count]);
  var chWis = $('#data-wis').val(localStorage['wis'+count]);
  var chCha = $('#data-cha').val(localStorage['cha'+count]);
  var chPor = $('#data-file').val(localStorage['portrait'+count]);
 
}

//-----------------------------------------------------------------------------//
//This clears the input fields

function clearInputs() {
	$('input').val('');
	$('select').val('none');
}

//-----------------------------------------------------------------------------//
//This function creates a slide toggle with the buttons

$(document).ready(function(){
	$('#add-cha').click(function(){
	  $('#database-layout').slideUp(170);
      $('#character-form').slideDown(170);
      count = $(this).attr('id');
	});
	$('#cancel-data').click(function(){
      $('#database-layout').slideDown(170);
      $('#character-form').slideUp(170);
      clearInputs();
      count = localStorage.count;
	});
	$('#add-data').click(function(){
      $('#database-layout').slideDown(170);
      $('#character-form').slideUp(170);
	});
    $('#database-layout').on('click', '.edit-data', function(){
	  $('#database-layout').slideUp(170);
      $('#character-form').slideDown(170);
	});
	
	generateTable();
});