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
using Microsoft.AspNetCore.Http;

namespace EC_API._Services.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _repoSupplier;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IHttpContextAccessor _accessor;

        public SupplierService(ISupplierRepository repoSupplier,IHttpContextAccessor accessor, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoSupplier = repoSupplier;
            _accessor = accessor;

        }

        //Thêm Supplier mới vào bảng Supplier
        public async Task<bool> Add(SuppilerDto model)
        {
            var Supplier = _mapper.Map<Supplier>(model);
            _repoSupplier.Add(Supplier);
            return await _repoSupplier.SaveAll();
        }

     

        //Lấy danh sách Supplier và phân trang
        public async Task<PagedList<SuppilerDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoSupplier.FindAll().Where(x => x.isShow == true).ProjectTo<SuppilerDto>(_configMapper).OrderBy(x => x.ID);
            return await PagedList<SuppilerDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
      
        //Tìm kiếm Supplier
        public async Task<PagedList<SuppilerDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoSupplier.FindAll().Where(x => x.isShow == true).ProjectTo<SuppilerDto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderBy(x => x.ID);
            return await PagedList<SuppilerDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //Xóa Supplier
        public async Task<bool> Delete(object id)
        {
            string token = _accessor.HttpContext.Request.Headers["Authorization"];
            var userID = JWTExtensions.GetDecodeTokenByProperty(token, "nameid").ToInt();
            if (userID == 0) return false;
            var supplier = _repoSupplier.FindById(id);
            supplier.isShow = false;
            supplier.ModifiedBy = userID;
            supplier.ModifiedDate = DateTime.Now;
            return await _repoSupplier.SaveAll();
        }

        //Cập nhật Supplier
        public async Task<bool> Update(SuppilerDto model)
        {
            var supplier = _mapper.Map<Supplier>(model);
            _repoSupplier.Update(supplier);
            return await _repoSupplier.SaveAll();
        }
      
        //Lấy toàn bộ danh sách Supplier 
        public async Task<List<SuppilerDto>> GetAllAsync()
        {
            return await _repoSupplier.FindAll().Where(x => x.isShow == true).ProjectTo<SuppilerDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }

        //Lấy Supplier theo Supplier_Id
        public SuppilerDto GetById(object id)
        {
            return  _mapper.Map<Supplier, SuppilerDto>(_repoSupplier.FindById(id));
        }

    }
}