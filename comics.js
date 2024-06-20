const form = document.getElementById("form-comics");
const btn = document.getElementById("get-comics-btn");
const inp = document.getElementById("email");
const comicsBlock = document.getElementById("comics")
const comicsContentBlock = document.getElementById("comicsContent")
form.addEventListener("change", ()=>{
    if (inp.value.includes("@innopolis.university")){
        inp.style.backgroundColor = "white";
        inp.style.color = "black";
    }
});
btn.addEventListener("click", async () => {
    let email = prepareData(inp.value);
    var t = await getComics(email);
    if (t == "Wrong email!"){
        document.getElementById("wrong-email").setAttribute("style","display:block")
    }
    else{
        document.getElementById("wrong-email").setAttribute("style","display:none")
        if (document.getElementById(email) != null){
            window.location.href = window.location.href.substring(0,window.location.href.indexOf('#')) + "#"+email;
        }
        else{
            let div = document.createElement("div");
            div.setAttribute('class','comics-block');
            let img = document.createElement("img");
            div.appendChild(img);
            img.setAttribute('id', email);
            img.title = prepareData(t['safe_title']);
            img.setAttribute('alt', prepareData(t['alt']));
            img.setAttribute('src', prepareData(t['img']));
            comicsContentBlock.appendChild(div);
            let event = new Date(Date.UTC(t['year'], t['month'],t['day'])).toLocaleDateString();
            let text = document.createElement("p");
            text.textContent = event + " " +  img.title;
            div.appendChild(text);
            comicsBlock.style.display = "block";
        }
    }
});
async function getComics(email){
    let id = await fetchId(email);
    if (id == "Wrong email!"){
        return id;
    }
    let t = await fetchComics(id);
    return t;
}
function fetchId(email){
    if (email.includes("@innopolis.university")){
        const params = new URLSearchParams();
        params.append('email', email);
        return fetch('https://fwd.innopolis.university/api/hw2?' + params.toString())
            .then(r => r.json());
    }
    else{
        return "Wrong email!";
    }
}
function fetchComics(id){
    const params = new URLSearchParams();
    params.append('id', id);
    return fetch('https://fwd.innopolis.university/api/comic?' + params.toString())
        .then(r => r.json());
}
function prepareData(value){
    return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

}