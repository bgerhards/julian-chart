$(function() {
    var calendarMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var currentYear = 2000;
    var numMonths = 12;
    var numDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var startDay = [];

    // Set number of days for Leap Year
    numDays[1] = currentYear % 4 == 0 ? 29 : 28;
    startDay = getVarStartDay(numDays);

    // Create the table
    addTable();

    // Add calendar months to the header
    addHeaders(calendarMonths);

    // Add table body
    addRows(numDays, startDay);

    $('td').mouseover(function() {
        var col = $(this).parent().children().index($(this));
        var row = $(this).parent().parent().children().index($(this).parent());
        $(".highlightedMonDay").removeClass("highlightedMonDay");
        $(getHighlightRowCol(row, col)).addClass("highlightedMonDay");
    });

    $('td').click(function() {
        if ($(this).hasClass("clickedMonDay")) {
            $(".selectedMonDay").removeClass("selectedMonDay");
            $(".clickedMonDay").removeClass("clickedMonDay");
        } else {
            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            $(".selectedMonDay").removeClass("selectedMonDay");
            $(getHighlightRowCol(row, col)).addClass("selectedMonDay");
            $(this).addClass("selectedMonDay clickedMonDay");
        }
    });
});

function addTable() {
    $('.julian').append('<table class="table table-striped table-bordered"><thead></thead><tbody></tbody></table>');
}

function getHighlightRowCol(row, col) {
    return '.julian  thead tr:eq(0) th:eq(' + col + ') ,.julian  tbody tr:eq(' + row + ') th, .julian tbody tr td:nth-child(' + (col + 1) + ') ,.julian  tbody tr:eq(' + row + ') td'
}

function getVarStartDay(numDays) {
    var startDay = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (var i = 0; i < 12; i++) {
        for (var a = i; a > 0; a--) startDay[i] += numDays[a - 1];
    }
    return startDay;
}

function addHeaders(calendarMonths) {
    $('.julian  thead').append('<tr><th class="julianDayCount"></th></tr>');
    for (var i = 0; i < 12; i++) $('.julian thead tr:last').append('<th class="julianHeader">' + calendarMonths[i] + '</th>');
    $('.julian thead tr:last').append('<th class="julianDayCount"></th>')
}

function addRows(numDays, startDay) {
    for (var i = 0; i < 31; i++) {
        $('.julian  tbody').append('<tr><th class="julianDayCount">' + (i + 1) + '</td>' + "</tr>");
        for (var a = 0; a < 12; a++) $('.julian  tbody tr:last').append('<td class="julianBody">' + (numDays[a] > i ? startDay[a] + i : '') + '</td>');
        $('.julian  tbody tr:last').append('<th class="julianDayCount">' + (i + 1) + '</th>');
    }
}