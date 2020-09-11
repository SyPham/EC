using System.Threading.Tasks;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EC_API.DTO;
using System.Collections.Generic;
using AutoMapper;

namespace EC_API._Repositories.Repositories
{
    public class AbnormalRepository : ECRepository<Abnormal>, IAbnormalRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AbnormalRepository(DataContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}