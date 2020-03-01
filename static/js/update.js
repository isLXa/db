function update() {
         $.ajax({
             type: "POST",
             url: "update",
             data: {"content":$("#message").val(),"username": UsernameKey},
             dataType: "json",
             async:true,
             success: function(data){
                 var json = JSON.stringify(data);
                 var jsonObj = $.parseJSON(json);
                 for(var key in jsonObj){
                     var span=document.createElement("span");
                     span.innerHTML=jsonObj[key]+"&nbsp;&nbsp;&nbsp;";
                     $('#board').append(span);
                 }
                    var b=document.createElement("br");
                    $('#board').append(b);
             }
         });
}
// let spn = document.getElementById("hello")
// spn.innerText = "欢迎您："+UsernameKey;
// function showAllData() {
//     $.ajax({
//         type : "POST",
//         url : "show",
//         data: {},
//         dataType: "json",
//         async: true,
//         success: function(data){
//
//         }
//     })
//
// }