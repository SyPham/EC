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
    public class MixingRepository : IoTRepository<Mixing>, IMixingRepository
    {
        private readonly IoTContext _context;

        public MixingRepository(IoTContext context) : base(context)
        {
            _context = context;
        }
    }
}