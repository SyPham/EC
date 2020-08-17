using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EC_API._Repositories.Interface;
using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;

namespace EC_API._Services.Services
{
    public class ArticleNoService : IArticleNoService
    {

        private readonly IArticleNoRepository _repoArticalNo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IBPFCEstablishRepository _repoBPFC;
        public ArticleNoService(
            IArticleNoRepository repoArticalNo, 
            IBPFCEstablishRepository repoBPFC,
            IMapper mapper, 
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoArticalNo = repoArticalNo;
            _repoBPFC = repoBPFC;

        }

        public async Task<bool> Add(ArticleNoDto model)
        {
            var articleNo = _mapper.Map<ArticleNo>(model);
         
            _repoArticalNo.Add(articleNo);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<PagedList<ArticleNoDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoArticalNo.FindAll().ProjectTo<ArticleNoDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<ArticleNoDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<ArticleNoDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoArticalNo.FindAll().ProjectTo<ArticleNoDto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<ArticleNoDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Delete(object id)
        {
            var ArticleNo = _repoArticalNo.FindById(id);
            _repoArticalNo.Remove(ArticleNo);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<bool> Update(ArticleNoDto model)
        {
            var articleNo = _mapper.Map<ArticleNo>(model);
            _repoArticalNo.Update(articleNo);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<List<ArticleNoDto>> GetAllAsync()
        {
            return await _repoArticalNo.FindAll().ProjectTo<ArticleNoDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public ArticleNoDto GetById(object id)
        {
            return _mapper.Map<ArticleNo, ArticleNoDto>(_repoArticalNo.FindById(id));
        }

        public async Task<List<ArticleNoDto>> GetArticleNoByModelNameID(int modelNameID)
        {
            var model =await _repoArticalNo.FindAll().Where(x => x.ModelNoID == modelNameID).ProjectTo<ArticleNoDto>(_configMapper).ToListAsync();
            return model;
        }

        public async Task<List<ArticleNoDto>> GetArticleNoByModelNoID(int modelNoID)
        {
            var model = await _repoArticalNo.FindAll().Where(x => x.ModelNoID == modelNoID).ProjectTo<ArticleNoDto>(_configMapper).ToListAsync();
            return model;
        }
    }
}