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
    public class PartName2Service : IPartName2Service
    {
        private readonly IPartName2Repository _repoLine;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PartName2Service(IPartName2Repository repoBrand, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoLine = repoBrand;

        }

        //Thêm Brand mới vào bảng Line
        public async Task<bool> Add(PartName2Dto model)
        {
            var Line = _mapper.Map<PartName2>(model);
            _repoLine.Add(Line);
            return await _repoLine.SaveAll();
        }

     

        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<PartName2Dto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoLine.FindAll().ProjectTo<PartName2Dto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<PartName2Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
      
        //Tìm kiếm Line
        public async Task<PagedList<PartName2Dto>> Search(PaginationParams param, object text)
        {
            var lists = _repoLine.FindAll().ProjectTo<PartName2Dto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<PartName2Dto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var Line = _repoLine.FindById(id);
            _repoLine.Remove(Line);
            return await _repoLine.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(PartName2Dto model)
        {
            var Line = _mapper.Map<PartName2>(model);
            _repoLine.Update(Line);
            return await _repoLine.SaveAll();
        }
      
        //Lấy toàn bộ danh sách Brand 
        public async Task<List<PartName2Dto>> GetAllAsync()
        {
            return await _repoLine.FindAll().ProjectTo<PartName2Dto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }

        //Lấy Brand theo Brand_Id
        public PartName2Dto GetById(object id)
        {
            return  _mapper.Map<PartName2, PartName2Dto>(_repoLine.FindById(id));
        }

    }
}