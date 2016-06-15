$(function() {
    var calendarMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var currentYear = 2000;
    var numMonths = 12;
    var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var startDay = [];

    // Set number of days for Leap Year
    numDays[1] = currentYear % 4 == 0 ? 29 : 28;
    startDay = getVarStartDay(numDays);
    for (var i = 0; i < 12; i++) {
        console.log(calendarMonths[i] + ": " + numDays[i]);
    }
    addTable();
    addHeaders(calendarMonths);
    addRows(numDays, startDay);

    $('td').mouseover(function() {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        $(".highlightedMonDay").removeClass("highlightedMonDay");
        $('.julian  thead tr:eq(0) th:eq(' + col + ')').addClass("highlightedMonDay");
        $('.julian  tbody tr:eq(' + row + ') th:eq(0)').addClass("highlightedMonDay");
        // alert('Row: ' + row + ', Column: ' + col);
    });
});

function addTable() {
    $('.julian').append('<table class="table table-striped table-bordered"><thead></thead><tbody></tbody></table>');
}

function getVarStartDay(numDays) {
    var startDay = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (var i = 0; i < 12; i++) {
        for (var a = i; a > 0; a--) {
            startDay[i] += numDays[a - 1];
        }
    }
    return startDay;
}

function addHeaders(calendarMonths) {
    $('.julian  thead').append('<tr><th class="julianDayCount"></th>' +
        "</tr>");
    for (var i = 0; i < 12; i++) {
        $('.julian thead tr:last').append('<th class="julianHeader">' + calendarMonths[i] + '</th>');
    }

}

function addRows(numDays, startDay) {
    for (var i = 0; i < 31; i++) {
        $('.julian  tbody').append('<tr><th class="julianDayCount">' + (i + 1) + '</td>' + "</tr>");

        for (var a = 0; a < 12; a++) {
            $('.julian  tbody tr:last').append('<td class="julianBody">' + (numDays[a] > i ? startDay[a] + i : '') + '</td>');
        }
    }


}