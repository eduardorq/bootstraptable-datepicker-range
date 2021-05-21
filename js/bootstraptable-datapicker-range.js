'use strict'

$(document).ready(function() {

    $('#tblAdmin').bootstrapTable();

    $(function() {

        let startDate;
        let endDate;


        $('input.bootstrap-table-filter-control-birthday[type="search"]').daterangepicker({
            "locale": {
                "format": "DD-MM-YYYY",
                "separator": " - ",
                "firstDay": 1
            },
            "startDate": moment().subtract(29, 'days'),
            "endDate": moment(),
            "opens": "left"
        },

            function(start, end) {
                console.log("Callback has been called!");
                $('input.bootstrap-table-filter-control-birthday[type="search"]').html(start.format('DD-MM-YYYY') + ' - ' + end.format('DD-MM-YYYY'));
                startDate = start.format('DD-MM-YYYY');
                endDate = end.format('DD-MM-YYYY');

            })

        .change(function(){
            let dates = [
                startDate,
                endDate
            ];

            let table = "tblAdmin";

            filterByDate(dates, table);

        });
    })


});

function filterByDate(dates, table){
    let checkDate;

    $("table#"+table+" tbody tr").each(function() {

        checkDate = new Date($(this).text().substring(parseInt($(this).text().length)-10).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );

        if(checkDate <= new Date(dates[0].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) ||
            checkDate >= new Date(dates[1].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")))
        {
            console.log(checkDate+": Date out of range");
            $(this).hide();
        }else{
            console.log(checkDate+": Date inside of range");

        }
    })
}