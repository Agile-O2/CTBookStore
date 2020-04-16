// Book Object
class Book 
{
    constructor(bookXML) 
    {
        console.log();
        let i;
        let length;
        this.author = bookXML.getElementsByTagName("author")[0].childNodes[0].nodeValue;
        this.image =bookXML.getElementsByTagName("image")[0].childNodes[0].nodeValue;
        this.isbn =bookXML.getElementsByTagName("isbn")[0].childNodes[0].nodeValue;
        this.price =bookXML.getElementsByTagName("price")[0].childNodes[0].nodeValue;
        this.pages =bookXML.getElementsByTagName("pages")[0].childNodes[0].nodeValue;
        this.numOfReviews =bookXML.getElementsByTagName("numOfReviews")[0].childNodes[0].nodeValue;
        this.totalRating =bookXML.getElementsByTagName("totalRating")[0].childNodes[0].nodeValue;
        this.averageRating =bookXML.getElementsByTagName("averageRating")[0].childNodes[0].nodeValue;
        this.reviewList =bookXML.getElementsByTagName("reviewList")[0].getElementsByTagName("review");
        this.nickname = [];
        this.descriptionReview = [];
        this.rating = [];
        length = this.reviewList.length
        for (i = 0; i<length; i++)
        {
            this.nickname.push(this.reviewList[i].getElementsByTagName("nickname")[0].childNodes[0].nodeValue);
            this.descriptionReview.push(this.reviewList[i].getElementsByTagName("descriptionReview")[0].childNodes[0].nodeValue);
            this.rating.push(this.reviewList[i].getElementsByTagName("rating")[0].childNodes[0].nodeValue);
            
        }
        this.stock =bookXML.getElementsByTagName("stock")[0].childNodes[0].nodeValue;
        this.sold =bookXML.getElementsByTagName("sold")[0].childNodes[0].nodeValue;
        this.tags =bookXML.getElementsByTagName("tags")[0].getElementsByTagName("tag");
        this.tag = [];
        length = this.tags.length
        for (i = 0; i< length; i++)
        {
            this.tag.push(this.tags[i].textContent);
        }
        this.title =bookXML.getElementsByTagName("title")[0].childNodes[0].nodeValue;
        this.topic =bookXML.getElementsByTagName("topic")[0].childNodes[0].nodeValue;
        this.year =bookXML.getElementsByTagName("year")[0].childNodes[0].nodeValue;
        this.description =bookXML.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    }
}
// XML object to Book 
function CreateBookFromStringXML(source)
{
    return (new Book(new DOMParser().parseFromString(source, "text/xml")));
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