$(document).ready(onReady);

function onReady () {
     $('#addButton').on('click', addItem);
     getItem();
}//END onReady

//function to add items to DB
function addItem (){
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
        }//END success
    })//END ajax POST --> /list
    console.log('1. OBJECT to send', toSend);
}//END addItem function

//function to get list items from DB
function getItem () {
    // refresh list 
    $('#daList').empty();
    $.ajax({
        method: 'GET',
        url: '/list',
        success: function(resp){
            console.log('4. OBJECT grabbed:', resp);
            // loop through list items
            for(i = 0; i < resp.length; i++) {
            //append resp to a tr with a .data id
             var $tr = $('<tr>');
             var $td = $('<td>', { text: resp[i].item} ).data('id', resp[i].id);
             var $delButIn = $('<button>', {class: 'delButton', text: 'Delete'});
            $tr.append($td);
             $tr.append($delButIn);
            $('#daList').append($tr);
            
            }//END for lop
        }//END success function
    })//END ajax GET --> /list
}//END getItem function

//function to delete items from DB
function deleteItem () {

}//END deleteItem function