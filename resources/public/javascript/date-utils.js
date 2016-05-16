(function(ns, undefined) {

    ns.monthDiff = function(d1, d2) {
        var months = ((d2.getFullYear() - d1.getFullYear()) * 12) -
            d1.getMonth() +
            d2.getMonth() + 1;
        return months <= 0 ? 0 : months;
    };

    ns.toUTCDate  =  function(input) {
        var date = new Date(input);
        var utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return utcDate;
    };

    ns.getMonthName = function(date) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[date.getMonth()];
    };

    ns.findAllMonths = function(startDate, endDate) {
        var month= startDate.getMonth();
        var year= startDate.getFullYear();

        return _.times( ns.monthDiff(startDate, endDate), function(n) {
            return new Date(year, month + n);
        });
    };

    ns.findAllMonthsWithMoment = function(startDate, endDate) {
        return ns.findAllMonths(startDate.toDate(), endDate.toDate());
    };

    ns.firstDayOfMonth = function(year, month) {
        return new Date(year, month - 1, 1);
    };

    ns.getPreviousYearAndMonths = function(date, months) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var result = [];

        while(months !== 0){
            if(month === 1){
                year--;
                month = 12;
            }else{
                month--;
            }
            result.unshift({'year': year, 'month': month});
            months--;
        }
        return result;
    };

    ns.sortDataByDate = function(data, key){
        return _.sortBy(data, function(o) {
            var dt = new Date(o[key]);
            return dt;
        });
    };

    var getFirstWeekday = function(date) {
        var firstDayOfMonth = moment(date).startOf('month');
        var day = moment(firstDayOfMonth).weekday();
        var diff =  day === 6 ? 2 : day === 7 ? 1 : 0;

        return moment(firstDayOfMonth).add(diff, 'day');
    };

    var getLastWeekday = function(date) {
        var lastDayOfMonth = moment(date).endOf('month');
        var day = moment(lastDayOfMonth).weekday();
        var diff =  day === 6 ? 1 : day === 7 ? 2 : 0;

        return moment(lastDayOfMonth).subtract(diff, 'day');
    };

    ns.isFirstOrLastWeekday = function(date) {
        var firstWeekday = getFirstWeekday(date);
        var lastWeekday = getLastWeekday(date);

        var currentDate = moment(date).toDate().getDate();
        return (currentDate === firstWeekday.toDate().getDate() || currentDate === lastWeekday.toDate().getDate());
    };

    ns.isFirstOrLastMonth = function(date){
        var monthNumber = moment(date).format("M");
        if(monthNumber == 1 || monthNumber == 12)
            return true;
        return false;
    };
})(window.dateUtils = window.dateUtils || {});
