$(document).ready(onReady);

function onReady() {
    $('#addButton').on('click', addItem);
    $('#daList').on('click', '.compButton', compItem);
    $('#daList').on('click', '.delButton', deleteItem);
    $('#daComps').on('click', '.delButton', deleteItem);
    getItem();
} //END onReady

//function to add items to DB
function addItem() {
    //Object to store user input
    var toSend = {
        item: $('#listIt').val()
    }
    //send object to server
    $.ajax({
        method: 'POST',
        url: '/list',
        data: toSend,
        success: function (resp) {
            getItem();
        } //END success
    }) //END ajax POST --> /list
    console.log('1. OBJECT to send', toSend);
} //END addItem function

//complete item function 
function compItem() {
    if (confirm("Are you sure you wish to mark as complete?") == true) {
        $('#daComps').append($(this).parent());
        $(this).hide()
    } //END if confirm
    else {
        console.log('not confirmed');
    } //END else deny confirmation
} //END compItem function

//function to get list items from DB
function getItem() {
    // refresh list 
    $('#daList').empty();
    //send get request to server
    $.ajax({
        method: 'GET',
        url: '/list',
        success: function (resp) {
            console.log('4. OBJECT grabbed:', resp);
            // loop through list items
            for (i = 0; i < resp.length; i++) {
                //append resp to table with a .data id
                var $tr = $('<tr data-id=' + resp[i].id + '>');
                var $td = $('<td>', { text: resp[i].item })//.data('id', resp[i].id);
                var $delButIn = $('<button>', {
                    class: 'delButton  btn btn-danger',
                    text: 'Delete'
                });//<--append delete button
                var $compButIn = $('<button>', {
                    class: 'compButton btn btn-success',
                    text: 'Complete'
                });//<--append complete button
                //append all to DOM
                $tr.append($td);
                $tr.append($compButIn);
                $tr.append($delButIn);
                $('#daList').append($tr);
            } //END for lop
        } //END success function
    }) //END ajax GET --> /list
} //END getItem function

//function to delete items from DB
function deleteItem() {
    $('#daComps').empty();
    //confirm deletion 
    if (confirm("Are you sure you wish delete?") == true) {
    //local variable to store data id
    var itemId = $(this).parent().data('id');
    console.log('item id:', itemId);
    //send delete request to server
    $.ajax({
        method: 'DELETE',
        url: '/list/' + itemId,
        success: function(resp){
            getItem();
         }//END success function 
     })//END ajax delete
    }//END if confirm
    else{
        console.log('did not delete');
    }//END else deny
} //END deleteItem function