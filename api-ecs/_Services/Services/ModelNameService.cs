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
using Microsoft.Extensions.Configuration;
using EC_API.Helpers.Enum;
using System.Transactions;

namespace EC_API._Services.Services
{
    public class ModelNameService : IModelNameService
    {
        private readonly IModelNameRepository _repoModelName;
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IGlueRepository _repoGlue;
        private readonly IArticleNoRepository _repoArticleNo;
        private readonly IProcessRepository _repoProcess;
        private readonly IArtProcessRepository _repoArtProcess;
        private readonly IIngredientRepository _repoIngredient;
        private readonly ISupplierRepository _supplierRepository;
        private readonly IBPFCEstablishRepository _repoBPFC;
        private readonly IPlanRepository _repoPlan;
        private readonly IModelNoRepository _repoModelNO;
        private readonly IMailExtension _mailExtension;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public ModelNameService(
            IModelNameRepository repoBrand,
            IGlueRepository repoGlue,
            IGlueIngredientRepository repoGlueIngredient,
            IMailExtension mailExtension,
            IArticleNoRepository repoArticleNo,
            IProcessRepository repoProcess,
            IArtProcessRepository repoArtProcess,
            IIngredientRepository repoIngredient,
            IBPFCEstablishRepository repoBPFC,
            IModelNoRepository repoModelNO,
            ISupplierRepository supplierRepository,
            IConfiguration configuration,
            IPlanRepository repoPlan,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoModelName = repoBrand;
            _repoGlueIngredient = repoGlueIngredient;
            _repoGlue = repoGlue;
            _repoModelNO = repoModelNO;
            _repoArticleNo = repoArticleNo;
            _repoProcess = repoProcess;
            _repoArtProcess = repoArtProcess;
            _repoBPFC = repoBPFC;
            _repoIngredient = repoIngredient;
            _supplierRepository = supplierRepository;
            _configuration = configuration;
            _mailExtension = mailExtension;
            _repoPlan = repoPlan;
        }

        //Thêm Brand mới vào bảng ModelName
        public async Task<bool> Add(ModelNameDto model)
        {
            var ModelName = _mapper.Map<ModelName>(model);
            _repoModelName.Add(ModelName);
            return await _repoModelName.SaveAll();
        }



        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<ModelNameDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoModelName.FindAll().ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<ModelNameDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //public async Task<object> GetIngredientOfModelName(int ModelNameid)
        //{
        //    return await _repoModelName.GetIngredientOfModelName(ModelNameid);

        //    throw new System.NotImplementedException();
        //}
        //Tìm kiếm ModelName
        public async Task<PagedList<ModelNameDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoModelName.FindAll().ProjectTo<ModelNameDto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<ModelNameDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var ModelName = _repoModelName.FindById(id);
            _repoModelName.Remove(ModelName);
            return await _repoModelName.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(ModelNameDto model)
        {
            var ModelName = _mapper.Map<ModelName>(model);
            _repoModelName.Update(ModelName);
            return await _repoModelName.SaveAll();
        }

        //Lấy toàn bộ danh sách Brand 
        public async Task<List<ModelNameDto>> GetAllAsync()
        {
            var lists = await _repoModelName.FindAll().ProjectTo<ModelNameDto>(_configMapper).OrderBy(x => x.Name).ToListAsync();
            return lists;
        }
        //Lấy toàn bộ danh sách Brand 
        public async Task<List<ModelNameDto>> GetAllAsyncForAdmin()
        {
            var lists = await _repoModelName.FindAll().ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            return lists;
        }

        //Lấy Brand theo Brand_Id
        public ModelNameDto GetById(object id)
        {
            return _mapper.Map<ModelName, ModelNameDto>(_repoModelName.FindById(id));
        }

        public Task<int> GetArticleNameQuantityByModelName(int modelName)
        {
            //var item = await _repoModelName.FindAll().FirstOrDefaultAsync(x => x.ID == modelName);
            //return item.ArticleNos.Count();
            throw new NotImplementedException();
        }

