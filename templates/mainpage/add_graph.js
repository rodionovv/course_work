var list = document.getElementById('list');
var add = document.getElementById('submit');
add.addEventListener('click', function() {
    var filename;
    var fullPath = document.getElementById('file').value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
    }
    var name = document.getElementById("name");
    list.innerHTML += "<li><a href='/graphs/" + filename + "'/>" + name.value +  "</li>";
    name.value = "";
});