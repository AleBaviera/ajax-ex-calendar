
$(document).ready(function(){
  var feste = 'https://flynn.boolean.careers/exercises/api/holidays';


  var source   = $("#template").html();
  var template = Handlebars.compile(source);

  showMounth('2018-01-01');

  // var i = 1;
  // while ( i <= 8) {
    $('.next').click( function(){
      var attribute = $('.title').attr('data-month');
      var attrPag = $('.calendar').attr('data-month');
      // var numattr =  parseInt(attribute);
      // console.log('numattr',numattr);
      //
      // var nextmonth = moment([2018,numattr,01]).add(1, 'Month');
      // console.log(nextmonth);

      var numattr = parseInt(attribute)+1;
      var newmonth= String(numattr);

      $('.calendar').html('');
      // var numattrPag = parseInt(attrPag)+1;
      // var newPag= String(numattrPag);
      //
      // $('.calendar div').attr('data-month',newPag);

        // meseincorso = '0' + String(i);
        // console.log(meseincorso);
        // database = moment('2018-'+ meseincorso + '-01');
        // console.log(database);
        showMounth('2018-'+ newmonth + '-01');


    });
  // i++;
  // }


 function showMounth(stringaargomento){

    var database = moment(stringaargomento);
    var mesetitle = database.format('MMMM');
    var mese = parseInt(database.format('M'))-1;
    var anno = database.format('YYYY');
    var num = database.daysInMonth();
    var data_month = database.format('MM');


    // console.log(data_month);
    // if(data_month < 10){
    //   data_month += '0' + String(data_month);
    //
    //
    // }


    for (var i = 1; i <= num; i++) {


      var pagmese = moment([anno, mese, i]).format('dddd, DD');
      //console.log(pagmese);
      var context = {giorno: pagmese , data_month: data_month};//,
      var html    = template(context);


      $('.calendar').append(html);


    }
    $('.title').text(mesetitle + ' ' + anno).attr('data-month', data_month);
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
  }



});
