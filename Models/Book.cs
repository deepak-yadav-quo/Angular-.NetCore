namespace BookStore_WebApi.Models
{
    public class Book
    {
        public int Id {get; set;}
        public string Name {get; set;}

        public string AuthorName {get; set;}

        public string PublishDate {get; set;}

        public string Genre {get; set;}

    }
}