// store.js - script for storing and editing data in .ajax

//-----------------------------------------------------------------------------//
//These watch for button clicks to change the form. Also generate a table from local storage as soon as page is loaded.

$('#add-data').on('click', getData);
$('.edit-data').on('click', editData);
$('.delete-data').on('click', deleteData);

//-----------------------------------------------------------------------------//
//These are global variables and initial functions.

var BASE_URL = "https://pacific-meadow-64112.herokuapp.com/data-api/";
var collection = "epope";

$('#database-layout').slideDown(170);
$('#character-form').slideUp(170);

//-----------------------------------------------------------------------------//
//function gets new data and pushes to localStorage

function getData(){
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
	
	var newChar = {"name": chName, "race": chRace, "class": chClass, "str": chStr, "dex": chDex, "con": chCon, "int": chInt, "wis": chWis, "cha": chCha, "por": chPor}
	
	pushData(newChar);
	
	clearInputs();
	generateTable();
	event.preventDefault();
}

//-----------------------------------------------------------------------------//
//function pushes collected data to server to store

function pushData(chara) {
	clearInputs();
	$.ajax(BASE_URL + collection,
		{
			method: 'POST',
			dataType: 'json',
			data: chara,
			success: pullData,
			error: reportAjaxError
		}
	);
}

//-----------------------------------------------------------------------------//
//This function is to retrieve the data

function pullData(){
	$.getJSON("https://pacific-meadow-64112.herokuapp.com/data-api/epope", generateTable);
}
//-----------------------------------------------------------------------------//
//This function generates the table each time a JSON object is added, edited, or removed.

function generateTable (response){
	var chart = $('#database-layout');
	$('.data').remove();
	
	for(var i=0; i<response.length; ++i) {
		var chName = response[i].name;
		var chRace = response[i].race;
		var chClass = response[i].class;
		var chStr = response[i].str;
		var chDex = response[i].dex;
		var chCon = response[i].con;
		var chInt = response[i].int;
		var chWis = response[i].wis;
		var chCha = response[i].cha;
		var chPor = response[i].por;

		var id = response[i]._id;

		var row = $('<div>').addClass('row data').attr('id', id);
		var col = $('<div>').addClass('col').text(chName);
		row.append(col);
		col = $('<div>').addClass('col').text(chRace);
		row.append(col);
		col = $('<div>').addClass('col').text(chClass);
		row.append(col);
		col = $('<div>').addClass('col').html('<div class="statnumbers"><p>Str:'+chStr+'</p>'+'<p>Dex:'+chDex+'</p>'+'<p>Con:'+chCon+'</p></div>'+'<div class="statnumbers"><p>Int:'+chInt+'</p>'+'<p>Wis:'+chWis+'</p>'+'<p>Cha:'+chCha+'</p></div>');
		row.append(col);
		col = $('<div>').addClass('col').text(chPor);
		row.append(col);
		col=$('<div>').addClass('col').html('<button class="edit-data" id="'+id+'">Edit</button><button class="delete-data" id="'+id+'">Delete</button>');
		row.append(col);
		chart.append(row);
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
//This generates an error message

function reportAjaxError() {
	console.log("this is an error");
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
	
	pullData();
});
