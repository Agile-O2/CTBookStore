// Changes from String format to DOM Object format
let book = new DOMParser().parseFromString(localStorage.getItem("currentBook"), "text/xml");

// Extract info from new DOM Object however you want
document.getElementById("here").innerHTML=book.getElementsByTagName("title")[0].childNodes[0].nodeValue+"<br>By: &nbsp;"+ book.getElementsByTagName("author")[0].childNodes[0].nodeValue; 

document.getElementById("hereAgain").innerHTML = "<img src='/"+book.getElementsByTagName("image")[0].childNodes[0].nodeValue+"'/>"+"<br>Price: " + book.getElementsByTagName("price")[0].childNodes[0].nodeValue+"<br>Year: &nbsp;" + book.getElementsByTagName("year")[0].childNodes[0].nodeValue+"<br>Topic: &nbsp;" + book.getElementsByTagName("topic")[0].childNodes[0].nodeValue+"<br>Pages: &nbsp;"+ book.getElementsByTagName("pages")[0].childNodes[0].nodeValue+"<br>";

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
s