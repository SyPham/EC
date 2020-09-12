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
using System.Transactions;
using Microsoft.Extensions.Configuration;
using EC_API.Helpers.Enum;

namespace EC_API._Services.Services
{
    public class BPFCEstablishService : IBPFCEstablishService
    {
        private readonly IBPFCEstablishRepository _repoBPFCEstablish;
        private readonly IBPFCHistoryRepository _repoBPFCHistory;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        private readonly IModelNameRepository _repoModelName;
        private readonly IModelNoRepository _repoModelNo;
        private readonly IMailExtension _mailExtension;
        private readonly IArticleNoRepository _repoArticleNo;
        private readonly IConfiguration _configuration;
        private readonly IArtProcessRepository _repoArtProcess;
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IGlueRepository _repoGlue;
        private readonly ICommentRepository _repoComment;
        public BPFCEstablishService(
            IBPFCEstablishRepository repoBPFCEstablish,
            IBPFCHistoryRepository repoBPFCHistory,
            IModelNameRepository repoModelName,
            IModelNoRepository repoModelNo,
            IConfiguration configuration,
            IMailExtension mailExtension,
            IArticleNoRepository repoArticleNo,
            IGlueRepository repoGlue,
            IGlueIngredientRepository repoGlueIngredient,
            IArtProcessRepository repoArtProcess,
            IMapper mapper,
            ICommentRepository repoComment,
            MapperConfiguration configMapper
            )
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoComment = repoComment;
            _repoBPFCEstablish = repoBPFCEstablish;
            _repoBPFCHistory = repoBPFCHistory;
            _repoModelName = repoModelName;
            _configuration = configuration;
            _repoModelNo = repoModelNo;
            _repoArticleNo = repoArticleNo;
            _mailExtension = mailExtension;
            _repoArtProcess = repoArtProcess;
            _repoGlueIngredient = repoGlueIngredient;
            _repoGlue = repoGlue;
        }

        //Thêm Brand mới vào bảng BPFCEstablish
        public async Task<bool> Add(BPFCEstablishDto model)
        {
            var item = _mapper.Map<BPFCEstablish>(model);
            _repoBPFCEstablish.Add(item);
            return await _repoBPFCEstablish.SaveAll();
        }



        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<BPFCEstablishDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoBPFCEstablish.FindAll().ProjectTo<BPFCEstablishDto>(_configMapper).OrderBy(x => x.ID);
            return await PagedList<BPFCEstablishDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //Tìm kiếm BPFCEstablish
        public async Task<PagedList<BPFCEstablishDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoBPFCEstablish.FindAll().ProjectTo<BPFCEstablishDto>(_configMapper)
            .Where(x => x.Season.Contains(text.ToString()))
            .OrderBy(x => x.ID);
            return await PagedList<BPFCEstablishDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var BPFCEstablish = _repoBPFCEstablish.FindById(id);
            _repoBPFCEstablish.Remove(BPFCEstablish);
            return await _repoBPFCEstablish.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(BPFCEstablishDto model)
        {
            var BPFCEstablish = _mapper.Map<BPFCEstablish>(model);
            _repoBPFCEstablish.Update(BPFCEstablish);
            return await _repoBPFCEstablish.SaveAll();
        }

