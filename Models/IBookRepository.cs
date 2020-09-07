using System.Collections.Generic;

namespace BookStore_WebApi.Models
{
    public interface IBookRepository
    {
        Book GetBook(int id);
        IEnumerable<Book> GetAllBooks();
        void StoreBook(Book book);
        void EditBook(Book book);
        void DeleteBook(int id);
    }
}