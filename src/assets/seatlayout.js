
/**
 * Boolean check for booking button and counting seat selection.
 * */ 
var bookBtn = false,
    count = 0;

/**
 * 
 *  This function splits the url parameter in URL for showing synopsis data.
 */
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

/**
 * 
 * This function capitalize the first letter of any string. 
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Set seatlayout title
 */
document.title = capitalizeFirstLetter(getURLParameter("movie"))+ ' | Select seat on '+capitalizeFirstLetter(getURLParameter("day"))+' for '+capitalizeFirstLetter(getURLParameter("time"))+' | DBS Assignment';


/**
 * Seatlayout from here: http://jsfiddle.net/SandraFinnegan/12rahLg0/
 */

$(function(){

    /**
     * Movie title for seat selection
     */
    $("._movie-title").append("<h2 style='font-size:18px;'>"+capitalizeFirstLetter(getURLParameter('movie'))+ " | Time: "+getURLParameter("time")+" | Day: "+capitalizeFirstLetter(getURLParameter("day"))+"</h2><br/>");

    /**
     * Calling creatingseat function to list all the seat layouts
     */
    createseating();
});

    /**
     * Redirecting the users to cofirmation page on clicking proceed button.
     */
    function sendToConfirmation() {

        window.location = "confirmation.html?movie="+getURLParameter("movie")+"&day="+getURLParameter("day")+"&time="+getURLParameter("time")+"&seatQuantity="+count;
    }

    /**
     * This function creates the seat layout of movie showtimes, as there is no data present for seat layout 
     * for any movies in https://college-movies.herokuapp.com/ Since creating randomly seats from my side.
     */
    
    function createseating(){
    
     var seatingValue = [];
     for ( var i = 0; i < 10; i++){
         
        for (var j = 1; j < 10; j++){

            var seatingStyle = "<div class='seat available'></div>";
            seatingValue.push(seatingStyle);

            if ( j === 9){
                var seatingStyle = "<div class='clearfix'></div>";
                seatingValue.push(seatingStyle);
            }        
        }   
    }

    /**
     * It handles all the seat selection with button click, hover and seat selection etc events.
     */
    $('#messagePanel').html(seatingValue);
        
           $(function(){
                $('.seat').on('click',function(){
    
                  if($(this).hasClass( "selected" )){
                    $( this ).removeClass( "selected" );                  
                    if(count !== 0) {
                        count--;
                    }
                  }else{                   
                    $( this ).addClass( "selected" );
                    bookBtn = true;
                    count++;
                  }

                if(bookBtn && count !== 0) {
                    $("#proceedBtn").show();
                }else if(count === 0){
                    $("#proceedBtn").hide();
                }
                console.log("selected seats: ", count)
                });
    
                $('.seat').mouseenter(function(){     
                    $( this ).addClass( "hovering" );
    
                       $('.seat').mouseleave(function(){ 
                       $( this ).removeClass( "hovering" );
                          
                       });
                });    
           });
    
    };    