        //Lấy toàn bộ danh sách Brand 
        public async Task<List<BPFCEstablishDto>> GetAllAsync()
        {
            return await _repoBPFCEstablish
                .FindAll()
                .Include(x => x.ModelName)
                .Include(x => x.ModelNo)
                .Include(x => x.ArticleNo)
                .Include(x => x.ArtProcess).ThenInclude(x => x.Process)
                .ProjectTo<BPFCEstablishDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }
        public async Task<List<BPFCHistoryDto>> GetAllHistoryAsync()
        {
            return await _repoBPFCHistory.FindAll().ProjectTo<BPFCHistoryDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public async Task<bool> CheckGlueID(int glueid)
        {
            return await _repoBPFCHistory.CheckGlueID(glueid);
        }
        public async Task<bool> Create(BPFCHistoryDto entity)
        {
            var entitys = new BPFCHistory();
            if (await _repoBPFCHistory.CheckGlueID(entity.GlueID))
            {
                var checkBPFC = _repoBPFCEstablish.FindById(entity.BPFCEstablishID);
                if (checkBPFC.FinishedStatus == true && checkBPFC.ApprovalStatus == true)
                {
                    if (entity.Action == "Consumption")
                    {
                        entitys.Action = "Improve";
                        entitys.Before = entity.Before;
                        entitys.After = entity.After;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }
                    else
                    {
                        entitys.Action = "Improve";
                        entitys.Before = entity.BeforeAllow;
                        entitys.After = entity.AfterAllow;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }
                    checkBPFC.ApprovalStatus = false;
                    checkBPFC.FinishedStatus = false;
                    await _repoBPFCEstablish.SaveAll();
                }
                else if (checkBPFC.FinishedStatus == true && checkBPFC.ApprovalStatus == false)
                {
                    if (entity.Action == "Consumption")
                    {
                        entitys.Action = "Modified";
                        entitys.Before = entity.Before;
                        entitys.After = entity.After;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }
                    else
                    {
                        entitys.Action = "Modified";
                        entitys.Before = entity.BeforeAllow;
                        entitys.After = entity.AfterAllow;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }

                }
                else
                {
                    if (entity.Action == "Consumption")
                    {
                        entitys.Action = "Update";
                        entitys.Before = entity.Before;
                        entitys.After = entity.After;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }
                    else
                    {

                        entitys.Action = "Update";
                        entitys.Before = entity.BeforeAllow;
                        entitys.After = entity.AfterAllow;
                        entitys.BPFCEstablishID = entity.BPFCEstablishID;
                        entitys.UserID = entity.UserID;
                        entitys.GlueID = entity.GlueID;
                    }

                }

            }
            else
            {
                if (entity.Action == "Created")
                {
                    entitys.Action = entity.Action;
                    entitys.Before = "";
                    entitys.After = "";
                    entitys.BPFCEstablishID = entity.BPFCEstablishID;
                    entitys.UserID = entity.UserID;
                    entitys.GlueID = entity.GlueID;
                }
            }


            try
            {
                _repoBPFCHistory.Add(entitys);
                await _repoBPFCHistory.SaveAll();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }

        //Lấy Brand theo Brand_Id
        public BPFCEstablishDto GetById(object id)
        {
            return _mapper.Map<BPFCEstablish, BPFCEstablishDto>(_repoBPFCEstablish.FindById(id));
        }
        private async Task<bool> CheckUpdateData(BPFCEstablishDtoForImportExcel bPFCEstablishDto)
        {
            var model = await (from m in _repoModelName.FindAll()
                               join n in _repoModelNo.FindAll() on m.ID equals n.ModelNameID
                               join a in _repoArticleNo.FindAll() on n.ID equals a.ModelNoID
                               join ap in _repoArtProcess.FindAll().Include(x => x.Process) on a.ID equals ap.ArticleNoID
                               select new BPFCEstablishDtoForImportExcel
                               {
                                   ModelName = m.Name,
                                   ModelNo = n.Name,
                                   ArticleNo = a.Name,
                                   Process = ap.Process.Name,
                                   CreatedBy = bPFCEstablishDto.CreatedBy,
                                   CreatedDate = bPFCEstablishDto.CreatedDate
                               }).ToListAsync();
            return model.Any(x => x.ModelName == bPFCEstablishDto.ModelName
            && x.ModelNo == bPFCEstablishDto.ModelNo
            && x.ArticleNo == bPFCEstablishDto.ArticleNo
            && x.Process == bPFCEstablishDto.Process);
        }

        private async Task<BPFCEstablishDto> AddBPFC(BPFCEstablishDtoForImportExcel bPFCEstablishDto)
        {
            var result = new BPFCEstablishDto();
            // make model name, model no, article no, process
            using (var scope = new TransactionScope(TransactionScopeOption.Required,
             new TransactionOptions { IsolationLevel = IsolationLevel.ReadCommitted }, TransactionScopeAsyncFlowOption.Enabled))
            {
                // make model name
                var modelName = await _repoModelName.FindAll().FirstOrDefaultAsync(x => x.Name.ToUpper().Equals(bPFCEstablishDto.ModelName.ToUpper()));
                if (modelName != null)
                {
                    result.ModelNameID = modelName.ID;
                }
                else
                {
                    var modelNameModel = new ModelName { Name = bPFCEstablishDto.ModelName };
                    _repoModelName.Add(modelNameModel);
                    await _repoModelNo.SaveAll();
                    result.ModelNameID = modelNameModel.ID;
                }
                // end make model no

                // Make model no
                var modelNo = await _repoModelNo.FindAll().FirstOrDefaultAsync(x => x.Name.ToUpper().Equals(bPFCEstablishDto.ModelNo.ToUpper()) && x.ModelNameID == result.ModelNameID);
                if (modelNo != null)
                {
                    result.ModelNoID = modelNo.ID;
                }
                else
                {
                    var modelNoModel = new ModelNo { Name = bPFCEstablishDto.ModelNo, ModelNameID = result.ModelNameID };
                    _repoModelNo.Add(modelNoModel);
                    await _repoModelNo.SaveAll();
                    result.ModelNoID = modelNoModel.ID;
                }
                // end make model NO

                // end make articleNO

                var artNo = await _repoArticleNo.FindAll().FirstOrDefaultAsync(x => x.Name.ToUpper().Equals(bPFCEstablishDto.ArticleNo.ToUpper()) && x.ModelNoID == result.ModelNoID);
                if (artNo != null)
                {
                    result.ArticleNoID = artNo.ID;
                }
                else
                {
                    // make art no
                    var articleNoModel = new ArticleNo { Name = bPFCEstablishDto.ArticleNo, ModelNoID = result.ModelNoID };
                    _repoArticleNo.Add(articleNoModel);
                    await _repoArticleNo.SaveAll();
                    result.ArticleNoID = articleNoModel.ID;
                }
                // end articleNO
                //  make Art Process

                var artProcess = await _repoArtProcess.FindAll().FirstOrDefaultAsync(x => x.ProcessID.Equals(bPFCEstablishDto.Process.ToUpper() == "STF" ? 2 : 1) && x.ArticleNoID == result.ArticleNoID);
                if (artProcess != null)
                {
                    result.ArtProcessID = artProcess.ID;
                }
                else
                {
                    // make art process
                    var artProcessModel = new ArtProcess { ArticleNoID = result.ArticleNoID, ProcessID = bPFCEstablishDto.Process.ToUpper() == "STF" ? 2 : 1 };
                    _repoArtProcess.Add(artProcessModel);
                    await _repoArtProcess.SaveAll();
                    result.ArtProcessID = artProcessModel.ID;
                }
                //End  make Art Process

                result.CreatedBy = bPFCEstablishDto.CreatedBy;
                scope.Complete();
                return result;
            }
        }
        private async Task<bool> CheckExistBPFC(BPFCEstablishDto bPFC)
        {
            return await _repoBPFCEstablish.FindAll().AnyAsync(x => x.ModelNameID == bPFC.ModelNameID && x.ModelNoID == bPFC.ModelNoID && x.ArticleNoID == bPFC.ArticleNoID && x.ArtProcessID == bPFC.ArtProcessID);
        }
        public async Task ImportExcel(List<BPFCEstablishDtoForImportExcel> bPFCEstablishDtos)
        {
            try
            {
                var list = new List<BPFCEstablishDto>();
                var listChuaAdd = new List<BPFCEstablishDto>();
                var listAddBiLoi = new List<BPFCEstablishDto>();
                var result = bPFCEstablishDtos.DistinctBy(x => new
                {
                    x.ModelName,
                    x.ModelNo,
                    x.ArticleNo,
                    x.Process
                }).ToList();

                foreach (var item in result)
                {
                    var bpfc = await AddBPFC(item);
                    list.Add(bpfc);
                }

                var listAdd = new List<BPFCEstablish>();
                foreach (var bpfc in list)
                {
                    if (!await CheckExistBPFC(bpfc))
                    {
                        var bp = new BPFCEstablish();
                        bp.ModelNameID = bpfc.ModelNameID;
                        bp.ModelNoID = bpfc.ModelNoID;
                        bp.ArticleNoID = bpfc.ArticleNoID;
                        bp.ArtProcessID = bpfc.ArtProcessID;
                        bp.CreatedBy = bpfc.CreatedBy;
                        bp.ApprovalBy = bpfc.ApprovalBy;
                        bp.CreatedDate = DateTime.Now;
                        bp.UpdateTime = DateTime.Now;
                        bp.ApprovalStatus = bpfc.ApprovalStatus;
                        bp.FinishedStatus = bpfc.FinishedStatus;
                        bp.Season = bpfc.Season;
                        bp.ModelName = null;
                        bp.ModelNo = null;
                        bp.ArticleNo = null;
                        bp.ArtProcess = null;
                        bp.Glues = null;
                        bp.Plans = null;
                        _repoBPFCEstablish.Add(bp);
                        await _repoBPFCEstablish.SaveAll();
                        listAdd.Add(bp);
                    }
                    else
                    {
                        listChuaAdd.Add(bpfc);
                    }
                }
                var result1 = listAdd.Where(x => x.ID > 0).ToList();
                var result2 = listAdd.Where(x => x.ID == 0).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
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
        public async Task<object> Approval(int bpfcID, int userid)
        {
            var item = _repoBPFCEstablish.FindById(bpfcID);
            item.ApprovalBy = userid;

            try
            {
                item.ApprovalStatus = !item.ApprovalStatus;
                if (item.ApprovalStatus)
                    item.FinishedStatus = true;
                else item.FinishedStatus = false;


                return await _repoBPFCEstablish.SaveAll();
            }
            catch (Exception)
            {
                return false;
            }
            throw new System.NotImplementedException();
        }

        public async Task<object> Done(int bpfcID, int userid)
        {
            var item = _repoBPFCEstablish.FindById(bpfcID);
            item.CreatedBy = userid;
            try
            {
                if (item.FinishedStatus == true && item.ApprovalStatus == true && item.ApprovalBy != 0)
                {
                    return new
                    {
                        status = false,
                        message = "This model name has been approved!"
                    };
                }
                else if (item.ApprovalBy != 0 && item.FinishedStatus == false && item.ApprovalStatus == false)
                {
                    item.ApprovalBy = 0;
                    item.FinishedStatus = true;
                    return new
                    {
                        status = await _repoBPFCEstablish.SaveAll(),
                        message = "This model name has been finished!"
                    };
                }
                else
                {
                    item.FinishedStatus = !item.FinishedStatus;

                    return new
                    {
                        status = await _repoBPFCEstablish.SaveAll(),
                        message = "This model name has been finished!"
                    };
                }

            }
            catch (Exception ex)
            {
                return new
                {
                    status = false,
                    message = ex.Message
                };
            }
            throw new System.NotImplementedException();
        }

        public async Task<object> Release(int bpfcID, int userid)
        {
            var item = _repoBPFCEstablish.FindById(bpfcID);
            try
            {
                item.FinishedStatus = true;
                item.ApprovalStatus = true;
                item.ApprovalBy = userid;
                return await _repoBPFCEstablish.SaveAll();
            }
            catch (Exception)
            {
                return false;
            }
            throw new System.NotImplementedException();
        }

        public async Task<object> Reject(int bpfcID, int userid)
        {
            var item = _repoBPFCEstablish.FindById(bpfcID);
            try
            {

                item.FinishedStatus = false;
                item.ApprovalStatus = false;
                item.ApprovalBy = userid;
                //add Reject vao history
                var result = new BPFCHistory();
                result.Action = "Rejected";
                result.BPFCEstablishID = bpfcID;
                var remark = _repoComment.FindAll().Where(x => x.BPFCEstablishID == bpfcID).OrderBy(y => y.CreatedDate).LastOrDefault();
                if (remark == null)
                {
                    //rollback
                    return new
                    {
                        status = false,
                        message = "Please Enter new comment to Reject BPFC !"
                    };
                }
                result.Remark = remark.Content;
                result.UserID = userid;
                var timePresent = DateTime.Now;
                var timeLast = Convert.ToDateTime(remark.CreatedDate);
                var compare = DateTime.Compare(timePresent.Date, timeLast.Date);
                
                if (compare > 0)
                {
                    return new
                    {
                        status = false,
                        message = "The Lastest comment allow 1 Hour , Please Enter new comment to Reject BPFC !",
                        userId = item.CreatedBy
                    };
                }
                if (compare == 0 && timePresent.TimeOfDay.TotalHours - timeLast.TimeOfDay.TotalHours > 1)
                {
                    return new
                    {
                        status = false,
                        message = "The Lastest comment allow 1 Hour , Please Enter new comment to Reject BPFC !",
                        userId = item.CreatedBy
                    };
                }
                _repoBPFCHistory.Add(result);
                var status2 = await _repoBPFCEstablish.SaveAll();
                return new
                {
                    status = status2,
                    message = "The model name has been rejected!!!",
                    userId = item.CreatedBy
                };

            }
            catch (Exception ex)
            {
                return new
                {
                    status = false,
                    message = ex.Message
                };
            }
        }

        public async Task<List<BPFCStatusDto>> FilterByApprovedStatus()
        {
            var lists = await _repoBPFCEstablish.FindAll().Where(x => x.ApprovalStatus == true && x.FinishedStatus == true).ProjectTo<BPFCStatusDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            return lists;
        }

        public async Task<List<BPFCStatusDto>> FilterByNotApprovedStatus()
        {
            var lists = await _repoBPFCEstablish.FindAll().Where(x => x.ApprovalStatus == false).ProjectTo<BPFCStatusDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            return lists;
        }

        public async Task<List<BPFCStatusDto>> FilterByFinishedStatus()
        {
            var lists = await _repoBPFCEstablish.FindAll().Where(x => x.ApprovalStatus == true).ProjectTo<BPFCStatusDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            return lists;
        }
        public async Task<List<ModelNameDtoForBPFCSchedule>> GetAllBPFCSchedule()
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
            return new List<ModelNameDtoForBPFCSchedule>();

        }
        public async Task<List<BPFCStatusDto>> GetAllBPFCStatus()
        {
            return await _repoBPFCEstablish
                .FindAll()
                .Include(x => x.ModelName)
                .Include(x => x.ModelNo)
                .Include(x => x.ArticleNo)
                .Include(x => x.ArtProcess).ThenInclude(x => x.Process)
                .ProjectTo<BPFCStatusDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();

        }
        public async Task<List<ModelNameDto>> GetModelNameForBPFCRecord(Status status, string startBuildingDate, string endBuildingDate)
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

        public async Task<List<BPFCRecordDto>> GetAllBPFCRecord(Status status, string startBuildingDate, string endBuildingDate)
        {
            var lists = _repoBPFCEstablish.FindAll().ProjectTo<BPFCRecordDto>(_configMapper).OrderByDescending(x => x.ID);
            var result = new List<BPFCRecordDto>();
            if (status == Status.All && !startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            {
                var start = Convert.ToDateTime(startBuildingDate).Date;
                var end = Convert.ToDateTime(endBuildingDate).Date;
                result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end).ToListAsync();
            }
            if (status == Status.Done && !startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            {
                var start = Convert.ToDateTime(startBuildingDate).Date;
                var end = Convert.ToDateTime(endBuildingDate).Date;
                result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end && x.FinishedStatus == true).ToListAsync();
            }
            if (status == Status.Done)
            {
                result = await lists.Where(x => x.FinishedStatus == true).ToListAsync();

            }
            if (status == Status.All)
            {
                result = await lists.ToListAsync();

            }
            if (!startBuildingDate.IsNullOrEmpty() && !endBuildingDate.IsNullOrEmpty())
            {
                var start = Convert.ToDateTime(startBuildingDate).Date;
                var end = Convert.ToDateTime(endBuildingDate).Date;
                result = await lists.Where(x => x.BuildingDate.Value.Date >= start && x.BuildingDate.Value.Date <= end).ToListAsync();
            }
            if (result.Count > 0)
            {
                result.ForEach(item =>
                {
                    var glue = _repoGlue.FindAll().FirstOrDefault(x => x.isShow == true && x.BPFCEstablishID == item.ID);
                    if (glue != null)
                    {
                        var ingredient = _repoGlueIngredient.FindAll().Include(x => x.Ingredient).ThenInclude(x => x.Supplier).FirstOrDefault(x => x.GlueID == glue.ID && x.Position == "A");
                        if (ingredient != null)
                        {
                            item.Supplier = ingredient.Ingredient.Supplier.Name ?? "#N/A";
                        }
                        else
                        {
                            item.Supplier = "#N/A";
                        }
                    }
                    else
                    {
                        item.Supplier = "#N/A";
                    }

                });
            }
            return result;
        }

        public async Task<object> GetAllBPFCByBuildingID(int buildingID)
        {
            var model = await _repoBPFCEstablish.FindAll()
                       .Where(x => x.ApprovalStatus == true)
                      .Include(x => x.Plans)
                      .Include(x => x.ModelName)
                      .Include(x => x.ModelNo)
                      .Include(x => x.ArticleNo)
                      .Include(x => x.ArtProcess)
                      .ThenInclude(x => x.Process)
                      .Select(x => new
                      {
                          ID = x.ID,
                          BPFCName = $"{x.ModelName.Name} - {x.ModelNo.Name} - {x.ArticleNo.Name} - {x.ArtProcess.Process.Name}"
                      }).ToListAsync();

            return model;
        }

        public async Task<BPFCEstablishDto> GetBPFCID(GetBPFCIDDto bpfcInfo)
        {
            var bpfc = await _repoBPFCEstablish
                        .FindAll()
                       .FirstOrDefaultAsync(x =>
                          x.ModelNameID == bpfcInfo.ModelNameID
                         && x.ModelNoID == bpfcInfo.ModelNoID
                         && x.ArticleNoID == bpfcInfo.ArticleNoID
                         && x.ArtProcessID == bpfcInfo.ArtProcessID
                        );
            return _mapper.Map<BPFCEstablish, BPFCEstablishDto>(bpfc);
        }
        public async Task<bool> UpdateSeason(BPFCEstablishUpdateSeason entity)
        {
            var item = await _repoBPFCEstablish.FindAll().FirstOrDefaultAsync(x => x.ID == entity.ID);
            item.Season = entity.Season;
            return await _repoBPFCEstablish.SaveAll();
        }

        public async Task<object> LoadBPFCHistory(int bpfcID)
        {
            var model = await _repoBPFCHistory.FindAll().Where(x => x.BPFCEstablishID == bpfcID).OrderByDescending(y => y.CreatedTime).ToListAsync();
            return model;
        }

        public async Task<bool> UpdateBPFCHistory(BPFCHistory entity)
        {
            var item = await _repoBPFCHistory.FindAll().FirstOrDefaultAsync(x => x.ID == entity.ID);
            item.Remark = entity.Remark;
            return await _repoBPFCHistory.SaveAll();
        }
    }
}