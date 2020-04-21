// Changes from String format to DOM Object format
    console.log(localStorage.getItem("currentBook"));
let book = StringToBook(localStorage.getItem("currentBook"));
function ret()
{
    sessionStorage.setItem("from","yes");
    window.location.href = "productPage.html";
	window.history.back();
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
            let book1 = StringToBook((a[z][0]));
            
            if (book1.isbn == book.isbn)//check if book is already in cart
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
}
        

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
	{
		document.getElementById("myBtn").style.display = "block";
	} else {
		document.getElementById("myBtn").style.display = "none";
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}


function loadReviewPage()
{
     document.getElementById("here").innerHTML=
        book.title+"<br>By: &nbsp;" + book.author; 

    document.getElementById("hereAgain").innerHTML = 
        "<img src='/" + book.image+"'/>" + 
        "<br>Price: " + "$"+book.price + 
        "<br>Year: &nbsp;" + book.year + 
        "<br>Topic: &nbsp;" + book.topic + 
        "<br>Pages: &nbsp;"+ book.pages+"<br>";

    document.getElementById("hereAlso").innerHTML = 
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
            let book1 = StringToBook((b[z][0]));
            let count1 = b[z][1];
            console.log(count1, "x ", book1.title );
        }
}