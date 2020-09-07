using System.Collections.Generic;
using System.Linq;

namespace BookStore_WebApi.Models
{
    public class MockBookRepository : IBookRepository
    {
        private List<Book> _bookList;
        public MockBookRepository()
        {
            _bookList = new List<Book>() 
            {
                new Book() {Id = 1, Name = "Book1", AuthorName = "Author1", PublishDate = "2020-09-07", Genre = "Genre1"},
                new Book() {Id = 2, Name = "Book2", AuthorName = "Author2", PublishDate = "2020-09-07", Genre = "Genre2"},
                new Book() {Id = 3, Name = "Book3", AuthorName = "Author3", PublishDate = "2020-09-07", Genre = "Genre3"}
            };
        }

        public Book GetBook(int id)
        {
            return _bookList.FirstOrDefault(book => book.Id == id);
        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _bookList;
        }

        public void StoreBook(Book book)
        {
            if(_bookList.Count > 0) 
            {
                book.Id = _bookList.Max(b => b.Id) + 1;
            }
            else {
                book.Id = 1;
            }
            _bookList.Add(book);
        }

        public void EditBook(Book book)
        {
            
            var bookInDb = _bookList.FirstOrDefault(b => b.Id == book.Id);
            bookInDb.Name = book.Name;
            bookInDb.AuthorName = book.AuthorName;
            bookInDb.PublishDate = book.PublishDate;
            bookInDb.Genre = book.Genre;
        }

        public void DeleteBook(int id)
        {
            _bookList.RemoveAt(id);
        }

    }
}