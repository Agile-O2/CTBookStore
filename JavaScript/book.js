// Book Object

// Gets all books from JSON file
function getAllBooks()
{
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'books_catalog.json', true);
    xobj.onreadystatechange = function () 
    {
        if (xobj.readyState == 4 && xobj.status == "200")
        {
            localStorage.setItem("allBooks",xobj.responseText);
        }
    };
    xobj.send(null);  
}
// String to Book (used for local/session storage)
function StringToBook(source)
{
    return JSON.parse(source);
}
// Book to String (used for local/session storage)
function BookToString(source)
{
    return JSON.stringify(source);
}
