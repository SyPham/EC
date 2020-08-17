using System.Threading.Tasks;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EC_API.DTO;
using System.Collections.Generic;
using System;

namespace EC_API._Repositories.Repositories
{
    public class ModelNameRepository : ECRepository<ModelName>, IModelNameRepository
    {
        private readonly DataContext _context;
        public ModelNameRepository(DataContext context) : base(context)
        {
            _context = context;
        }

     

        //Login khi them repo
    }
}