        public Task<bool> CloneModelName(int modelNameID, string modelName, string modelNo, int processID)
        {
            //try
            //{
            //    using (var scope = new TransactionScope(TransactionScopeOption.Required,
            //      new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }, TransactionScopeAsyncFlowOption.Enabled))
            //    {

            //        // Clone 1 doi giay
            //        var model = _repoModelName.FindById(modelNameID);
            //        var modelNameitem = _mapper.Map<ModelName>(model);
            //        modelNameitem.ID = 0;
            //        modelNameitem.ModelNo = modelNo;
            //        modelNameitem.Name = modelName;
            //        modelNameitem.ApprovedBy = 0;
            //        modelNameitem.ApprovedStatus = false;
            //        modelNameitem.CreatedStatus = false;
            //        _repoModelName.Add(modelNameitem);
            //        await _repoModelName.SaveAll();
            //        // Clone article no
            //        var artNo = await _repoArticleNo.FindAll().Where(x => x.ID == modelNameID).ToListAsync();
            //        if (model.ID > 0)
            //        {
            //            artNo.ForEach(item =>
            //            {
            //                item.ID = 0;
            //                item.ID = model.ID;
            //            });
            //            _repoArticleNo.AddRange(artNo);
            //            await _repoArticleNo.SaveAll();
            //        }

            //        var glues = await _repoGlue.FindAll().Where(x => x.ModalNameID == modelNameID).ToListAsync();
            //        var glueIDList = glues.Select(a => a.ID).ToList();
            //        if (model.ID > 0)
            //        {
            //            foreach (var glue in glues)
            //            {
            //                var glueID = glue.ID;
            //                glue.ID = 0;
            //                glue.ModalNameID = model.ID;
            //                _repoGlue.Add(glue);
            //                var check = await _repoGlue.SaveAll();
            //                if (check)
            //                {
            //                    var glueIngredient = await _repoGlueIngredient.FindAll().Where(x => x.GlueID == glueID).ToListAsync();
            //                    glueIngredient.ForEach(item =>
            //                    {
            //                        item.ID = 0;
            //                        item.GlueID = glue.ID;
            //                    });
            //                    _repoGlueIngredient.AddRange(glueIngredient);
            //                    await _repoGlueIngredient.SaveAll();
            //                }
            //            }
            //            var updateGlues = await _repoGlue.FindAll().Where(x => x.ModalNameID == model.ID).ToListAsync();
            //            foreach (var art in artNo)
            //            {
            //                foreach (var glue in updateGlues)
            //                {
            //                    if (art.ID == glue.ModalNameID)
            //                    {
            //                        glue.ArticleNoID = art.ID;
            //                        glue.ProcessID = processID;
            //                        await _repoGlue.SaveAll();
            //                    }
            //                }
            //            }

            //        }
            //        scope.Complete();
            //    }
            //    return true;
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Loi clone model name", ex);
            //    return false;
            //}
            throw new System.NotImplementedException();
        }

