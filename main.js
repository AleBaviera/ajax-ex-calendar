
$(document).ready(function(){
  var feste = 'https://flynn.boolean.careers/exercises/api/holidays';


  var source   = $("#template").html();
  var template = Handlebars.compile(source);


  var database = moment('2018-03-01')
  var mesetitle = database.format('MMMM')
  var mese = parseInt(database.format('M'))-1;
  var anno = database.format('YYYY')
  var num = database.daysInMonth();


  for (var i = 1; i <= num; i++) {


    var jan = moment([anno, mese, i]).format('dddd, DD');
    //console.log(jan);
    var context = {giorno: jan};
    var html    = template(context);


    $('.calendar').append(html);


  }
  $('.title').text(mesetitle + ' ' + anno);
 // faccio la chiamata ajax


  $.ajax({
    url : feste,
    data :{year : '2018', month : mese},
    method : 'GET',
    success : function(data){
      var holidays = data.response;
      for (var i = 0; i < holidays.length; i++) {
      $('.day').each(function(){

        var newholiday = moment(holidays[i].date).format('dddd, DD');

        var data = $(this).html();
        // console.log(holidays[i]);

        if( data == newholiday){
          // console.log('sono nellif');
          $(this).append(' ' + holidays[i].name);
          $(this).addClass('red');

        }

      });

      }

    },
    error : function(){

    }


  });

});
