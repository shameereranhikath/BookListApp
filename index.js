class Book
{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


class UI
{
    static displayBooks()
    {
        const StoredBooks=Storage.getBooks();
        // [
        //     {
        //         title:'aaaa',
        //         author:'Louis Firani',
        //         isbn:'455isn'
        //     },
        //     {
        //         title:'bbb',
        //         author:'stephen Covey',
        //         isbn:'43423'

        //     }
        // ]
        const books=StoredBooks;
        books.forEach((book)=>
        {
            UI.addBookToList(book);
        })
    }

   static addBookToList(book)
    {
        var list=document.querySelector('#book-list')
        var row=document.createElement('tr')
        row.innerHTML=`<td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
      
        list.appendChild(row);



    }

    static clearAllFields()
    {
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';

    }

    static deleteBook(el)
    {
        if(el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
        }
    }


    static showAlert(message,className)
    {
        const div=document.createElement('div')
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector('.book-form')
        container.insertBefore(div,form);

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
}


class Storage
{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('books')===null)
        {
          books=[];
        }
        else
        {
            books=JSON.parse(localStorage.getItem('books'));

        }

        return books;

    }

    static addBook(book)
    {
        const books=Storage.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn)
    {
        const books=Storage.getBooks();

        books.forEach((data,index)=>{
            if(data.isbn===isbn)
            {
                books.splice(index,1);
            }
        })

        localStorage.setItem('books',JSON.stringify(books));

    }
}



document.addEventListener("DOMContentLoaded",UI.displayBooks());



document.querySelector('.book-form').addEventListener("submit",(e)=>
{
     e.preventDefault();

    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
//Validation

if(title===''|| author===''||isbn==='')
{
    UI.showAlert("Please fill the Details","danger")
}
else
{


      const book= new Book(title,author,isbn);

      //Add book to UI
      UI.addBookToList(book);
      //Add book to store
      Storage.addBook(book);

      // Show success message to addition of the item to the List
      UI.showAlert("Book Added","success")

      //Clear all the contents in the text boxes
      UI.clearAllFields();
    }
     
})

document.querySelector('#book-list').addEventListener("click",(e)=>{
    console.log(e.target);
     // Remove book from UI
    UI.deleteBook(e.target);
  // Remove book from Storage
   Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message to Removal of the item from the List
    UI.showAlert("Book Removed","success")

    e.preventDefault();
})

