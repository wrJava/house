(function(){
var ctbAll=document.querySelector(".car_f input");
var chbs=document.querySelectorAll(".car_list_content .spinfo input");
ctbAll.onclick=function(){ //全选
    var ctbAll=this;
    for(var chb of chbs){
        chb.checked=ctbAll.checked;
       
    }
    subTotal();
}
    //循环单选
    for(var chb of chbs){
        chb.onclick=function(){
            var chb=this;
            if(chb.checked==false){
            ctbAll.checked=false;
        }else{
            var unchecked=document.querySelector(".car_list_content .spinfo input:not(:checked)");
            if(unchecked==null){
                    ctbAll.checked=true;
                }
            }
            subTotal();
        }
    }

var spanDels=document.querySelectorAll(".car_add>span:first-child");
var spanAdds=document.querySelectorAll(".car_add>span:last-child");
var spanXjs=document.querySelectorAll(".car_add");

for(var spanDel of spanDels){
    spanDel.onclick=function(){
        var spanDel=this;
        // console.log(spanDel,this,222 );
        var inp= this.nextElementSibling.querySelector("input").value;
        if(inp>0){
            inp--;
        }
        var spinp=this.nextElementSibling.querySelector("input").value=inp;
        var xj=this.parentElement.nextElementSibling.innerHTML.replace("￥","");
        var price=this.parentElement.previousElementSibling.innerHTML.replace("￥","");
        xj=spinp*price;
        this.parentElement.nextElementSibling.innerHTML=`￥${xj.toFixed(2)}`;
        subTotal();
        // console.log(xj)
    }
}
for(var spanAdd of spanAdds){
     spanAdd.onclick=function(){
         var spanAdd=this;
         var inp=this.previousElementSibling.querySelector("input").value;
         if(inp<10){
             inp++;
         }
        var spinp= this.previousElementSibling.querySelector("input").value=inp;
        var xj=this.parentElement.nextElementSibling.innerHTML.replace("￥","");
        var price=this.parentElement.previousElementSibling.innerHTML.replace("￥","");
        xj=spinp*price;
        this.parentElement.nextElementSibling.innerHTML=`￥${xj.toFixed(2)}`;
        subTotal();
     }
 }
//  购物车全选
function subTotal(){
    var sumall=0;
    for(var spanxj of spanXjs){
        if(spanxj.parentElement.querySelector("input[type='checkbox']").checked){
        var zxj=parseFloat(spanxj.nextElementSibling.innerHTML.replace("￥",""));
        sumall+=zxj;
        }
     }
     document.querySelector(".car_f p:nth-child(5)>span").innerHTML=sumall.toFixed(2);
}
})()

//删除
var delAll=document.querySelectorAll(".car_list_content>ul div:last-child a");
// console.log(delAll,"删除")
for(let del of delAll){
    del.onclick=function(){
        var list=document.querySelector(".car_list_content>ul li")
        //  console.log(list,121212121)
        list.remove();
    }
}