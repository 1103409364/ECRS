// 渲染统计图表

// 获取数据data中包含了课程和学生的所有数据
$.post("/admin", (data) => {
    // console.log(data);
    // 检查返回数据
    if (data != "-1") {
        var barLabels = [];
        var barData = [];
        // 未修改密码计数
        var defaultPwd = 0;

        var pieData = [0, 0];
        pieData[1] = data.student.length;

        data.course.forEach(item => {
            barLabels.push(item.name);
            barData.push(item.number);
        });

        data.student.forEach(item => {
            if (item.myCourse.length > 0) {
                pieData[0]++;
                pieData[1]--;
            }

            if (item.password.isInitial == "是") {
                defaultPwd++;
            }
        })

        // showState(data.isOpen);
        drawBar(barLabels, barData);
        drawPie(pieData);
        drawTable(data.student.length, data.course.length, pieData[0], pieData[1], defaultPwd);
        hideTips("");
    }
})

function drawBar(barLabels, barData) {
    var ctx = document.getElementById("myBarChart");
    var max = Math.max.apply(null, barData);
    var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: barLabels, //课程名称，数组
            datasets: [{
                label: "剩余数",
                backgroundColor: "rgba(2,117,216,0.8)",
                borderColor: "rgba(2,117,216,1)",
                data: barData, //课程剩余数量,数组
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    course: {
                        unit: 'course'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: barLabels.length
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: max,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
}

function drawPie(pieData) {
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["已报名", "未报名"],
            datasets: [{
                data: pieData,
                backgroundColor: ['#007bff', '#dc3545'],
            }],
        },
    });
}
// 参数：学生总数	课程总数	已报名人数	未报名人数	密码未修改人数
function drawTable(a, b, c, d, e) {
    $("#collectTable td").eq(0).html(a);
    $("#collectTable td").eq(1).html(b);
    $("#collectTable td").eq(2).html(c);
    $("#collectTable td").eq(3).html(d);
    $("#collectTable td").eq(4).html(e);
}

function hideTips(tip) {
    $("#tips").html(tip);
}