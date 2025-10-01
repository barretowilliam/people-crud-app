using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeopleCrudApi.Models;

namespace PeopleCrudApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PessoasController(AppDbContext context) => _context = context;

        // GET /api/pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAll()
            => await _context.Pessoas.AsNoTracking().ToListAsync();

        // POST /api/pessoas
        [HttpPost]
        public async Task<ActionResult<Pessoa>> Create(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = pessoa.Id }, pessoa);
        }

        // PUT /api/pessoas/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, Pessoa pessoa)
        {
            if (id != pessoa.Id) return BadRequest("Id do corpo diferente da rota.");
            _context.Entry(pessoa).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE /api/pessoas/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var pessoa = await _context.Pessoas.FindAsync(id);
            if (pessoa == null) return NotFound();
            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
