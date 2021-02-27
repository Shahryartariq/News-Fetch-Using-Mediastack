console.log("Working Fine 😊");

// https://newsapi.org/ not work
// bf23c573c2154a28bb86ce3f0ccf679e

// we use https://mediastack.com/
// c1c3b9a8c87595b4b63bf94c0e112270

// http://api.mediastack.com/v1/news?access_key=c1c3b9a8c87595b4b63bf94c0e112270&countries=us

// Initialize the news api parameters
let apiKey = 'c1c3b9a8c87595b4b63bf94c0e112270';
let countryFilter = 'us'


// Due to some reason this api is not working So, i copied the json file and use it for this project


newsAccordion = document.getElementById("newsAccordion");

// Creating a JSON XHR request
const XHR = new XMLHttpRequest();
// XHR.open("GET", "./data.json", true);
XHR.open("GET", `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=${countryFilter}`, true);
XHR.onprogress = function () {
  console.log("Data Loading ...");
};
XHR.onload = function () {
  if (this.status == 200) {
    let DataObj = JSON.parse(this.responseText);
    console.log(DataObj);
    // let articles = DataObj.articles;
    let articles = DataObj.data;
    console.log(articles)
    let newHTML = ""
    articles.forEach(function(element, index) {
      let news = `
      <div class="card">
      <div class="card-header" id="heading${index}">
          <h2 class="mb-0">
          <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
              aria-expanded="false" aria-controls="collapse${index}">
             <b>Breaking News ${index+1}:</b> ${element["title"]}
          </button>
          </h2>
      </div>

      <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
          <div class="card-body"> ${element["description"]}  <a href="${element['url']}" target="_blank" > Read more ...</a>  </div>
      </div>
  </div>`;

      newHTML+=news;
    });
    newsAccordion.innerHTML = newHTML;
  } 
  
  else {
    console.log("Some error occured");
  }
};

XHR.send();

