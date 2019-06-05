// 控制报名系统开放关闭

// 获取数据data中包含了课程和学生的所有数据
$.post("/admin", (data) => {
    // console.log(data);
    // 检查返回数据
    if (data != "-1") {
        showState(data.isOpen);
    }
})

// 显示系统状态
function showState(isOpen) {
    if(isOpen) {
        $("#sysState").html("报名进行中").addClass("text-success");
        $("#onSys").addClass("disabled");
        $("#offSys").removeClass("disabled");
    } else {
        $("#sysState").html("报名系统已关闭").removeClass("text-success");
        $("#offSys").addClass("disabled");
        $("#onSys").removeClass("disabled");
    }
}

$("#onSys").on("click", () =>{
    // 按钮处于disable状态，阻止发送请求
    if ($("#onSys").hasClass("disabled")) return;

    $.get("/admin/onSys", (data) => {
        if (data.result === 1) {
            $("#sysState").html("报名进行中").addClass("text-success");
            $("#onSys").addClass("disabled");
            $("#offSys").removeClass("disabled");
        } else {
            alert("服务器错误，请联系管理员");
        }
    });
})

$("#offSys").on("click", () => {
    if ($("#offSys").hasClass("disabled")) return;
    
    if (confirm("报名系统将被关闭！！如果是误操作，请点击取消")) {
        $.get("/admin/offSys", (data) => {
            if(data.result === 1) {
                $("#sysState").html("报名系统未开放").removeClass("text-success");
                $("#offSys").addClass("disabled");
                $("#onSys").removeClass("disabled");
            } else {
                alert("服务器错误，请联系管理员");
            }
        });
    }
})