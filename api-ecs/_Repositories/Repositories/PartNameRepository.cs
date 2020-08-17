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
    public class PartNameRepository : ECRepository<PartName>, IPartNameRepository
    {
        private readonly DataContext _context;
        public PartNameRepository(DataContext context) : base(context)
        {
            _context = context;
        }

     
        //Login khi them repo
    }
}