        public Task<bool> CloneArticleModelname(int modelNameID, string modelName, string modelNo, string article, int processID)
        {
            //try
            //{
            //    using (var scope = new TransactionScope(TransactionScopeOption.Required,
            //        new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }, TransactionScopeAsyncFlowOption.Enabled))
            //    {

            //        // Clone 1 doi giay
            //        var model = _repoModelName.FindById(modelNameID);
            //        var modelNameitem = _mapper.Map<ModelName>(model);
            //        modelNameitem.ID = 0;
            //        modelNameitem.ModelNo = modelNo;
            //        modelNameitem.Name = modelName;
            //        modelNameitem.ApprovedBy = 0;
            //        modelNameitem.ApprovedStatus = false;
            //        modelNameitem.CreatedStatus = false;
            //        _repoModelName.Add(modelNameitem);
            //        await _repoModelName.SaveAll();
            //        // Clone article no
            //        var artNo = await _repoArticleNo.FindAll().Where(x => x.ID == modelNameID).ToListAsync();
            //        if (model.ID > 0)
            //        {
            //            artNo.ForEach(item =>
            //            {
            //                item.ID = 0;
            //                item.Name = article;
            //                item.ID = model.ID;
            //            });
            //            _repoArticleNo.AddRange(artNo);
            //            await _repoArticleNo.SaveAll();
            //        }

            //        var glues = await _repoGlue.FindAll().Where(x => x.ModalNameID == modelNameID).ToListAsync();
            //        var glueIDList = glues.Select(a => a.ID).ToList();
            //        if (model.ID > 0)
            //        {
            //            foreach (var glue in glues)
            //            {
            //                var glueID = glue.ID;
            //                glue.ID = 0;
            //                glue.ModalNameID = model.ID;
            //                _repoGlue.Add(glue);
            //                var check = await _repoGlue.SaveAll();
            //                if (check)
            //                {
            //                    var glueIngredient = await _repoGlueIngredient.FindAll().Where(x => x.GlueID == glueID).ToListAsync();
            //                    glueIngredient.ForEach(item =>
            //                    {
            //                        item.ID = 0;
            //                        item.GlueID = glue.ID;
            //                    });
            //                    _repoGlueIngredient.AddRange(glueIngredient);
            //                    await _repoGlueIngredient.SaveAll();
            //                }
            //            }
            //            var updateGlues = await _repoGlue.FindAll().Where(x => x.ModalNameID == model.ID).ToListAsync();
            //            foreach (var art in artNo)
            //            {
            //                foreach (var glue in updateGlues)
            //                {
            //                    if (art.ID == glue.ModalNameID)
            //                    {
            //                        glue.ArticleNoID = art.ID;
            //                        glue.ProcessID = processID;
            //                        await _repoGlue.SaveAll();
            //                    }
            //                }
            //            }
            //            scope.Complete();
            //        }
            //    }
            //    return true;
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine("Failed to clone model name", ex);
            //    return false;
            //}
            throw new System.NotImplementedException();
        }
        public Task<object> Approval(int modelNameID, int userid)
        {
            //var item = _repoModelName.FindById(modelNameID);
            //item.ApprovedBy = userid;

            //try
            //{
            //    item.ApprovedStatus = !item.ApprovedStatus;
            //    if (item.ApprovedStatus)
            //        item.CreatedStatus = true;
            //    else item.CreatedStatus = false;


            //    return await _repoModelName.SaveAll();
            //}
            //catch (Exception)
            //{
            //    return false;
            //}
            throw new System.NotImplementedException();
        }

        public Task<object> Done(int modelNameID, int userid)
        {

            //var item = _repoModelName.FindById(modelNameID);
            //item.CreatedBy = userid;
            //try
            //{
            //    if (item.CreatedStatus == true && item.ApprovedStatus == true && item.ApprovedBy != 0)
            //    {
            //        return new
            //        {
            //            status = false,
            //            message = "This model name has been approved!"
            //        };
            //    }
            //    else if (item.ApprovedBy != 0 && item.CreatedStatus == false && item.ApprovedStatus == false)
            //    {
            //        item.ApprovedBy = 0;
            //        item.CreatedStatus = true;
            //        return new
            //        {
            //            status = await _repoModelName.SaveAll(),
            //            message = "This model name has been finished!"
            //        };
            //    }
            //    else
            //    {
            //        item.CreatedStatus = !item.CreatedStatus;
            //        return new
            //        {
            //            status = await _repoModelName.SaveAll(),
            //            message = "This model name has been finished!"
            //        };
            //    }

            //}
            //catch (Exception ex)
            //{
            //    return new
            //    {
            //        status = false,
            //        message = ex.Message
            //    };
            //}
            throw new System.NotImplementedException();
        }

