// model for product

using System.ComponentModel.DataAnnotations;


namespace backend.Model
{
    public static class Category
{
    public static readonly string Electronics = "Electronics";
    public static readonly string Clothing = "Clothing";
    public static readonly string Toys = "Toys";
    public static readonly string Books = "Books";
    public static readonly string HomeAndKitchen = "Home & Kitchen";
}

    public class Product
    {
        public int id { get; set; }
        public string name { get; set; } = "";
        public string category { get; set; } = Category.Electronics;
        public decimal price { get; set; }
        public int stock { get; set; }
    }

}
