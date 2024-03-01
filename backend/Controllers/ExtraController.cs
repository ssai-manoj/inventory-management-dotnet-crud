using Microsoft.AspNetCore.Mvc;
using backend.Model;

namespace backend.Controllers{
    [ApiController]
    [Route("/")]
    public class ExtraController : ControllerBase
    {
        private readonly ProductContext _context;
        public ExtraController(ProductContext context){
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Welcome to the API");
        }

        [HttpGet("/revenue")]
        public IActionResult GetRevenue()
        {
            decimal revenue = 0;
            List<Product> products = _context.Products.ToList();
            foreach (Product product in products)
            {
                revenue += product.price * product.stock;
            }

            return Ok(revenue);
        }

        [HttpGet("/sales")]
        public IActionResult GetSales()
        {
            int sales = 0;
            List<Product> products = _context.Products.ToList();
            foreach (Product product in products)
            {
                sales += (int)product.price;
            }

            return Ok(sales);
            
        }

        [HttpGet("/stock")]
        public IActionResult GetStock()
        {
            int stock = 0;
            List<Product> products = _context.Products.ToList();
            foreach (Product product in products)
            {
                stock += product.stock;
            }

            return Ok(stock);
        }
    }
}