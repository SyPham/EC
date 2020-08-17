using System.Threading.Tasks;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EC_API.DTO;
using System.Collections.Generic;

namespace EC_API._Repositories.Repositories
{
    public class GlueRepository : ECRepository<Glue>, IGlueRepository
    {
        private readonly DataContext _context;
        public GlueRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> CheckBarCodeExists(string code)
        {
            return await _context.Glues.AnyAsync(x => x.Code.Equals(code));

        }

        public async Task<bool> CheckExists(int id)
        {
            return await _context.Glues.AnyAsync(x => x.ID == id);
        }

        public bool Save()
        {
            return _context.SaveChanges() > 0;
        }
        //Login khi them repo
    }
}