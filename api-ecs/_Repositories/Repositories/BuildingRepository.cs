using AutoMapper;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Repositories.Repositories
{
    public class BuildingRepository : ECRepository<Building>, IBuildingRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BuildingRepository(DataContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }
    
    }
}
