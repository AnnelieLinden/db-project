## Brief information about the project
This REST API handles books and authors where you can search on a book to see
all information about it or just a piece of it. You can post new books and 
authors but also change or delete them. 

## Setup
Download the repository. Open with Visual Studio Code. 
Find the file ```server.js.``` At the very bottom of the file you can find where 
to enter your own mongoDB link. You need to the same
thing again at row 13 in ```seedDB.js```
```
mongoose.connect("link here")
``` 
In the upper menues, find Terminal and press new terminal. 
There you need to enter:
```
npm install-y //This installs the defined libraries
node server.js //This starts the server. The terminal should say Listening on port http://localhost:3000
```
Now you can get started with the fun parts!

My postman project: https://www.postman.com/aneriil/workspace/book-and-authors-api


# Documentation
### Post
To post a new author in postman you use the url 
```http://localhost:3000/api/author```

```{
  "name": "Anna Jansson",
  "_id": "6622266f34d6a80b3c8de603"
}
```
in body you can see my example above and you can ofcouse change the name.
To post a new book you enter the url 
```http://localhost:3000/api/books```
```{     
    "title": "Till offer åt det okända",
    "isbn": 9789113123165,
    "genre": "Deckare",
    "grade": "5",
    "author": "{{authorId}}",
    "plot": "Lovisa Ersjö har ljugit. Full av ånger lägger hon ner mobilen. Klockan närmar sig midnatt och huset är
            ödsligt och mörkt. Hon har precis sagt till Rosalies mamma att bästisen sover över. Men Rosalie är inte
            hemma hos Lovisa, och ingenting kommer att bli som förut.",
    "language": "Svenska", 
    "pages": 374, 
    "year": 2024
}
```
Same thing as with authors, you can see and change my example in body to your own book. 

### Get 
To list objects enter url  
```
http://localhost:3000/api/author/all
http://localhost:3000/api/author/all
```
These particular urls is paginated which means they only list 5 objects each page. At the bottom you can find how many 
objets is stored in json and how many pages in total.

To get a book by it is id you need the ObjectId found in mongoDB compass and combine it in the url. Write it as followed:
```
http://localhost:3000/api/author/6627a326196509581d5b9b35
http://localhost:3000/api/book/662537ebae19c3093a98b485
```

You can also choose to use fields. With it you can find a book by it is id and choose from th many fields a book has:
```
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=title
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=year
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=author
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=grade
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=plot
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=language
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=pages
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=language
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=genre
http://localhost:3000/api/book/662537ebae19c3093a98b485?fields=isbn
```
With author you get the entire object anyway since it only has id and name, therefore meningless in this regard.  

### Put

By entering ```http://localhost:3000/api/book/ Enter book´s ObjectId here``` in a put request url, you can update the book´s information. 
In the body of the request you need to fill in the details you want to change. 
You can update an author´s name too if you would like ```http://localhost:3000/api/author/ Enter authors´s ObjectId here``` 

### Delete

To delete a book or author you simply enter one of the urls below in a delete request  
```
http://localhost:3000/api/book/ Enter book´s ObjectId here
or
http://localhost:3000/api/author/ Enter author´s ObjectId here
```

