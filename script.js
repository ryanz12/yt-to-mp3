const ytLink = document.querySelector("#ytlink");
const search = document.querySelector("#search");
const searchOutput = document.querySelector("#searchOutput");
const downloadLink = document.querySelector("#downloadLink");

function ytLinkParser(link){
    return link.match(/(?<=v=|\/)([a-zA-Z0-9_-]{11})(?=&|$|\/)/); 
}

async function downloadHandler(){
    const ytid = ytLink.value;
    console.log(ytLinkParser(ytid)[0]);
    const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${ytLinkParser(ytid)[0]}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6bcc164fafmshc18939a9d3fd393p19065bjsnd0ed3f9e29e8',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        searchOutput.innerHTML = 'Success';
        let a = document.createElement('a');

        a.href = result.link;
        a.target = '_blank';
        a.textContent = 'Click this link to download';
        downloadLink.appendChild(a);
    } catch (error) {
        console.error(error);
        searchOutput.innerHTML = 'Error';
    }

    ytLink.value = '';
}

search.addEventListener("click", downloadHandler);