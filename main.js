
$(document).ready(function(){
  var source   = $("#template").html();
  var template = Handlebars.compile(source);
  // var gennaio = moment('2018-01-01').format('dddd, DD-MM');
  var num = moment('2018-01-01').daysInMonth();
  for (var i = 1; i <= num; i++) {


    var jan = moment([2018, 0, 1]).day(i).format('dddd, DD MMMM');
    // $('#template li').clone();
    // $('#template li').text().append();

    var context = {giorno: jan};
    var html    = template(context);

    $('.lista').append(html);
  }


});
