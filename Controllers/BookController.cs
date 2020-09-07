using System.Collections.Generic;
using BookStore_WebApi.Models;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace BookStore_WebApi.Controllers
{
    [Route("[controller]/[action]")]
    public class BookController: Controller
    {
        private IBookRepository _bookRepository;
        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet] 
        public ActionResult<List<Book>> Get()
        {
            return Ok(_bookRepository.GetAllBooks().ToList());
        }

        [Route("{Id?}")]
        [HttpGet("Id")] 
        public ActionResult<Book> Get(int Id)
        {
            return Ok(_bookRepository.GetBook(Id));    
        }

        [HttpPost] 
        public ActionResult<Book> Post([FromBody] Book book)
        {

            _bookRepository.StoreBook(book);
            return Ok(book);
            
        }

        //[Route("{Id?}")]
        [HttpPut] 
        public ActionResult put([FromBody] Book book)
        {
            _bookRepository.EditBook(book);
            return Ok(book);
        }

        [Route("{Id?}")]
        [HttpDelete("Id")] 
        public ActionResult delete(int Id)
        {
            _bookRepository.DeleteBook(Id);
            return Ok(_bookRepository.GetAllBooks());
        }
    }
}