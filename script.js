const names = ["GEEG", "i-geeg-i", "Egor Glebov"];
var nowName = 0;
setInterval(()=>{
    nowName += 1;
    if (nowName==names.length){
        nowName=0;
    }
    document.getElementById("name").textContent = names[nowName];
},2000)