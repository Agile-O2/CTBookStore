// Changes from String format to JSON format
let book = StringToJSON(localStorage.getItem("currentBook")); 
// Lets browser know that we came from review page
function ret()
{
    sessionStorage.setItem("from","yes");
    window.location.href = "productPage.html";
	window.history.back();
}

// Open a page with a selected similar book
function passInfo(clickedBookPosition)
{
    let simBookList = getSimilarBooks();
    let index = parseInt(clickedBookPosition);
    let book = JSONToString(simBookList[index]);
	// Stores the new string in localStorage
    localStorage.setItem("currentBook",book);
	// Go to new book
	window.location.href = "reviewPage.html";
}

//Daniel Pobidel
function addToCart()
{
    //if no books in cart, create the cart and add current book to it alone
    if(localStorage.getItem("cart") == null) 
    {
        console.log("cart was empty, cart created and book added");
        let newCart =[[localStorage.getItem("currentBook"),1]];
        // Turn inner elements into strings
        for (let z = 0; z<newCart.length;z++)
        {
            newCart[z] = newCart[z].join('$$$');
        }
        localStorage.setItem("cart",newCart);
        // Turn outer elements into strings
        newCart=newCart.join("@@@");
    }
    else
    {
        let bookCheck = 0; 
        
        // Get current cart from local storage, split, and check if book already there
        let a=localStorage.getItem("cart").split('@@@');
        
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<a.length;z++)
        {
            a[z] = a[z].split('$$$');
            let bookTemp = StringToJSON((a[z][0]));
            
            if (bookTemp.isbn == book.isbn)//check if book is already in cart
            {
                if(a[z][1] < parseInt(book.stock))//check stock
                {
                    a[z][1]++;
                }
                bookCheck=1; 
            }
        }
        
        if(bookCheck==0)//if book wasn't already in cart, add it
        {
            a.push([localStorage.getItem("currentBook"),1]);
        }
        
        //put 2d array back into 1d, then back into string to store into cart with updated count
        for (let z = 0; z<a.length;z++)
        {
            a[z] = a[z].join('$$$');
        }
        a=a.join("@@@");
        localStorage.setItem("cart",a);
    
        //log all of carts contents in console
        testCart();
    } 
    // Get the snackbar DIV || showss a pop up box whenever user adds book to the page
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    var snackBarText = StringToJSON(localStorage.getItem("currentBook")).title + " was added to your cart!";
    x.innerHTML = snackBarText;
    x.className = "show";
    updateCartDisplay();
    
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Shows button to go up
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		document.getElementById("topBtn").style.display = "block";
	} else {
		document.getElementById("topBtn").style.display = "none";
	}
}

// Goes to the top of the page when button pressed
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// Display the page on load
function loadReviewPage()
{
    loadSimilarBooks();
     document.getElementById("titleAuthor").innerHTML=
        book.title+"<br>By: &nbsp;" + book.author; 

    document.getElementById("bookDetails").innerHTML = 
        "<img src='/" + book.image+"'/>" + 
        "<br>Price: " + "$"+book.price + 
        "<br>Year: &nbsp;" + book.year + 
        "<br>Topic: &nbsp;" + book.topic + 
        "<br>Pages: &nbsp;"+ book.pages+"<br>";

    document.getElementById("bookDescription").innerHTML = 
        "<br>Description:&nbsp; " + book.description + 
        "<br><br>ISBN: &nbsp;" + book.isbn;

    window.onscroll = function() {scrollFunction()};   
    
    /*This is for the popup window for the reviews-*/
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("reviewButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        console.log(book.numOfReviews);
        for (let j=0; j<book.numOfReviews; j++)
        {
            document.getElementById("reviewsFromXML").innerHTML = document.getElementById("reviewsFromXML").innerHTML + 
            "<br><strong>Name: </strong> " + book.reviewList.review[j].nickname + 
            "<br><strong>Review:  </strong>" + book.reviewList.review[j].descriptionReview + 
            "<br><p style='color:'><strong>Rating: </strong>" + book.reviewList.review[j].rating + "/10</p>";
        }
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("reviewsFromXML").innerHTML="";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          document.getElementById("reviewsFromXML").innerHTML="";
      }
    }
}

/*this function opens cart in local storage, splits elements into 1d array,
then splits that further into a 2d array where b[x][0] is book and b[x][1] is quantity
of the book stored. The array is read into console to if monitor books being added to cart correctly*/
function testCart(){
        console.clear();
        // Get from localstorage and turn into 1 outer array
        let b=localStorage.getItem("cart").split('@@@');
        // Change the 1 outer array into 2 dim array
        for (let z = 0; z<b.length;z++)
        {
            b[z] = b[z].split('$$$');
        }
        
        // Check results
        console.log("books in cart:");
        for (let z = 0; z<b.length;z++)
        {
            let book1 = StringToJSON((b[z][0]));
            let count1 = b[z][1];
            console.log(count1, "x ", book1.title );
        }
}

// Gets similar books based on category
function getSimilarBooks()
{
    var bks = getAllItems("books");
    var curList = [];
    var count = 0;
    var curbook = StringToJSON(localStorage.getItem("currentBook"));
    while (count < bks.length && curList.length < 4)
    {
        console.log(curList.length);
        if (curbook.topic == bks[count].topic && curbook.isbn != bks[count].isbn)
        {
            curList.push(bks[count]);
        }
        count++;
    }
    console.log(curList);
    return curList;
}

// Display similar books
function loadSimilarBooks(){
    similarBookList = getSimilarBooks();
    
    let simBookDisplay = "";
    for(let i =0; i<similarBookList.length; i++){
        simBookDisplay += "<div id='simBook' class='col'>";
        simBookDisplay +=  "<img id='simImg' onclick='passInfo(" + i + ")' src='/" + similarBookList[i].image+"'/>";
        simBookDisplay += "<br>"
        simBookDisplay +=  similarBookList[i].title;
        simBookDisplay += "<br>";
        simBookDisplay += "By: " + similarBookList[i].author;
        simBookDisplay += "<br>";
        simBookDisplay += "$" + similarBookList[i].price;
        simBookDisplay += "</div>";
    }
    for(let i=0; i<(4-similarBookList.length); i++){
        simBookDisplay += "<div id='simBook' class='col'>";
        simBookDisplay += "</div>";
    }
    document.getElementById("simBooksRow").innerHTML=simBookDisplay;
}