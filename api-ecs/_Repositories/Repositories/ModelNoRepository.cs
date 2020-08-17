using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Repositories.Repositories
{
    public class ModelNoRepository : ECRepository<ModelNo>, IModelNoRepository
    {
        private readonly DataContext _context;
        public ModelNoRepository(DataContext context) : base(context)
        {
            _context = context;
        }

    }
}