        public Task<object> Release(int modelNameID, int userid)
        {
            //var item = _repoModelName.FindById(modelNameID);
            //try
            //{
            //    item.CreatedStatus = true;
            //    item.ApprovedStatus = true;
            //    item.ApprovedBy = userid;
            //    return await _repoModelName.SaveAll();
            //}
            //catch (Exception)
            //{
            //    return false;
            //}
            throw new System.NotImplementedException();
        }

        public Task<object> Reject(int modelNameID, int userid)
        {
            //var item = _repoModelName.FindById(modelNameID);
            //try
            //{
            //    item.CreatedStatus = false;
            //    item.ApprovedStatus = false;
            //    item.ApprovedBy = userid;
            //    return new
            //    {
            //        status = await _repoModelName.SaveAll(),
            //        message = "The model name has been rejected!!!",
            //        userId = item.CreatedBy
            //    };
            //}
            //catch (Exception ex)
            //{
            //    return new
            //    {
            //        status = false,
            //        message = ex.Message
            //    };
            //}
            throw new System.NotImplementedException();
        }

        public Task<List<ModelNameDto>> FilterByApprovedStatus()
        {
            //var lists = await _repoModelName.FindAll().Where(x => x.ApprovedStatus == true && x.CreatedStatus == true).ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            //return lists;
            throw new System.NotImplementedException();
        }

        public Task<List<ModelNameDto>> FilterByNotApprovedStatus()
        {
            //var lists = await _repoModelName.FindAll().Where(x => x.ApprovedStatus == false).ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            //return lists;
            throw new System.NotImplementedException();
        }

        public Task<List<ModelNameDto>> FilterByFinishedStatus()
        {
            //var lists = await _repoModelName.FindAll().Where(x => x.CreatedStatus == true).ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            //return lists;
            throw new System.NotImplementedException();
        }

        public async Task SendMailForPIC(string email)
        {
            string subject = "(SHC-902) DMR System - Notification";
            string url = _configuration["MailSettings:API_URL"].ToSafetyString();
            string message = @"
                Notification from Digital Mixing Room <br />
                <b>*PLEASE DO NOT REPLY*</b> this email was automatically sent from the Digital Mixing Room <br />
                The model name has been rejected by suppervisor!!!<br />";
            message += $"<a href='{url}'>Click here to go to the system</a>";
            var emails = new List<string> { email };

            await _mailExtension.SendEmailRangeAsync(emails, subject, message);
        }

        public Task<bool> ImportExcel(List<ModelNameForImportExcelDto> modelNameForImportExcelDtos)
        {
            //var modelNameList = modelNameForImportExcelDtos.DistinctBy(x => new { x.ModelNo, x.ModelName, x.ArticleNo, x.Process })
            //    .GroupBy(x => new { x.ModelName, x.ModelNo })
            //    .Select(x => new ModelNameForImportExcelDto
            //    {
            //        ModelName = x.Key.ModelName,
            //        ModelNo = x.Key.ModelNo,
            //        ArticleNos = x.Select(a => a.ArticleNo).ToList(),
            //        Processes = x.Select(a => a.Process).ToList()
            //    }).ToList();
            //try
            //{
            //    foreach (var item in modelNameList)
            //    {
            //        var modelName = new ModelName
            //        {
            //            ModelNo = item.ModelNo,
            //            Name = item.ModelName,
            //            CreatedDate = DateTime.Now,
            //            CreatedBy = item.CreatedBy
            //        };
            //        var result = await _repoModelName.FindAll().FirstOrDefaultAsync(x => x.ModelNo.Equals(modelName.ModelNo) && x.Name.Equals(modelName.Name));
            //        if (result == null)
            //        {
            //            _repoModelName.Add(modelName);
            //            await _repoModelName.SaveAll();
            //            foreach (var art in item.ArticleNos)
            //            {
            //                var articleNo = new ArticleNo
            //                {
            //                    // ModelNameID = modelName.ID,
            //                    Name = art,
            //                    CreatedDate = DateTime.Now
            //                };

            //                _repoArticleNo.Add(articleNo);
            //                await _repoArticleNo.SaveAll();
            //            }
            //            foreach (var pro in item.Processes)
            //            {
            //                var process = new Process
            //                {
            //                   //  ModelNameID = modelName.ID,
            //                    Name = pro,
            //                };

            //                _repoProcess.Add(process);
            //                await _repoProcess.SaveAll();
            //            }
            //        }
            //        else
            //        {
            //            result.CreatedBy = modelNameForImportExcelDtos.FirstOrDefault().CreatedBy;
            //            await _repoArticleNo.SaveAll();
            //        }
            //    }
            //    return true;
            //}
            //catch (Exception)
            //{
            //    return false;

            //}
            throw new System.NotImplementedException();
        }

