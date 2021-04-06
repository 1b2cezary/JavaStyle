//domana strony
const domain = "https://1b2cezary.github.io/JavaStyle"

//sprawdzam szerokość ekranu
function getViewport () {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    if (width <= 576) return 'xs'
    if (width <= 768) return 'sm'
    if (width <= 992) return 'md'
    if (width <= 1200) return 'lg'
    return 'xl'
  }

//ustawiam stopkę na stronie
function setFooter(){
    var width;
    //ustawiam wielkość zdjęcia w zależności od szerokości ekranu
    switch(getViewport()){
        case 'xs':
        case 'sm':
        case 'md':
            width = "width: 200%;";
            break;
        case 'lg':
        case 'xl':
            width = "width: 100%;";
            break;
    }
    //podmieniam zawartość footer o id "footerConteiner"
    document.getElementById("footerConteiner").innerHTML = '<a href="https://www.oracle.com/pl/java/technologies/javase-downloads.html" target="_blank" rel="noopener noreferrer"><img style="'+width+'" src="img/downloadJava.jpg" alt="Kliknij tutaj aby pograć jave!"></a><div id="footer">Cezary Klauza cezary10klauza@gmail.com</div>'
}

//ustawiam artykół
function setArticle(){
    //pobieram stałą url
    const url = window.location.href;
    //zmienne
    var isIdSeted = false;
    var idSet;
    var id = [];
    //sprawdzam czy są nałożone zmienne getem
    for(i=0; i<url.length; i++){
        if(url[i]=='?'){
            isIdSeted=true;
            idSet=i;
        }
    }
    //jeżeli tak
    if(isIdSeted){
        //ustawiam w id wartość
        for(i=0; i<2; i++){
            var element = "";
            for(j=idSet+1; j<url.length; j++){
                if(url[j]=='='){ 
                    idSet=j;
                    break;
                }
                //ustawiam element
                element += url[j];
            }
            //dodaje element do tablicy
            id.push(element);
        }
        //sprawdzam czy napewno wartość w get'cie to id
        if(id[0]!="id") window.location.replace("index.html");
        //jeżeli tak
        else{
            //łącze się z plikiem json
            fetch("./articles.json")
            //wyjmuje z niego wartość i zamieniam ją na json array
            .then(response => response.json())
            //wykonuje funkcje z danymi z pliku json
            .then(data => {
                //sprawdzam czy id nie jest za duże
                if(id[1]>data.length-1) window.location.replace("index.html");
                //jeżeli nie jest
                else{
                    //ustawiam tytuł w nagłówku
                    document.getElementById("title").innerHTML = '<h1>'+data[id[1]].title+'</h1>';
                    //ustawiam kontent artykułu
                    document.getElementById("article").innerHTML = data[id[1]].content;
                    //ustawiam tytuł strony
                    document.title = data[id[1]].title;
                }
            });
        }
        
    }
    //jeżeli id nie jest ustawione 
    else{
        window.location.replace("index.html");
    }
}

//ustawia w navbar'rze liste ciekawostek
function setArticlesList(){
    var htmlCode = "";
    fetch("./articles.json")
    .then(response => response.json())
    .then(data =>{
        data.forEach(e => {
            htmlCode += '<a href="'+domain+'/ciekawostka.html?id='+e.id+'" class="dropdown-item">'+e.title+'</a>'
        });
        document.getElementById("articleList").innerHTML = htmlCode;
    });
}

function setArticlesListDiv(){
    var htmlCode = "";
    fetch("./articles.json")
    .then(response => response.json())
    .then(data =>{
        var idsArray = []
        while(true){
            if(idsArray.length==3) break;
            var isIdInArray = false;
            var random = Math.floor(Math.random() * data.length)
            for(j=0; j<idsArray.length; j++){
                if(idsArray[j]==random) isIdInArray=true;
            }
            if(!isIdInArray){
                idsArray.push(random)
                htmlCode += '<div id="articlesConteiner"><a href="'+domain+'/ciekawostka.html?id='+data[random].id+'"><li class="col-11 col-lg-5" style="margin-bottom: 5vh;"><h2>'+data[random].title+'</h2>'+data[random].description+'</li></a></div>';
            }
            
        }
        document.getElementById("articleListUl").innerHTML = htmlCode;
    });
}

//ustawiam ikonę strony
function setIcon(){
    var link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'img/icon.png';
    document.getElementsByTagName('head')[0].appendChild(link);
}

//funkcja odtwarzająca inne funkcje
function onLoad(isArticle){
    hljs.highlightAll();
    setFooter();
    setArticlesList();
    if(isArticle) setArticle();
    else setArticlesListDiv();
    setIcon();
}
