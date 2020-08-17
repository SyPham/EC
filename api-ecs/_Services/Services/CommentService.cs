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
    public class CommentService : ICommentService
    {

        private readonly ICommentRepository _repoArticalNo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public CommentService(ICommentRepository repoArticalNo, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoArticalNo = repoArticalNo;

        }

        public async Task<bool> Add(CommentDto model)
        {
            var articleNo = _mapper.Map<Comment>(model);
            _repoArticalNo.Add(articleNo);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<PagedList<CommentDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoArticalNo.FindAll().ProjectTo<CommentDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<CommentDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<CommentDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoArticalNo.FindAll().ProjectTo<CommentDto>(_configMapper)
            .Where(x => x.Content.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<CommentDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Delete(object id)
        {
            var Comment = _repoArticalNo.FindById(id);
            _repoArticalNo.Remove(Comment);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<bool> Update(CommentDto model)
        {
            var articleNo = _mapper.Map<Comment>(model);
            _repoArticalNo.Update(articleNo);
            return await _repoArticalNo.SaveAll();
        }

        public async Task<List<CommentDto>> GetAllAsync()
        {
            return await _repoArticalNo.FindAll().ProjectTo<CommentDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public CommentDto GetById(object id)
        {
            return _mapper.Map<Comment, CommentDto>(_repoArticalNo.FindById(id));
        }

        public async Task<List<CommentDto>> GetCommentByBPFCEstablishID(int BPFCEstablishID)
        {
            var model =await _repoArticalNo.FindAll().Where(x => x.BPFCEstablishID == BPFCEstablishID).ProjectTo<CommentDto>(_configMapper).ToListAsync();
            return model;
        }

        public async Task<List<CommentDto>> GetAllCommentByBPFCEstablishID(int BPFCEstablishID)
        {
            return await _repoArticalNo.FindAll().Where(x=>x.BPFCEstablishID == BPFCEstablishID).ProjectTo<CommentDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }
    }
}