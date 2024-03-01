using Microsoft.AspNetCore.Mvc;
using backend.Model;
using Microsoft.EntityFrameworkCore;


namespace backend.Controllers
{

    [ApiController]
    [Route("/api/v1/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductContext _context;

        public ProductController(ProductContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Get()
        {
            
            return Ok(_context.Products.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Product? product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Product product)
        {
            int id = _context.Products.Count() + 1;
            product.id = id;
            _context.Products.Add(product);
            _context.SaveChanges();
            Console.WriteLine(product);
            return CreatedAtAction(nameof(Get), new { id = product.id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product updatedProduct)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound($"Product with id: {id} not found.");
            }
            
            product.name = updatedProduct.name;
            product.price = updatedProduct.price;
            product.stock = updatedProduct.stock;
            product.category = updatedProduct.category;
            // Update other properties as needed
            
            _context.SaveChanges();
            return NoContent(); // 
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound($"Product with id: {id} not found.");
            }
            
            _context.Products.Remove(product);
            _context.SaveChanges();
            return Ok($"Product with id: {id} deleted.");
        }


    }
}
