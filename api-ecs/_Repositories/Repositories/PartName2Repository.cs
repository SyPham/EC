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
    public class PartName2Repository : ECRepository<PartName2>, IPartName2Repository
    {
        private readonly DataContext _context;
        public PartName2Repository(DataContext context) : base(context)
        {
            _context = context;
        }

     
        //Login khi them repo
    }
}