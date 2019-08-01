
$(document).ready(function(){
  var feste = 'https://flynn.boolean.careers/exercises/api/holidays';


  var source   = $("#template").html();
  var template = Handlebars.compile(source);

  showMonth('2018-01-01');

    $('.next').click( function(){
      var attribute = $('.title').attr('data-month');
      var numattr = parseInt(attribute)+1;
      var newmonth= String(numattr);
      if(numattr > 12){

        showHappy();

        // attribute = $('.title').attr('data-month','12');
        // $('.end').html('fine calendario');
        // $('.calendar').html('');
        // showMonth('2018-12-01');
        // showMonth('2018-'+ newmonth + '-01');
        // newmonth = '12';
      }else{
        $('.happy').html('');
        $('.end').html('');
        $('.calendar').html('');
        showMonth('2018-'+ newmonth + '-01');
      }


    });

    $('.prev').click( function(){
      var attribute = $('.title').attr('data-month');
      var attrPag = $('.calendar').attr('data-month');

      var numattr = parseInt(attribute)- 1;
      var newmonth= String(numattr);

      if(numattr == 00){
        $('.end').html('inizio calendario');
        showMonth('2018-01-01');

      }
      else if(showHappy){
        $('.happy').html('');
        $('.end').html('');
        $('.calendar').html('');
        showMonth('2018-01-01');

        // attribute = $('.title').attr('data-month','12');
        // $('.end').html('fine calendario');
        // $('.calendar').html('');
        // showMonth('2018-12-01');
        // showMonth('2018-'+ newmonth + '-01');
        // newmonth = '12';
      }


      else{
      $('.happy').html('');
      $('.end').html('');
      $('.calendar').html('');
      showMonth('2018-'+ newmonth + '-01');
      }

    });

 function showMonth(stringaargomento){

    var database = moment(stringaargomento);
    var mesetitle = database.format('MMMM');
    var mese = parseInt(database.format('M'))-1;
    var anno = database.format('YYYY');
    var num = database.daysInMonth();
    var data_month = database.format('MM');

    if (data_month == '12'){
      // data_month = '12';
      // $('.title').attr('data-month', data_month);
      // $('.calendar').attr('data-month', data_month);
      database = moment('2018-12-01');
    }


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

  function showHappy(){
    $('.happy').text('happy new year!!!!!!!');
    $('.end').html('');
    $('.calendar').html('');
    $('.title').html('');

  }

});
