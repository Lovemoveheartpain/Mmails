const MyPlugin = {
    install(Vue, options) {
        Vue.prototype.times = function (num) {
            var oDate = new Date(num),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
                    addZero(oMin) + ':' + addZero(oSen);

            return oTime;
        };
        Vue.prototype.add = function () {
            alert(1);
        };
        function addZero(num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        };
        Vue.filter("times", function (val) {
            var oDate = new Date(val),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth() + 1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds();
            if (oHour > 12) {
                oHour = "下午 " + (oHour - 12)
            } else if (oHour == 12) {
                oHour = "中午" + oHour
            } else {
                oHour = "上午" + oHour
            }
            var oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + oHour + ':' +
                addZero(oMin) + ':' + addZero(oSen);
            return oTime;
        })
    }
}
export default MyPlugin;
