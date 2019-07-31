
$(document).ready(function(){
  var feste = 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0';


  var source   = $("#template").html();
  var template = Handlebars.compile(source);
  // var gennaio = moment('2018-01-01').format('dddd, DD-MM');
  var num = moment('2018-01-01').daysInMonth();


  for (var i = 1; i <= num; i++) {

// .format('dddd, DD MMMM')
    var jan = moment([2018, 0, 1]).day(i).format('YYYY-MM-DD');
    console.log(jan);
    // $('#template li').clone();
    // $('#template li').text().append();

    var context = {giorno: jan};
    var html    = template(context);


    $('.lista').append(html);









  }
 // faccio la chiamata ajax




  $.ajax({
    url : feste,
    method : 'GET',
    success : function(data){
      var holidays = data.response;
      for (var i = 0; i < holidays.length; i++) {
      $('li').each(function(){

        

        var data = $(this).html();
        // console.log(holidays[i]);

      if( data == holidays[i].date){
        console.log('sono nellif');

        $(data).addClass('.red');

      }
      });
      }
      // else {
      //   $('.lista').append(html);
      // }
    },
    error : function(){

    }

  });

});
