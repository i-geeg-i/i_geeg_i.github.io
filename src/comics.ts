import { json } from 'body-parser';
import { formatDistanceToNow } from 'date-fns';
interface APIResponse{
    success : boolean;
    json_text : string;
    
}
const btn_to_find_comis  : HTMLElement = document.getElementById("get-comics-btn") as  HTMLElement;
const input_element  : HTMLInputElement = document.getElementById("email") as  HTMLInputElement;
const comics_block : HTMLElement = document.getElementById("comics") as  HTMLElement;
const comics_content_block : HTMLElement = document.getElementById("comicsContent") as  HTMLElement;
input_element.addEventListener("input", ()=>{
    if (input_element.value.includes("@innopolis.university")){
        input_element.style.backgroundColor = "white";
        input_element.style.color = "black";
    }
    else{
        input_element.style.backgroundColor = "red";
        input_element.style.color = "white";
    }
});
btn_to_find_comis.addEventListener("click", async () => {
    let email : string = prepareData(input_element.value);
    var t : APIResponse = await getComics(email) as APIResponse;
    if (t.success === false){
        (document.getElementById("wrong-email") as HTMLElement).setAttribute("style","display:block");
    }
    else{
        (document.getElementById("wrong-email") as HTMLElement).setAttribute("style","display:none");
        if (document.getElementById(email) as HTMLElement != null){
            window.location.href = window.location.href.substring(0,window.location.href.indexOf('#')) + "#"+email;
        }
        else{
            let div : HTMLElement = document.createElement("div");
            div.setAttribute('class','comics-block');
            let img : HTMLElement= document.createElement("img");
            div.appendChild(img);
            img.setAttribute('id', email);
            img.title = prepareData(JSON.parse(t.json_text)['safe_title']);
            img.setAttribute('alt', prepareData(JSON.parse(t.json_text)['alt'])); 
            img.setAttribute('src', prepareData(JSON.parse(t.json_text)['img']));
            comics_content_block.appendChild(div);
            let event : string = formatDistanceToNow(new Date(Date.UTC(JSON.parse(t.json_text)['year'], JSON.parse(t.json_text)['month'],JSON.parse(t.json_text)['day'])).toLocaleDateString());
            let text : HTMLElement = document.createElement("p");
            text.textContent = event + " ago (" + new Date(Date.UTC(JSON.parse(t.json_text)['year'], JSON.parse(t.json_text)['month'],JSON.parse(t.json_text)['day'])).toLocaleDateString() +") "  + img.title;
            div.appendChild(text);
            comics_block.style.display = "block";
        }
    }
});
async function getComics(email : string) : Promise<APIResponse>{
    let id : string = await fetchId(email) as string;
    if (id == "Wrong email"){
        let resp : APIResponse = {
            success : false,
            json_text : "Wrong email"
        }
        return resp;
    }
    let comics : string = await fetchComics(id) as string;
    let resp : APIResponse = {
        success : true,
        json_text : JSON.stringify(comics)
    }
    return resp;
}
async function fetchId(email : string): Promise<string>{
    if (email.includes("@innopolis.university")){
        const params : URLSearchParams = new URLSearchParams();
        params.append('email', email);
        let resp : string = await fetch('https://fwd.innopolis.university/api/hw2?' + params.toString())
            .then(r => r.json()) as string;
        return resp
    }
    else{
        return "Wrong email";
    }
}
function fetchComics(id : string) : Promise<string>{
    const params : URLSearchParams = new URLSearchParams();
    params.append('id', id);
    return fetch('https://fwd.innopolis.university/api/comic?' + params.toString())
        .then(r => r.json()) as Promise<string>;
}
function prepareData(value : string) : string{
    return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

}