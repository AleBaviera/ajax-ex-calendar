
$(document).ready(function(){
  var feste = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0';


  var source   = $("#template").html();
  var template = Handlebars.compile(source);
  var num = moment('2018-01-01').daysInMonth();


  for (var i = 1; i <= num; i++) {


    var jan = moment([2018, 0, 1]).day(i).format('dddd, DD');
    //console.log(jan);
    var context = {giorno: jan};
    var html    = template(context);


    $('.calendar').append(html);


  }
  var mese = moment('2018-01').format('MMMM YYYY');
  $('.title').append(mese);
 // faccio la chiamata ajax


  $.ajax({
    url : feste,
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

          $(this).addClass('red');

        }

      });

      }

    },
    error : function(){

    }


  });

});
