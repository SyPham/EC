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
    public class ArticleNoRepository : ECRepository<ArticleNo>, IArticleNoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ArticleNoRepository(DataContext context, IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
        }

        public Task<object> GetArticleNoByModelNameID(int modelNameID)
        {
            throw new System.NotImplementedException();
        }
    }
}