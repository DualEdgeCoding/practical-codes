
function checkLastLanguage(){
    let languages = document.getElementsByName("language");
    let error = document.getElementById("languageErr");
    let ticks = 0;
    languages.forEach((langauge) => {
        if(langauge.checked) ticks++;
    });
    if(ticks == 0) {
        error.style.display = "block";
        document.getElementById("btnSubmit").disabled = true;
    } else {
        error.style.display = "none";
        document.getElementById("btnSubmit").disabled = false;
    }
}