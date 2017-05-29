// store.js - script for storing and editing data in .ajax

//-----------------------------------------------------------------------------//
//These watch for button clicks to change the form. Also generate a table from local storage as soon as page is loaded.

$('#add-data').on('click', getData);
$('#database-layout').on('click', '.edit-data', editData);
$('#database-layout').on('click', '.delete-data', deleteData);
$('#alert-box').on('click', '.confirm-delete', deleteChar);
$('#alert-box').on('click', '.cancel-delete', cancelDelete);
$('#error-box').on('click', '.confirm-error', confirmError);

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
	
	for(var i in response) {
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
//This function pulls up the alert box and asks to confirm deleting

function deleteData(data) {
	var id = $(this).attr('id');
	$('.confirm-delete').attr('id', id);
  $('#alert-box').fadeIn(300);
}

//-----------------------------------------------------------------------------//
//deletes the data 

function deleteChar(data) {
	var id = $(this).attr('id');
	$.ajax( BASE_URL + collection + '/' + id,
			{
				method: 'DELETE',
				success: pullData,
				error: reportAjaxError
			});
		$('#alert-box').fadeOut(300);
}

//-----------------------------------------------------------------------------//
//cancels the delete request

function cancelDelete () {
	$('.confirm-delete').removeAttr('id');
	$('#alert-box').fadeOut(300);
}

//-----------------------------------------------------------------------------//
//edits the data 

function editData() {
  var id = $(this).attr('id');
  
	$.ajax( BASE_URL + collection + '/' +id,
		{
			method: 'GET',
			success: function postEdit(data){
				  var chName = $('#data-name').val(data.name);
					var chRace = $('#select-race').val(data.race);
					var chClass = $('#select-class').val(data.class);
					var chStr = $('#data-str').val(data.str);
					var chDex = $('#data-dex').val(data.dex);
					var chCon = $('#data-con').val(data.con);
					var chInt = $('#data-int').val(data.int);
					var chWis = $('#data-wis').val(data.wis);
					var chCha = $('#data-cha').val(data.cha);
					var chPor = $('#data-file').val(data.por);
			},
			error: reportAjaxError
		});
	
	$('#add-data').on('click', function () {
			$.ajax( BASE_URL + collection + '/' + id,
			{
				method: 'DELETE',
				success: pullData,
				error: reportAjaxError
			});
		});
}

//-----------------------------------------------------------------------------//
//This generates an error message

function reportAjaxError() {
	$('#error-box').fadeIn(300);
}

function confirmError() {
	$('#error-box').fadeOut(300);
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
	});
	$('#cancel-data').click(function(){
      $('#database-layout').slideDown(170);
      $('#character-form').slideUp(170);
      clearInputs();
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
