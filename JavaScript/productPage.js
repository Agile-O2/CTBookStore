// Radoslaw Konopka
// Global List
var list;
var saveSort;
var saveSearch

// Sends selected book from the list to another page
function passInfo(clickedBook)
{
    sessionStorage.setItem("saveSearch",saveSearch);
    sessionStorage.setItem("sortSearch",saveSort);
    sessionStorage.setItem("search",document.getElementById("txt1").value);
	// Changes from DOM object to string while conservating format
	let book = list[clickedBook.rowIndex-1].outerHTML;
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the list of given books on table
function printTable()
{
    // Creates a table for book list display
	let table="<tr><th></th><th>Title</th><th>Author</th><th>Price</th><th>Rating</th></tr>";
    let i;
	// Adds all necessary info to all books that match with the search and then displays it as table
	for (i = 0; i <list.length; i++) { 
		table += "<tr onclick='passInfo(this)' ><td id='pic'>";
		table += "<img src='/";
		table += list[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;
		table += "'/>";
		table += "</td><td>";
		table += list[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
		table += "</td><td>";
        table += list[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
		table += "</td><td>";
        table += "$";
		table += list[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;
		table += "</td><td>";
        if (list[i].getElementsByTagName("numOfReviews")[0].childNodes[0].nodeValue != 0)
            table += list[i].getElementsByTagName("averageRating")[0].childNodes[0].nodeValue+"/10";
        else
            table += "No Rating";
        table += "</td></tr>";
	}
	
	// Display the table
	document.getElementById("demo").innerHTML = table;  
}

// Takes the current list and sorts it
function Sort(toSort)
{
    saveSort=toSort;
    // price low to high
    if (toSort == document.getElementById('lowToHigh').innerHTML)
    {
        list.sort(function(a, b){return a.getElementsByTagName("price")[0].childNodes[0].nodeValue - b.getElementsByTagName("price")[0].childNodes[0].nodeValue});
    }
    // price high to low
    if (toSort == document.getElementById('highToLow').innerHTML)
    {
        list.sort(function(a, b){return b.getElementsByTagName("price")[0].childNodes[0].nodeValue - a.getElementsByTagName("price")[0].childNodes[0].nodeValue});
    }
    // bestseller
    if (toSort == document.getElementById('bestseller').innerHTML)
    {
        list.sort(function(a, b){return b.getElementsByTagName("sold")[0].childNodes[0].nodeValue - a.getElementsByTagName("sold")[0].childNodes[0].nodeValue});
    }
    // date newest to oldest
    if (toSort == document.getElementById('newest').innerHTML)
    {
        list.sort(function(a, b){return b.getElementsByTagName("year")[0].childNodes[0].nodeValue - a.getElementsByTagName("year")[0].childNodes[0].nodeValue});
    }
    // date oldest to newest
    if (toSort == document.getElementById('oldest').innerHTML)
    {
        list.sort(function(a, b){return a.getElementsByTagName("year")[0].childNodes[0].nodeValue - b.getElementsByTagName("year")[0].childNodes[0].nodeValue});
    }
    // Rating high to low
    if (toSort == document.getElementById('ratingHighToLow').innerHTML)
    {
        list.sort(function(a, b){return b.getElementsByTagName("averageRating")[0].childNodes[0].nodeValue - a.getElementsByTagName("averageRating")[0].childNodes[0].nodeValue});
    }
    // Rating low to high
    if (toSort == document.getElementById('ratingLowToHigh').innerHTML)
    {
        list.sort(function(a, b){return a.getElementsByTagName("averageRating")[0].childNodes[0].nodeValue - b.getElementsByTagName("averageRating")[0].childNodes[0].nodeValue});
    }
    // Author
    if (toSort == document.getElementById('author').innerHTML)
    {
        list.sort(function(a, b)
            {
            var x = a.getElementsByTagName("author")[0].childNodes[0].nodeValue;
            var y = b.getElementsByTagName("author")[0].childNodes[0].nodeValue;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    // Title
    if (toSort == document.getElementById('title').innerHTML)
    {
        list.sort(function(a, b)
            {
            var x = a.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var y = b.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    printTable();
}

// Creates new list based on user input | Book search
function Search(str)
{
    saveSort="";
    saveSearch=str;
	// Connects to xml file
	var x,xmlhttp,xmlDoc
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "books_catalog.xml", false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 
	
	// Makes a list of all books
	x = xmlDoc.getElementsByTagName("book");
	
	// Resets list
	list = [];
	let i,j;
	
	// Searches for title, author, isbn, topic, and then tags. If a book is found, then it is added to the list and
	// the search goes to another book. If search does not match any case, then book is not added to the list
	for (i=0;i<x.length;i++)
	{
		// This one if then statement checks if there are no books left. If there are none, then this book will not get displayed.
		if ((x[i].getElementsByTagName("stock")[0].childNodes[0].nodeValue) == "0")
		{
			continue;
		}
		if (x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			list.push(x[i]);
			continue;
		}
		if (x[i].getElementsByTagName("author")[0].childNodes[0].nodeValue.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			list.push(x[i]);
			continue;
		}
		if (x[i].getElementsByTagName("isbn")[0].childNodes[0].nodeValue.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			list.push(x[i]);
			continue;
		}
		if (x[i].getElementsByTagName("topic")[0].childNodes[0].nodeValue.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			list.push(x[i]);
			continue;
		}
		
		// Searches through entire list of tags | keywords
		let y = x[i].getElementsByTagName("tags")[0].getElementsByTagName("tag");
		for (j=0;j<y.length;j++)
		{
			if (y[j].textContent.toLowerCase().indexOf(str.toLowerCase()) != -1)
			{
				list.push(x[i]);
				break;
			}
		}
	}
	printTable();
}

var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		mybutton.style.display = "block";
	} else {
		mybutton.style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function loadPage()
{
    console.log();
    if (sessionStorage.getItem("from")=="yes") 
    {
        let find;
        if (sessionStorage.getItem("saveSearch") == null)
            find = "";
        else
            find = sessionStorage.getItem("saveSearch");
        Search(find);
        if (sessionStorage.getItem("sortSearch") == null)
            find = "";
        else
            find = sessionStorage.getItem("sortSearch");
        Sort(find);  
        sessionStorage.setItem("from","no")
        document.getElementById("txt1").value=sessionStorage.getItem("search");
    }

    else
        Search("");  
}

$(document).ready(function(){
  $('.dropdown-submenu a.test').on("click", function(e){
    $(this).next('ul').toggle();
    e.stopPropagation();
    e.preventDefault();
  });
});