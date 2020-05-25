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

function getMovie(){
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster');
    const error = document.getElementById('OMDBerror');
    const posterURL = document.getElementById('posterURL');
    const starring = document.getElementById('starring');
    const story = document.getElementById('story');
    const datepicker = document.getElementById('datepicker');

    fetch(`https://www.omdbapi.com/?t=${title}&apikey=88ec6fee`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(data.Response == "False"){
            poster.src = "/img/no-image.jpg";
            error.style.display = "inline";
        } else {
            error.style.display = "none";
            poster.src = data.Poster;
            starring.value = data.Actors;
            posterURL.value = data.Poster;
            story.value = data.Plot;
            datepicker.value = moment(new Date(data.Released)).format("DD/MM/YYYY");
        }
    })
    .catch(err => error.innerHTML = err);
}

function capitalise(){
    let title = document.getElementById("title");
    let words = title.value.split(" ");
    let newTitle = [];
    words.forEach(word => {
        newTitle.push(word[0].toUpperCase() + word.slice(1));
    });
    title.value = newTitle.join(" ");
}

$("#posterUpload").on("change", () => {
    let form = new FormData();
    form.append("posterUpload", $("#posterUpload")[0].files[0]);
    $.ajax({
        url: "/video/upload",
        type: "POST",
        data: form,
        contentType: false,
        processData: false,
        "success": data => {
            $("#poster").attr("src", data.file);
            $("#posterURL").attr("value", data.file);
            if(data.err){
                $("#posterErr").show();
                $("#posterErr").text(data.err.message);
            } else {
                $("#posterErr").hide();
            }
        }
    })
});