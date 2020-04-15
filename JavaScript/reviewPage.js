// Changes from String format to DOM Object format
let book = new DOMParser().parseFromString(localStorage.getItem("currentBook"), "text/xml");
function ret()
{
    sessionStorage.setItem("from","yes");
    window.location.href = "productPage.html";
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
            let book1 = new DOMParser().parseFromString((a[z][0]), "text/xml");
            let result1 = book1.getElementsByTagName("isbn")[0].childNodes[0].nodeValue;
            
            if (result1 == book.getElementsByTagName("isbn")[0].childNodes[0].nodeValue)//check if book is already in cart
            {
                
                let stock = book.getElementsByTagName("stock")[0].childNodes[0].nodeValue;
                if(a[z][1] < parseInt(stock))//check stock
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
        


// Extract info from new DOM Object however you want
document.getElementById("here").innerHTML=book.getElementsByTagName("title")[0].childNodes[0].nodeValue+"<br>By: &nbsp;"+ book.getElementsByTagName("author")[0].childNodes[0].nodeValue; 

document.getElementById("hereAgain").innerHTML = "<img src='/"+book.getElementsByTagName("image")[0].childNodes[0].nodeValue+"'/>"+"<br>Price: " + "$"+book.getElementsByTagName("price")[0].childNodes[0].nodeValue+"<br>Year: &nbsp;" + book.getElementsByTagName("year")[0].childNodes[0].nodeValue+"<br>Topic: &nbsp;" + book.getElementsByTagName("topic")[0].childNodes[0].nodeValue+"<br>Pages: &nbsp;"+ book.getElementsByTagName("pages")[0].childNodes[0].nodeValue+"<br>";

document.getElementById("hereAlso").innerHTML = "<br>Description:&nbsp; "+ book.getElementsByTagName("description")[0].childNodes[0].nodeValue + "<br><br>ISBN: &nbsp;"+ book.getElementsByTagName("isbn")[0].childNodes[0].nodeValue;

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
            let book1 = new DOMParser().parseFromString((b[z][0]), "text/xml");
            let result1 = book1.getElementsByTagName("title")[0].childNodes[0].nodeValue;
            let count1 = b[z][1];
            console.log(count1, "x ", result1 );
        }
}
