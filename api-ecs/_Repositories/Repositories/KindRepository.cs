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
    public class KindRepository : ECRepository<Kind>, IKindRepository
    {
        private readonly DataContext _context;
        public KindRepository(DataContext context) : base(context)
        {
            _context = context;
        }

     
        //Login khi them repo
    }
}