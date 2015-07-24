//$(document).ready(function(){

var vm = avalon.define({
    $id: "timeline",
    items: [],
    page: 1,
    load: function () {
        $.ajax({
            url: "/data/?page=" + vm.page.toString(),
            method: "get",
            dataType: "json",
            success: function (data) {
                console.log(data);
                console.log(data == []);
                if (!data.length) {
                    return;
                }
                for (var i = 0; i < data.length; i++) {

                    if (data[i].pk % 2 == 0) {
                        data[i]._class = "timeline-inverted";
                    }
                    else {
                        data[i]._class = "timeline-left";
                    }
                    d = new Date(data[i].fields.create_time);
                    data[i].fields.create_time = d.getFullYear() + "-" +
                        (parseInt(d.getMonth()) + 1).toString() + "-" +
                        d.getDate() + " " + d.getHours() + ":";
                    if(d.getMinutes() < 10){
                        data[i].fields.create_time += "0" + d.getMinutes();
                    }
                    else{
                        data[i].fields.create_time += d.getMinutes();
                    }
                    vm.items.push(data[i]);
                }
                vm.page++;
                var items = $("[rel=tooltip]");

                var size = $(window).width();
                for (i = 0; i < items.length; i++) {
                    item = $(items[i]);

                    if (item.hasClass('invert') && size >= 767) {
                        item.tooltip({placement: 'left'});
                        item.css("cursor", "pointer");
                    } else {
                        item.tooltip({placement: 'rigth'});
                        item.css("cursor", "pointer");
                    }

                }

            }
        })
    }
});

vm.load();
var m = -1;
$(window).scroll(function () {
    var l = $(this).scrollTop();
    if (l > m) {
        m = $(this).scrollTop();
    }
    if (l + $(window).height() + 20 >= $(document).height() && l > 20 && l >= m) {
        vm.load();
    }
});
//});