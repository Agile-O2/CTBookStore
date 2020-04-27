// JSON Object

// Gets the data from JSON file
function openFile(file)
{
    var xobj = new XMLHttpRequest();
    var where = "../JSON/" + file + ".json";
    xobj.open('GET', where, false);
    xobj.send(null);  
    return xobj.responseText;
}

// Returns all data to the caller
function getAllItems(file)
{
    return StringToJSON(openFile(file))[file];
}
// Gets last item in the list
function getlastItem(file)
{
    let data = getAllItems(file);
    return data[data.length - 1];
}
// String to JSON
function StringToJSON(source)
{
    return JSON.parse(source);
}
// JSON to String (used for local/session storage)
function JSONToString(source)
{
    return JSON.stringify(source);
}
