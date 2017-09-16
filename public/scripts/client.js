$(document).ready(onReady);

function onReady () {
     $('#addButton').on('click', addItem);
     //CALL getItem();
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
            //CALL getItem
        }//END success
    })//END ajax POST --> /list
    console.log('object to send', toSend);
}//END addItem function

//function to get list items from DB
function getItem () {

}//END getItem function

//function to delete items from DB
function deleteItem () {

}//END deleteItem function