        public Task<List<ModelNameDto>> GetModelNameForBPFCRecord(Status status, string startBuildingDate, string endBuildingDate)
        {
            //var lists = _repoModelName.FindAll().ProjectTo<ModelNameDto>(_configMapper).OrderByDescending(x => x.ID);
            //var result = new List<ModelNameDto>();
            //if (status == Status.All && !startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            //{
            //    var start = Convert.ToDateTime(startBuildingDate).Date;
            //    var end = Convert.ToDateTime(endBuildingDate).Date;
            //    result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end).ToListAsync();
            //}
            //if (status == Status.Done && !startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            //{
            //    var start = Convert.ToDateTime(startBuildingDate).Date;
            //    var end = Convert.ToDateTime(endBuildingDate).Date;
            //    result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end && x.CreatedStatus == true).ToListAsync();
            //}
            //if (status == Status.Done)
            //{
            //    result = await lists.Where(x => x.CreatedStatus == true).ToListAsync();

            //}
            //if (status == Status.All)
            //{
            //    result = await lists.ToListAsync();

            //}
            //if (!startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            //{
            //    var start = Convert.ToDateTime(startBuildingDate).Date;
            //    var end = Convert.ToDateTime(endBuildingDate).Date;
            //    result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end).ToListAsync();
            //}
            //if (result.Count > 0)
            //{
            //    result.ForEach(item =>
            //    {
            //        var glue = _repoGlue.FindAll().FirstOrDefault(x => x.ModalNameID == item.ID);
            //        if (glue != null)
            //        {
            //            var ingredient = _repoGlueIngredient.FindAll().FirstOrDefault(x => x.GlueID == glue.ID && x.Position == "A");
            //            if (ingredient != null)
            //            {
            //                var supplier = _repoIngredient.FindById(ingredient.IngredientID);
            //                if (supplier != null)
            //                {
            //                    item.Supplier = _supplierRepository.FindById(supplier.SupplierID).Name;
            //                }
            //                else
            //                {
            //                    item.Supplier = "#N/A";
            //                }
            //            }
            //            else
            //            {
            //                item.Supplier = "#N/A";
            //            }
            //        }
            //        else
            //        {
            //            item.Supplier = "#N/A";
            //        }

            //    });
            //}
            //return result;
            throw new System.NotImplementedException();


        }
        //Lấy toàn bộ danh sách Brand 
        public Task<List<ModelNameDtoForBPFCSchedule>> GetAllModelNameForBPFCSchedule()
        {
            //var lists = await _repoModelName.FindAll().Join(_repoArticleNo.FindAll(),
            //    m => m.ID,
            //    a => a.ModelNameID,
            //    (m, a) => new { m, a })
            //     .Join(_repoProcess.FindAll(), ma => ma.m.ID, p => p.ModelNameID,
            //             (ma, p) => new { ma, p }).Select(x => new ModelNameDtoForBPFCSchedule
            //             {
            //                 ID = x.ma.m.ID,
            //                 Name = x.ma.m.Name,
            //                 ModelNo = x.ma.m.ModelNo,
            //                 CreatedDate = x.ma.m.CreatedDate,
            //                 ArticleNo = x.ma.a.Name,
            //                 ApprovedStatus = x.ma.m.ApprovedStatus,
            //                 CreatedStatus = x.ma.m.CreatedStatus,
            //                 ApprovedBy = x.ma.m.ApprovedBy,
            //                 CreatedBy = x.ma.m.CreatedBy,
            //                 Process = x.p.Name
            //             }).ToListAsync();
            // return new List<ModelNameDtoForBPFCSchedule>();
            throw new System.NotImplementedException();

        }

