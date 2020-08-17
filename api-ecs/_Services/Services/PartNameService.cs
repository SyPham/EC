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
    public class PartNameService : IPartNameService
    {
        private readonly IPartNameRepository _repoLine;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PartNameService(IPartNameRepository repoBrand, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoLine = repoBrand;

        }

        //Thêm Brand mới vào bảng Line
        public async Task<bool> Add(PartNameDto model)
        {
            var Line = _mapper.Map<PartName>(model);
            _repoLine.Add(Line);
            return await _repoLine.SaveAll();
        }

     

        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<PartNameDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoLine.FindAll().ProjectTo<PartNameDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<PartNameDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
      
        //Tìm kiếm Line
        public async Task<PagedList<PartNameDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoLine.FindAll().ProjectTo<PartNameDto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<PartNameDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var Line = _repoLine.FindById(id);
            _repoLine.Remove(Line);
            return await _repoLine.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(PartNameDto model)
        {
            var Line = _mapper.Map<PartName>(model);
            _repoLine.Update(Line);
            return await _repoLine.SaveAll();
        }
      
        //Lấy toàn bộ danh sách Brand 
        public async Task<List<PartNameDto>> GetAllAsync()
        {
            return await _repoLine.FindAll().ProjectTo<PartNameDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }

        //Lấy Brand theo Brand_Id
        public PartNameDto GetById(object id)
        {
            return  _mapper.Map<PartName, PartNameDto>(_repoLine.FindById(id));
        }

    }
}