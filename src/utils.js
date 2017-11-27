exports.showSnackBar = function(text, type = "normal") {
    let x       = document.getElementById("snackbar");
    x.innerHTML = text;
    x.className = "show";
    setTimeout(function () {
            x.className = x.className.replace("show", "");
            x.innerHTML = "";
        }
        , 3000);
};

