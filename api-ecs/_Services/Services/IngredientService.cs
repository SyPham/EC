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
    public class IngredientService : IIngredientService
    {
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IIngredientRepository _repoIngredient;
        private readonly IIngredientInfoRepository _repoIngredientInfo;
        private readonly IIngredientInfoReportRepository _repoIngredientInfoReport;
        private readonly ISupplierRepository _repoSupplier;
        private readonly IPlanRepository _repoPlan;
        private readonly IMixingInfoRepository _repoMixingInfo;
        private readonly IGlueRepository _repoGlue;
        private readonly IBuildingGlueRepository _repoBuildingGlue;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IHttpContextAccessor _accessor;

        public IngredientService(
            IMixingInfoRepository repoMixingInfo, 
            IGlueRepository repoGlue, 
            IGlueIngredientRepository repoGlueIngredient, 
            IIngredientInfoReportRepository repoIngredientInfoReport, 
            IPlanRepository repoPlan, 
            IIngredientRepository repoIngredient, 
            IHttpContextAccessor accessor, 
            IIngredientInfoRepository repoIngredientInfo, 
            ISupplierRepository repoSupplier,
            IBuildingGlueRepository repoBuildingGlue,
            IMapper mapper, 
            MapperConfiguration configMapper
            )
        { 
            _configMapper = configMapper;
            _mapper = mapper;
            _repoIngredient = repoIngredient;
            _repoIngredientInfo = repoIngredientInfo;
            _repoSupplier = repoSupplier;
            _accessor = accessor;
            _repoPlan = repoPlan;
            _repoIngredientInfoReport = repoIngredientInfoReport;
            _repoGlueIngredient = repoGlueIngredient;

            _repoGlue = repoGlue;
            _repoMixingInfo = repoMixingInfo;
            _repoBuildingGlue = repoBuildingGlue;
        }
        public async Task<bool> CheckExists(int id)
        {
            return await _repoIngredient.CheckExists(id);
        }
        public async Task<bool> CheckExistsName(string name)
        {
            return await _repoIngredient.FindAll().AnyAsync(x => x.Name.ToLower().Equals(name.ToLower()));
        }

        //Thêm Ingredient mới vào bảng Ingredient
        public async Task<bool> Add(IngredientDto model)
        {
            var ingredient = _mapper.Map<Ingredient>(model);
            ingredient.isShow = true;
            _repoIngredient.Add(ingredient);
            return await _repoIngredient.SaveAll();
        }

        public async Task<bool> Add1(IngredientDto1 model)
        {
            var ingredient = _mapper.Map<Ingredient>(model);
            ingredient.isShow = true;
            _repoIngredient.Add(ingredient);
            return await _repoIngredient.SaveAll();
        }

        public async Task<bool> AddRangeAsync(List<IngredientForImportExcelDto> model)
        {
            var ingredients = _mapper.Map<List<Ingredient>>(model);
            ingredients.ForEach(ingredient => { ingredient.isShow = true; });
            _repoIngredient.AddRange(ingredients);
            return await _repoIngredient.SaveAll();
        }


        //Lấy danh sách Ingredient và phân trang
        public async Task<PagedList<IngredientDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoIngredient.FindAll().Where(x => x.isShow == true).Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper).OrderByDescending(x => x.ID);
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
            var lists = _repoIngredient.FindAll().Where(x => x.isShow == true).Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper)
            .Where(x => x.Code.Contains(text.ToSafetyString()) || x.Name.Contains(text.ToSafetyString()) || x.Supplier.Contains(text.ToSafetyString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<IngredientDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //Hàm Xóa Ingredient
        public async Task<bool> Delete(object id)
        {
            string token = _accessor.HttpContext.Request.Headers["Authorization"];
            var userID = JWTExtensions.GetDecodeTokenByProperty(token, "nameid").ToInt();
            if (userID == 0) return false;
            var ingredient = _repoIngredient.FindById(id.ToInt());
            ingredient.isShow = false;
            ingredient.ModifiedBy = userID;
            ingredient.ModifiedDate = DateTime.Now;
            return await _repoIngredient.SaveAll();
        }

        //Hàm Cập nhật Ingredient
        public async Task<bool> Update(IngredientDto model)
        {
            var ingredient = _mapper.Map<Ingredient>(model);
            _repoIngredient.Update(ingredient);
            return await _repoIngredient.SaveAll();
        }

        //Hàm Lấy toàn bộ danh sách Ingredient 
        public async Task<List<IngredientDto>> GetAllAsync()
        {
            return await _repoIngredient.FindAll().Where(x => x.isShow == true).Include(x => x.Supplier).ProjectTo<IngredientDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        //Hàm Lấy toàn bộ danh sách IngredientInfo
        public async Task<List<IngredientInfoDto>> GetAllIngredientInfoAsync()
        {
            var resultStart = DateTime.Now;
            var resultEnd = DateTime.Now;
            return await _repoIngredientInfo.FindAll().Where(x => x.CreatedDate >= resultStart.Date && x.CreatedDate <= resultEnd.Date).ProjectTo<IngredientInfoDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }
        
        //Hàm Lấy toàn bộ danh sách IngredientReport
        public async Task<List<IngredientInfoReportDto>> GetAllIngredientInfoReportAsync()
        {
            var resultStart = DateTime.Now;
            var resultEnd = DateTime.Now;
            return await _repoIngredientInfoReport.FindAll().Where(x => x.CreatedDate >= resultStart.Date && x.CreatedDate <= resultEnd.Date && x.Qty > 0).ProjectTo<IngredientInfoReportDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        //Hàm Filter Ingredient Report theo ngay
        public async Task<object> GetAllIngredientReportByRange(DateTime min, DateTime max)
        {
            return await _repoIngredientInfo.FindAll()
                .Where(x => x.CreatedTime.Date >= min.Date && x.CreatedTime.Date <= max.Date)
                .ToListAsync();
        }

        //Hàm lấy Ingredient theo Ingredient_Id
        public IngredientDto GetById(object id)
        {
            return _mapper.Map<Ingredient, IngredientDto>(_repoIngredient.FindById(id));
        }

        //Hàm Check qrcode  IngredientReport co ton tai hay khong
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
            var ingredient = await _repoIngredient.FindAll().Where(x => x.isShow == true).FirstOrDefaultAsync(x => x.Code.Equals(qrCode));
            var result = _mapper.Map<IngredientDto>(ingredient);
            return result;
        }

        public async Task<object> ScanQRCodeFromChemialWareHouse(string qrCode,string building, int userid)
        {

            // load tat ca supplier
            var supModel = _repoSupplier.GetAll();
            // lay gia tri "barcode" trong chuỗi qrcode được chuyền lên
            var Barcode = qrCode.Split('-', '-')[2];
            // tim ID của ingredient
            var ingredientID = _repoIngredient.FindAll().FirstOrDefault(x => x.Code.Equals(Barcode)).ID;
            // Find ingredient theo ingredientID vừa tìm được ở trên
            var model = _repoIngredient.FindById(ingredientID);
            // lấy giá trị "ProductionDate" trong chuỗi qrcode được chuyền lên
            var ProductionDate = qrCode.Split('-')[0];
            // lấy giá trị "Batch" trong chuỗi qrcode được chuyền lên
            var Batch = qrCode.Split('-', '-')[1];
            // sau đó convert sang kiểu date time
            var ProductionDates = Convert.ToDateTime(ProductionDate.Substring(0, 4) + "/" + ProductionDate.Substring(4, 2) + "/" + ProductionDate.Substring(6, 2));
            // khai báo biến start = ngày hiện tại
            var resultStart = DateTime.Now;
            // khai báo biến end = ngày hiện tại
            var resultEnd = DateTime.Now;
            // tạo ingredientInfo mới
            var data = await CreateIngredientInfo(new IngredientInfo
            {
                Name = model.Name,
                ExpiredTime = model.ExpiredTime,
                ManufacturingDate = ProductionDates.Date,
                SupplierName = supModel.FirstOrDefault(s => s.ID == model.SupplierID).Name,
                Qty = model.Unit.ToInt(),
                Batch = Batch,
                Consumption = 0,
                Code = model.Code,
                IngredientID = model.ID,
                UserID = userid,
                BuildingName = building

            });

            // check trong bang ingredientReport xem đã tồn tại code hay chưa , nếu có tồn tại 
            if (await _repoIngredientInfoReport.CheckBarCodeExists(Barcode))
            {
                // check tiep trong bang ingredientReport xem co du lieu chua 
                var result = _repoIngredientInfoReport.FindAll().FirstOrDefault(x => x.Code == Barcode && x.Batch == Batch && x.CreatedDate <= resultEnd.Date && x.CreatedDate >= resultStart.Date);

                // nếu khác Null thi update lai
                if (result != null)
                {
                    result.Qty = model.Unit.ToInt() + result.Qty;
                    await UpdateIngredientInfoReport(result);
                }

                // nếu bằng null thì tạo mới IngredientReport
                else
                {
                    await CreateIngredientInfoReport(new IngredientInfoReport
                    {
                        Name = model.Name,
                        ExpiredTime = model.ExpiredTime,
                        ManufacturingDate = ProductionDates.Date,
                        SupplierName = supModel.FirstOrDefault(s => s.ID == model.SupplierID).Name,
                        Qty = model.Unit.ToInt(),
                        Consumption = 0,
                        Code = model.Code,
                        Batch = Batch,
                        IngredientInfoID = data.ID,
                        UserID = userid,
                        BuildingName = building
                    });
                }
            }

            // nếu chưa tồn tại thì thêm mới
            else
                await CreateIngredientInfoReport(new IngredientInfoReport
                {
                    Name = model.Name,
                    ExpiredTime = model.ExpiredTime,
                    ManufacturingDate = ProductionDates.Date,
                    SupplierName = supModel.FirstOrDefault(s => s.ID == model.SupplierID).Name,
                    Qty = model.Unit.ToInt(),
                    Batch = Batch,
                    Consumption = 0,
                    Code = model.Code,
                    IngredientInfoID = data.ID,
                    UserID = userid,
                    BuildingName = building
                });
            return true;
        }

        public async Task<object> ScanQRCodeFromChemialWareHouseDate(string qrCode, string start, string end)
        {
            var supModel = _repoSupplier.GetAll();
            var modelID = _repoIngredient.FindAll().FirstOrDefault(x => x.Code.Equals(qrCode) && x.isShow == true).ID;
            var model = _repoIngredient.FindById(modelID);
            var resultStart = DateTime.Now;
            var resultEnd = DateTime.Now;
            if (await _repoIngredientInfo.CheckBarCodeExists(qrCode))
            {
                var result = _repoIngredientInfo.FindAll().FirstOrDefault(x => x.Code == qrCode && x.CreatedDate <= resultEnd.Date && x.CreatedDate >= resultStart.Date);

                if (result != null)
                {
                    result.Qty = model.Unit.ToInt() + result.Qty;
                    await UpdateIngredientInfo(result);
                }
                else
                {
                    var data = await CreateIngredientInfo(new IngredientInfo
                    {

                        Name = model.Name,
                        ExpiredTime = model.ExpiredTime,
                        ManufacturingDate = model.ManufacturingDate,
                        SupplierName = supModel.FirstOrDefault(s => s.ID == model.SupplierID).Name,
                        Qty = model.Unit.ToInt(),
                        Consumption = 0,
                        Code = model.Code
                    });
                }
            }
            else
            {
                var data = await CreateIngredientInfo(new IngredientInfo
                {
                    Name = model.Name,
                    ExpiredTime = model.ExpiredTime,
                    ManufacturingDate = model.ManufacturingDate,
                    SupplierName = supModel.FirstOrDefault(s => s.ID == model.SupplierID).Name,
                    Qty = model.Unit.ToInt(),
                    Consumption = 0,
                    Code = model.Code
                });
            }
            return true;

        }

        public async Task<IngredientInfo> CreateIngredientInfo(IngredientInfo data)
        {
            try
            {
                _repoIngredientInfo.Add(data);
                await _repoIngredientInfo.SaveAll();
                return data;
            }
            catch (Exception)
            {

                return data;
            }
        }

        public async Task<IngredientInfoReport> CreateIngredientInfoReport(IngredientInfoReport data)
        {
            try
            {
                _repoIngredientInfoReport.Add(data);
                await _repoIngredientInfoReport.SaveAll();
                return data;
            }
            catch (Exception)
            {

                return data;
            }
        }

        public async Task<IngredientInfo> UpdateIngredientInfo(IngredientInfo data)
        {
            try
            {
                _repoIngredientInfo.Update(data);
                await _repoIngredientInfo.SaveAll();
                return data;
            }
            catch (Exception)
            {

                return data;
            }
        }

        public async Task<IngredientInfoReport> UpdateIngredientInfoReport(IngredientInfoReport data)
        {
            try
            {
                _repoIngredientInfoReport.Update(data);
                await _repoIngredientInfoReport.SaveAll();
                return data;
            }
            catch (Exception)
            {

                return data;
            }
        }

        public async Task<bool> UpdateConsumptionChemialWareHouse(string qrCode, int consump)
        {
            try
            {
                if (await _repoIngredientInfo.CheckBarCodeExists(qrCode))
                {
                    var result = _repoIngredientInfo.FindAll().FirstOrDefault(x => x.Code == qrCode);
                    result.Consumption = consump;
                    if (result.Qty != 0)
                    {
                        result.Qty = result.Qty - consump;
                    }
                    var data = await UpdateIngredientInfo(result);
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<bool> UpdateConsumptionIngredientReport(string qrCode, string batch, int consump)
        {
            try
            {
                if (await _repoIngredientInfoReport.CheckBarCodeExists(qrCode))
                {
                    var result = _repoIngredientInfoReport.FindAll().FirstOrDefault(x => x.Code == qrCode && x.Batch == batch);
                    result.Consumption = consump;
                    var data = await UpdateIngredientInfoReport(result);
                }
                return true;
            }
            catch 
            {
                return false;
            }
        }
        public async Task<bool> DeleteIngredientInfo(int id, string code, int qty, string batch)
        {
            var item = _repoIngredientInfo.FindById(id);
            _repoIngredientInfo.Remove(item);
            await Update(code, qty, batch);
            return await _repoIngredientInfo.SaveAll();
        }

        public async Task<bool> DeleteIngredientInfoReport(int id)
        {
            var item = _repoIngredientInfoReport.FindAll().FirstOrDefault(x => x.IngredientInfoID == id).ID;
            var item2 = _repoIngredientInfoReport.FindById(item);
            _repoIngredientInfoReport.Remove(item2);

            return await _repoIngredientInfoReport.SaveAll();
        }

        public async Task<bool> Update(string code, int qty, string batch)
        {
            try
            {
                if (await _repoIngredientInfoReport.CheckBarCodeExists(code))
                {
                    var result = _repoIngredientInfoReport.FindAll().FirstOrDefault(x => x.Code == code && x.Batch == batch);
                    result.Qty = result.Qty - qty;
                    if(result.Qty == 0) {
                        _repoIngredientInfoReport.Remove(result);
                       await _repoIngredientInfoReport.SaveAll();
                    } else {
                        await UpdateIngredientInfoReport(result);
                    }
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

       
    }
}