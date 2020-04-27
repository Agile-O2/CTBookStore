// Radoslaw Konopka
// Global productPageList
// Contains current list of books on the page
var productPageList;
// These two act like query to save user's input/choices on productPage
var saveSort;
var saveSearch

// Sends selected book from the productPageList to another page
function passInfo(clickedBook)
{
    // Save user's choices/input
    sessionStorage.setItem("saveSearch",saveSearch);
    sessionStorage.setItem("sortSearch",saveSort);
    sessionStorage.setItem("search",document.getElementById("searchTextbox").value);
	// Changes from DOM object to string while conservating format
	let book = JSONToString(productPageList[clickedBook.rowIndex-1]);
	// Stores the new string in localStorage
	localStorage.setItem("currentBook",book); 
	// Go to new book
	window.location.href = "reviewPage.html";
}

// Prints the productPageList of given books on table
function printTable()
{
    // Creates a table for book productPageList display
	let table="<tr><th></th><th>Title</th><th>Author</th><th>Price</th><th>Rating</th><th></th></tr>";
    let i;
	// Adds all necessary info to all books that match with the search and then displays it as table
	for (i = 0; i <productPageList.length; i++) { 
		table += "<tr><td id='pic' onclick='passInfo(parentNode)';>";
		table += "<img src='/";
		table += productPageList[i].image;
		table += "'/>";
		table += "</td><td>";
		table += productPageList[i].title;
		table += "</td><td>";
        table += productPageList[i].author;
		table += "</td><td>";
        table += "$";
		table += productPageList[i].price;
		table += "</td><td>";
        // Show different if no rating yet
        if (productPageList[i].numOfReviews != 0)
            table += productPageList[i].averageRating+"/10";
        else
            table += "No Rating";
        table += "</td><td>";
		table += "<button id='view' onclick='passInfo(parentNode.parentNode)';>View</button>";
		table += "</td></tr>";
	}
	
	// Display the table
	document.getElementById("demo").innerHTML = table;  
}

// Takes the current productPageList and sorts it
function Sort(toSort)
{
    // Save user's preference
    saveSort=toSort;
    // price low to high
    if (toSort == document.getElementById('lowToHigh').innerHTML)
    {
        productPageList.sort(function(a, b){return a.price - b.price});
    }
    // price high to low
    if (toSort == document.getElementById('highToLow').innerHTML)
    {
        productPageList.sort(function(a, b){return b.price - a.price});
    }
    // bestseller
    if (toSort == document.getElementById('bestseller').innerHTML)
    {
        productPageList.sort(function(a, b){return b.sold - a.sold});
    }
    // date newest to oldest
    if (toSort == document.getElementById('newest').innerHTML)
    {
        productPageList.sort(function(a, b){return b.year - a.year});
    }
    // date oldest to newest
    if (toSort == document.getElementById('oldest').innerHTML)
    {
        productPageList.sort(function(a, b){return a.year - b.year});
    }
    // Rating high to low
    if (toSort == document.getElementById('ratingHighToLow').innerHTML)
    {
        productPageList.sort(function(a, b){return b.averageRating - a.averageRating});
    }
    // Rating low to high
    if (toSort == document.getElementById('ratingLowToHigh').innerHTML)
    {
        productPageList.sort(function(a, b){return a.averageRating - b.averageRating});
    }
    // Author
    if (toSort == document.getElementById('author').innerHTML)
    {
        productPageList.sort(function(a, b)
            {
            var x = a.author;
            var y = b.author;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    // Title
    if (toSort == document.getElementById('title').innerHTML)
    {
        productPageList.sort(function(a, b)
            {
            var x = a.title;
            var y = b.title;
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            });
    }
    // Resets Display
    printTable();
}

// Creates new productPageList based on user input | Book search
function Search(str)
{
    // Saves user's preference
    saveSort="";
    saveSearch=str;
    // Gets all the books from data
    let tempBooks = getAllItems("books");
    console.log(tempBooks);
	// Resets productPageList
	productPageList = [];
	let i,j,tempBook;
	length = tempBooks.length;
	// Searches for title, author, isbn, topic, and then tags. If a book is found, then it is added to the productPageList and
	// the search goes to another book. If search does not match any case, then book is not added to the productPageList
	for (i=0; i<length; i++)
	{
        tempBook = tempBooks[i];
		// This one if then statement checks if there are no books left. If there are none, then this book will not get displayed.
		if (tempBook.stock == "0")
		{
			continue;
		}
		if (tempBook.title.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.author.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.isbn.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		if (tempBook.topic.toLowerCase().indexOf(str.toLowerCase()) != -1)
		{
			productPageList.push(tempBook);
			continue;
		}
		
		// Searches through entire productPageList of tags | keywords
		let tagLength = tempBook.tags.tag.length;
		for (j=0;j<tagLength;j++)
		{
			if (tempBook.tags.tag[j].toLowerCase().indexOf(str.toLowerCase()) != -1)
			{
				productPageList.push(tempBook);
				break;
			}
		}
	}
    // Create Display
	printTable();
}

// Shows button to go back top
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}
// Returns to top page
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function queryListenings()
{
    // Shows list for browsing
    $(document).ready(function(){
        $('.dropdown-submenu a.test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
      });
    });   
    
    // Search on enter
    $("#searchTextbox").keyup(function(e) {
        if (e.which == 13) {
            $(".searchButton").click();
        }
    });
    
    // Button to go up
    window.onscroll = function() {scrollFunction()};
}

// Will load user's input/choices if he/she came back from reviewPage
// Else it will create fresh page
function loadProductPage()
{
    if (sessionStorage.getItem("from")=="yes") 
    {
        // Goes back to previous state of page
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
        document.getElementById("searchTextbox").value=sessionStorage.getItem("search");
    }
    else
        Search("");  
    queryListenings();
}