        public async Task<bool> CloneModelName(int modelNameID, int modelNOID, int articleNOID, int processID)
        {
            try
            {
                using (var scope = new TransactionScope(TransactionScopeOption.Required,
                  new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }, TransactionScopeAsyncFlowOption.Enabled))
                {
                    var bpfc = await _repoBPFC.FindAll()
                                        .Include(x => x.ModelName)
                                        .Include(x => x.ModelNo)
                                        .Include(x => x.ArtProcess)
                                        .Include(x => x.ArticleNo)
                                        .Include(x => x.Glues.Where(x => x.isShow == true))
                                        .Include(x => x.Plans)
                                        .FirstOrDefaultAsync(x => x.ModelNameID == modelNameID
                                    && x.ModelNoID == modelNOID
                                    && x.ArticleNoID == articleNOID
                                    && x.ArtProcessID == processID);
                    if (bpfc == null) return false;
                    var modelNameData = bpfc.ModelName;
                    modelNameData.ID = 0;
                    _repoModelName.Add(modelNameData);
                    await _repoModelName.SaveAll();

                    var modelNoData = bpfc.ModelNo;
                    modelNoData.ID = 0;
                    modelNoData.ModelNameID = modelNameData.ID;
                    _repoModelNO.Add(modelNoData);
                    await _repoModelNO.SaveAll();

                    var articleNOData = bpfc.ArticleNo;
                    articleNOData.ID = 0;
                    articleNOData.ModelNoID = modelNoData.ID;
                    _repoArticleNo.Add(articleNOData);
                    await _repoArticleNo.SaveAll();

                    var artProcessData = bpfc.ArtProcess;
                    artProcessData.ID = 0;
                    artProcessData.ArticleNoID = articleNOData.ID;
                    _repoArtProcess.Add(artProcessData);
                    await _repoArtProcess.SaveAll();

                    var bpfcData = bpfc;
                    bpfcData.ModelName = null;
                    bpfcData.ModelNo = null;
                    bpfcData.ArticleNo = null;
                    bpfcData.ArtProcess = null;
                    bpfcData.Glues = null;
                    bpfcData.Plans = null;
                    bpfcData.ID = 0;
                    bpfcData.ModelNameID = modelNameData.ID;
                    bpfcData.ModelNoID = modelNoData.ID;
                    bpfcData.ArticleNoID = articleNOData.ID;
                    bpfcData.ArtProcessID = artProcessData.ID;
                    _repoBPFC.Add(bpfcData);
                    await _repoBPFC.SaveAll();

                    var gluesData = bpfc.Glues.ToList();
                    gluesData.ForEach(item =>
                    {
                        item.ID = 0;
                        item.BPFCEstablishID = bpfcData.ID;
                    });

                    _repoGlue.AddRange(gluesData);
                    await _repoGlue.SaveAll();

                    var planData = bpfc.Plans.ToList();
                    planData.ForEach(item =>
                    {
                        item.ID = 0;
                        item.BPFCEstablishID = bpfcData.ID;
                    });

                    _repoPlan.AddRange(planData);
                    await _repoPlan.SaveAll();
                    scope.Complete();
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Loi clone model name", ex);
                return false;
            }
        }
        private async Task<string> GenatateGlueCode(string code)
        {
            int lenght = 8;
            if (await _repoGlue.FindAll().AnyAsync(x => x.isShow == true && x.Code.Equals(code)) == true)
            {
                var newCode = CodeUtility.RandomString(lenght);
                return await GenatateGlueCode(newCode);
            }
            return code;

        }
        private async Task<bool> CheckExistBPFC(CloneDto clone)
        {
            var bpfc = await _repoBPFC.FindAll().AnyAsync(x => x.ModelNameID == clone.ModelNameID
                                 && x.ModelNoID == clone.ModelNOID
                                 && x.ArticleNoID == clone.ArticleNOID
                                 && x.ArtProcessID == clone.ArtProcessID);
            return bpfc;
        }
        public async Task<BPFCEstablish> CreateNewBPFCByCloneDto(CloneDto clone, int artProcessID)
        {

            var bpfcData = new BPFCEstablish();
            bpfcData.ModelNameID = clone.ModelNameID;
            bpfcData.ModelNoID = clone.ModelNOID;

            bpfcData.ArticleNoID = clone.ArticleNOID;
            bpfcData.ArtProcessID = artProcessID;

            bpfcData.ApprovalStatus = false;
            bpfcData.FinishedStatus = false;
            bpfcData.CreatedBy = clone.CloneBy;
            bpfcData.ApprovalBy = 0;
            bpfcData.CreatedBy = clone.CloneBy;
            bpfcData.UpdateTime = DateTime.Now;
            bpfcData.BuildingDate = DateTime.Now;
            bpfcData.CreatedDate = DateTime.Now;
            _repoBPFC.Add(bpfcData);
            await _repoBPFC.SaveAll();
            return bpfcData;
        }
        public async Task CloneGlueByCloneDto(CloneDto clone, BPFCEstablish bpfc, BPFCEstablish bpfcClone)
        {

            var gluesData = new List<Glue>();
            if (bpfcClone.Glues == null)
            {
                gluesData = bpfc.Glues.Where(x => x.isShow == true).ToList();
            }
            else
            {
                var list2 = bpfcClone.Glues.Where(x => x.isShow == true).Select(x => x.Name);
                var list1 = bpfc.Glues.Where(x => x.isShow == true).Select(x => x.Name);
                var check = list1.Except(list2);
                gluesData = bpfc.Glues.Where(x =>x.isShow == true && check.Contains(x.Name)).ToList();
            }
            if (gluesData.Count == 0)
                return;
            foreach (var item in gluesData)
            {
                var glue = new Glue();
                glue.Code = await this.GenatateGlueCode(item.Code);
                glue.Name = item.Name;
                glue.isShow = true;
                glue.Consumption = item.Consumption;
                glue.CreatedBy = clone.CloneBy;
                glue.MaterialID = item.MaterialID;
                glue.KindID = item.KindID;
                glue.PartID = item.PartID;
                glue.ExpiredTime = item.ExpiredTime;
                glue.BPFCEstablishID = bpfcClone.ID;
                _repoGlue.Add(glue);
                await _repoGlue.SaveAll();

                var glueIngredients = item.GlueIngredients.ToList();
                var glueIngredientData = glueIngredients.Select(x => new GlueIngredient
                {
                    GlueID = glue.ID,
                    IngredientID = x.IngredientID,
                    Allow = x.Allow,
                    Percentage = x.Percentage,
                    CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt"),
                    Position = x.Position,
                }).ToList();
                _repoGlueIngredient.AddRange(glueIngredientData);
                await _repoGlueIngredient.SaveAll();
            }
        }
        public async Task<ArtProcess> FindArtProcessByCloneDto(CloneDto clone)
        {
            var artProcess = await _repoArtProcess.FindAll().FirstOrDefaultAsync(x => x.ArticleNoID == clone.ArticleNOID && x.ProcessID == clone.ArtProcessID);
            if (artProcess != null)
                return artProcess;
            else
            {
                var artProcessData = new ArtProcess();
                artProcessData.ArticleNoID = clone.ArticleNOID;
                artProcessData.ProcessID = clone.ArtProcessID;
                _repoArtProcess.Add(artProcessData);
                await _repoGlueIngredient.SaveAll();
                return artProcessData;
            }
        }
        public async Task<BPFCEstablish> FindBPFCByCloneDto(CloneDto clone, ArtProcess artProcess)
        {
            var bpfcForClone = await _repoBPFC.FindAll()
                                              .Include(x => x.ModelName)
                                              .Include(x => x.ModelNo)
                                              .Include(x => x.ArtProcess)
                                              .Include(x => x.ArticleNo)
                                              .Include(x => x.Glues)
                                              .ThenInclude(x => x.GlueIngredients)
                                              .Include(x => x.Plans)
                                              .FirstOrDefaultAsync(x => x.ModelNameID == clone.ModelNameID
                                                                                              && x.ModelNoID == clone.ModelNOID
                                                                                              && x.ArticleNoID == clone.ArticleNOID
                                                                                          && x.ArtProcessID == artProcess.ID);
            return bpfcForClone;
        }
        public async Task<object> CloneModelName(CloneDto clone)
        {
            try
            {
                using (var scope = new TransactionScope(TransactionScopeOption.Required,
                  new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }, TransactionScopeAsyncFlowOption.Enabled))
                {

                    var bpfc = await _repoBPFC.FindAll()
                                        .Include(x => x.ModelName)
                                        .Include(x => x.ModelNo)
                                        .Include(x => x.ArtProcess)
                                        .Include(x => x.ArticleNo)
                                        .Include(x => x.Glues).ThenInclude(x => x.GlueIngredients)
                                        .Include(x => x.Plans)
                                        .FirstOrDefaultAsync(x => x.ID == clone.BPFCID);
                    if (bpfc == null)
                        return new
                        {
                            message = "The BPFC is invalid!",
                            status = false
                        };
                    /// Case 1: 
                    // IF keep model Name
                    if (bpfc.ModelNameID == clone.ModelNameID)
                    {
                        /// Case 1.1: 
                        // Change model NO
                        if (bpfc.ModelNoID != clone.ModelNOID)
                        {
                            var artProcess = await FindArtProcessByCloneDto(clone);
                            var bpfcForClone = await FindBPFCByCloneDto(clone, artProcess);
                            // Not exists bpfc -> add new -> clone
                            if (bpfcForClone == null)
                            {
                                var bpfcClone = await CreateNewBPFCByCloneDto(clone, artProcess.ID);
                                await CloneGlueByCloneDto(clone, bpfc, bpfcClone);
                            }
                            else
                            {
                                await CloneGlueByCloneDto(clone, bpfc, bpfcForClone);
                            }
                        }
                        // IF keep model NO
                        if (bpfc.ModelNoID == clone.ModelNOID)
                        {
                            var artProcess = await FindArtProcessByCloneDto(clone);
                            var bpfcForClone = await FindBPFCByCloneDto(clone, artProcess);
                            if (bpfcForClone == null)
                            {
                                var bpfcClone = await CreateNewBPFCByCloneDto(clone, artProcess.ID);
                                await CloneGlueByCloneDto(clone, bpfc, bpfcClone);
                            }
                            else
                            {
                                await CloneGlueByCloneDto(clone, bpfc, bpfcForClone);
                            }
                        }
                    }
                    /// Case 2: 
                    // Change different ModelName
                    if (bpfc.ModelNameID != clone.ModelNameID)
                    {
                        var artProcess = await FindArtProcessByCloneDto(clone);
                        // Check BPFC
                        var bpfcForClone = await FindBPFCByCloneDto(clone, artProcess);
                        // Not exists bpfc -> add new BPFC -> CloneGlueByCloneDto
                        if (bpfcForClone == null)
                        {
                            var cloneBPFC = await CreateNewBPFCByCloneDto(clone, artProcess.ID);
                            await CloneGlueByCloneDto(clone, bpfc, cloneBPFC);
                        }
                        else
                        {
                            await CloneGlueByCloneDto(clone, bpfc, bpfcForClone);
                        }
                    }
                    scope.Complete();
                }
                return new
                {
                    message = "The BPFC has been cloned!",
                    status = true
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("Loi clone model name", ex);
                return new
                {
                    message = "",
                    status = false
                };
            }
        }
    }
}