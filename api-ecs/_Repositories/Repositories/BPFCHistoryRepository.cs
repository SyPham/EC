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
    public class BPFCHistoryRepository : ECRepository<BPFCHistory>, IBPFCHistoryRepository
    {
        private readonly DataContext _context;
        public BPFCHistoryRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> CheckGlueID(int code)
        {
            return await _context.BPFCHistories.AnyAsync(x => x.GlueID.Equals(code));
        }



        //Login khi them repo
    }
}