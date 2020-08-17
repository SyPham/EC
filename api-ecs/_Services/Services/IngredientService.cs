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
    public class IngredientService : IIngredientService
    {
        private readonly IIngredientRepository _repoIngredient;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public IngredientService(IIngredientRepository repoIngredient, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoIngredient = repoIngredient;

        }
        public async Task<bool> CheckExists(int id)
        {
            return await _repoIngredient.CheckExists(id);
        }
        //Thêm Ingredient mới vào bảng Ingredient
        public async Task<bool> Add(IngredientDto model)
        {
            var brand = _mapper.Map<Ingredient>(model);
            _repoIngredient.Add(brand);
            return await _repoIngredient.SaveAll();
        }

        public async Task<bool> Add1(IngredientDto1 model)
        {
            var brand = _mapper.Map<Ingredient>(model);
            _repoIngredient.Add(brand);
            return await _repoIngredient.SaveAll();
        }

        public async Task<bool> AddRangeAsync(List<IngredientForImportExcelDto> model)
        {
            var ingredients = _mapper.Map<List<Ingredient>>(model);
            _repoIngredient.AddRange(ingredients);
            return await _repoIngredient.SaveAll();
        }


        //Lấy danh sách Ingredient và phân trang
        public async Task<PagedList<IngredientDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoIngredient.FindAll().Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<IngredientDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }


        //public async Task<object> GetIngredientOfGlue(int glueid)
        //{
        //    return await _repoIngredient.GetIngredientOfGlue(glueid);

        //    throw new System.NotImplementedException();
        //}
        //Tìm kiếm Ingredient
        public async Task<PagedList<IngredientDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoIngredient.FindAll().Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper)
            .Where(x => x.Code.Contains(text.ToSafetyString()) || x.Name.Contains(text.ToSafetyString()) || x.Supplier.Contains(text.ToSafetyString()) )
            .OrderByDescending(x => x.ID);
            return await PagedList<IngredientDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //Xóa Ingredient
        public async Task<bool> Delete(object id)
        {

            var brand = _repoIngredient.FindById(id.ToInt());
            _repoIngredient.Remove(brand);
            return await _repoIngredient.SaveAll();
        }

        //Cập nhật Ingredient
        public async Task<bool> Update(IngredientDto model)
        {
            var brand = _mapper.Map<Ingredient>(model);
            _repoIngredient.Update(brand);
            return await _repoIngredient.SaveAll();
        }

        //Lấy toàn bộ danh sách Ingredient 
        public async Task<List<IngredientDto>> GetAllAsync()
        {
            return await _repoIngredient.FindAll().Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        //Lấy Ingredient theo Ingredient_Id
        public IngredientDto GetById(object id)
        {
            return _mapper.Map<Ingredient, IngredientDto>(_repoIngredient.FindById(id));
        }

        public async Task<bool> CheckBarCodeExists(string code)
        {
            return await _repoIngredient.CheckBarCodeExists(code);
        }
        public async Task<bool> UpdatePrint(QrPrintDto entity)
        {
            var model = await _repoIngredient.FindAll().FirstOrDefaultAsync(x => x.ID == entity.ID);
            if (model != null)
            {
                model.ManufacturingDate = entity.ManufacturingDate;
                return await _repoIngredient.SaveAll();
            }
            else
            {
                return false;

            }
        }

        public async Task<IngredientDto> ScanQRCode(string qrCode)
        {
            var ingredient =  await _repoIngredient.FindAll().FirstOrDefaultAsync(x => x.Code.Equals(qrCode));
            var result = _mapper.Map<IngredientDto>(ingredient);
            return result;
        }
    }
}