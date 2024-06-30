const names : string[] = ["GEEG", "i-geeg-i", "Egor Glebov"];
var nowName : number = 0;
document.addEventListener('DOMContentLoaded', function() {
    setInterval(()=>{
        nowName += 1;
        if (nowName==names.length){
            nowName=0;
        }
        (document.getElementById("name") as HTMLElement).textContent = names[nowName];
    },2000)
});