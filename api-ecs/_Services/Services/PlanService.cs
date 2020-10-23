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
using System.Dynamic;
using Newtonsoft.Json;
using System.Collections.Immutable;
using EC_API.SignalrHub;
using Microsoft.AspNetCore.SignalR;
using Google.Protobuf.WellKnownTypes;
using OfficeOpenXml;
using System.IO;
using OfficeOpenXml.Style;
using System.Drawing;

namespace EC_API._Services.Services
{
    public class PlanService : IPlanService
    {
        private readonly IPlanRepository _repoPlan;
        private readonly IPlanDetailRepository _repoPlanDetail;
        private readonly IGlueRepository _repoGlue;
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IIngredientRepository _repoIngredient;
        private readonly IIngredientInfoRepository _repoIngredientInfo;

        private readonly IBuildingRepository _repoBuilding;
        private readonly IBPFCEstablishRepository _repoBPFC;
        private readonly IMixingInfoRepository _repoMixingInfo;
        private readonly IBuildingGlueRepository _repoBuildingGlue;
        private readonly IModelNameRepository _repoModelName;
        private readonly IHubContext<ECHub> _hubContext;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PlanService(
            IPlanRepository repoPlan,
            IPlanDetailRepository repoPlanDetail,
            IGlueRepository repoGlue,
            IGlueIngredientRepository repoGlueIngredient,
            IIngredientRepository repoIngredient,
            IBuildingRepository repoBuilding,
            IBPFCEstablishRepository repoBPFC,
            IIngredientInfoRepository repoIngredientInfo,
            IMixingInfoRepository repoMixingInfo,
            IModelNameRepository repoModelName,
            IBuildingGlueRepository repoBuildingGlue,
            IHubContext<ECHub> hubContext,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoGlue = repoGlue;
            _repoGlueIngredient = repoGlueIngredient;
            _repoIngredient = repoIngredient;
            _repoIngredientInfo = repoIngredientInfo;
            _repoPlan = repoPlan;
            _repoPlanDetail = repoPlanDetail;
            _repoBuilding = repoBuilding;
            _repoModelName = repoModelName;
            _hubContext = hubContext;
            _repoBPFC = repoBPFC;
            _repoMixingInfo = repoMixingInfo;
            _repoBuildingGlue = repoBuildingGlue;
        }


        public async Task<object> GetBatchByIngredientID(int ingredientID)
        {
            try
            {
                var item = (await _repoIngredientInfo.FindAll().Where(x => x.IngredientID == ingredientID).ToListAsync()).Select(x => new BatchDto
                {
                    ID = x.ID,
                    BatchName = x.Batch
                }).DistinctBy(x => x.BatchName);

                return item;
            }
            catch
            {
                throw;
            }

        }


        public async Task<object> TroubleShootingSearch(string value, string batchValue)
        {
            try
            {
                var ingredientName = value.ToSafetyString();
                var from = DateTime.Now.Date.AddDays(-3).Date;
                var to = DateTime.Now.Date.Date;
                var plans = _repoPlan.FindAll()
                    .Include(x => x.Building)
                    .Include(x => x.BPFCEstablish)
                        .ThenInclude(x => x.Glues)
                        .ThenInclude(x => x.GlueIngredients)
                        .ThenInclude(x => x.Ingredient)
                    .Include(x => x.BPFCEstablish)
                        .ThenInclude(x => x.ModelName)
                        .ThenInclude(x => x.ModelNos)
                        .ThenInclude(x => x.ArticleNos)
                        .ThenInclude(x => x.ArtProcesses)
                        .ThenInclude(x => x.Process)
                    .Where(x => x.DueDate.Date >= from && x.DueDate.Date <= to)
                    .Select(x => new
                    {
                        x.BPFCEstablish.Glues,
                        ModelName = x.BPFCEstablish.ModelName.Name,
                        ModelNo = x.BPFCEstablish.ModelNo.Name,
                        ArticleNo = x.BPFCEstablish.ArticleNo.Name,
                        Process = x.BPFCEstablish.ArtProcess.Process.Name,
                        Line = x.Building.Name,
                        LineID = x.Building.ID,
                        x.DueDate
                    });
                var troubleshootings = new List<TroubleshootingDto>();

                foreach (var plan in plans)
                {
                    // lap nhung bpfc chua ingredient search
                    foreach (var glue in plan.Glues.Where(x => x.isShow == true))
                    {
                        foreach (var item in glue.GlueIngredients.Where(x => x.Ingredient.Name.Trim().Contains(ingredientName)))
                        {
                            var buildingGlue = await _repoBuildingGlue.FindAll().Where(x => x.BuildingID == plan.LineID && x.CreatedDate.Date == plan.DueDate.Date).OrderByDescending(x => x.CreatedDate).FirstOrDefaultAsync();
                            var mixingID = 0;
                            if (buildingGlue != null)
                            {
                                mixingID = buildingGlue.MixingInfoID;
                            }
                            var mixingInfo = _repoMixingInfo.FindById(mixingID);
                            var batch = "";
                            var mixDate = new DateTime();
                            if (mixingInfo != null)
                            {
                                switch (item.Position)
                                {
                                    case "A":
                                        batch = mixingInfo.BatchA;
                                        break;
                                    case "B":
                                        batch = mixingInfo.BatchB;
                                        break;
                                    case "C":
                                        batch = mixingInfo.BatchC;
                                        break;
                                    case "D":
                                        batch = mixingInfo.BatchD;
                                        break;
                                    case "E":
                                        batch = mixingInfo.BatchE;
                                        break;
                                    default:
                                        break;
                                }
                                mixDate = mixingInfo.CreatedTime;
                            }
                            var detail = new TroubleshootingDto
                            {
                                Ingredient = item.Ingredient.Name,
                                GlueName = item.Glue.Name,
                                ModelName = plan.ModelName,
                                ModelNo = plan.ModelNo,
                                ArticleNo = plan.ArticleNo,
                                Process = plan.Process,
                                Line = plan.Line,
                                DueDate = plan.DueDate.Date,
                                Batch = batch,
                                MixDate = mixDate
                            };
                            troubleshootings.Add(detail);
                        }
                    }
                }
                return troubleshootings.Where(x => x.Batch.Equals(batchValue)).OrderByDescending(x => x.MixDate).DistinctBy(x => x.Line).ToList();
            }
            catch
            {
                return new List<TroubleshootingDto>();
            }
        }

        public async Task<bool> Add(PlanDto model)
        {
            var checkExist = await _repoPlan.FindAll().AnyAsync(x => x.BuildingID == model.BuildingID && x.BPFCEstablishID == model.BPFCEstablishID && x.DueDate.Date == model.DueDate.Date);
            if (!checkExist)
            {
                var plan = _mapper.Map<Plan>(model);
                plan.CreatedDate = DateTime.Now;
                plan.BPFCEstablishID = model.BPFCEstablishID;
                _repoPlan.Add(plan);
                var result = await _repoPlan.SaveAll();
                await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
                return result;
            }
            else
            {
                return false;
            }
        }
        //Lấy danh sách Plan và phân trang
        public async Task<PagedList<PlanDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoPlan.FindAll().ProjectTo<PlanDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<PlanDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //Tìm kiếm Plan
        public Task<PagedList<PlanDto>> Search(PaginationParams param, object text)
        {
            throw new System.NotImplementedException();

        }
        //Xóa Plan
        public async Task<bool> Delete(object id)
        {
            var Plan = _repoPlan.FindById(id);
            _repoPlan.Remove(Plan);
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
            return await _repoPlan.SaveAll();
        }

        //Cập nhật Plan
        public async Task<bool> Update(PlanDto model)
        {
            var plan = _mapper.Map<Plan>(model);
            plan.CreatedDate = DateTime.Now;
            _repoPlan.Update(plan);
            var result = await _repoPlan.SaveAll();
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
            return result;
        }

        //Lấy toàn bộ danh sách Plan 
        public async Task<List<PlanDto>> GetAllAsync()
        {
            var min = DateTime.Now.Date;
            var max = DateTime.Now.AddDays(15).Date;
            var r = await _repoPlan.FindAll()
                .Include(x => x.Building)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.Glues)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelName)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArticleNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArtProcess)
                .ThenInclude(x => x.Process)
                .ProjectTo<PlanDto>(_configMapper)
                .OrderByDescending(x => x.ID)
                .ToListAsync();
            return r;
        }
        public async Task<List<GlueCreateDto1>> GetGlueByBuilding(int buildingID)
        {
            var item = _repoBuilding.FindById(buildingID);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).Select(x => x.ID).ToListAsync();
            List<int> modelNameID = _repoPlan.FindAll().Where(x => lineList.Contains(x.BuildingID)).Select(x => x.BPFCEstablishID).ToList();
            var lists = await _repoGlue.FindAll().Where(x => x.isShow == true).Where(x => x.isShow == true).ProjectTo<GlueCreateDto1>(_configMapper).Where(x => modelNameID.Contains(x.BPFCEstablishID)).OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
            {
                ID = x.ID,
                Name = x.Name,
                GlueID = x.GlueID,
                Code = x.Code,
                ModelNo = x.ModelNo,
                CreatedDate = x.CreatedDate,
                BPFCEstablishID = x.BPFCEstablishID,
                PathName = x.PathName,
                PartNameID = x.PartNameID,
                MaterialNameID = x.MaterialNameID,
                MaterialName = x.MaterialName,
                Consumption = x.Consumption,
                Chemical = new GlueDto1 { ID = x.GlueID, Name = x.Name }
            }).ToListAsync();
            return lists.DistinctBy(x => x.Name).ToList();
        }
        public async Task<List<GlueCreateDto1>> GetGlueByBuildingModelName(int buildingID, int bpfc)
        {
            var item = _repoBuilding.FindById(buildingID);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).Select(x => x.ID).ToListAsync();
            List<int> modelNameID = _repoPlan.FindAll().Where(x => lineList.Contains(x.BuildingID)).Select(x => x.BPFCEstablishID).ToList();
            var lists = await _repoGlue.FindAll().Where(x => x.isShow == true).ProjectTo<GlueCreateDto1>(_configMapper).Where(x => x.BPFCEstablishID == bpfc).OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
            {
                ID = x.ID,
                Name = x.Name,
                GlueID = x.GlueID,
                Code = x.Code,
                ModelNo = x.ModelNo,
                CreatedDate = x.CreatedDate,
                BPFCEstablishID = x.BPFCEstablishID,
                PathName = x.PathName,
                PartNameID = x.PartNameID,
                MaterialNameID = x.MaterialNameID,
                MaterialName = x.MaterialName,
                Consumption = x.Consumption,
                Chemical = new GlueDto1 { ID = x.GlueID, Name = x.Name }
            }).ToListAsync();
            return lists.DistinctBy(x => x.Name).ToList();
        }
        //Lấy Plan theo Plan_Id
        public PlanDto GetById(object id)
        {
            return _mapper.Map<Plan, PlanDto>(_repoPlan.FindById(id));
        }

        public async Task<object> GetLines(int buildingID)
        {
            var item = _repoBuilding.FindById(buildingID);
            if (item.Level == 4)
            {
                var lineList = _repoBuilding.FindAll().Where(x => x.ParentID == item.ID);
                return await lineList.ProjectTo<BuildingDto>(_configMapper).ToListAsync();

            }
            else
            {
                var lineList = _repoBuilding.FindAll().Where(x => x.Level == 5);
                return await lineList.ProjectTo<BuildingDto>(_configMapper).ToListAsync();
            }

        }

        private async Task<object> Summary3(int building)
        {

            var currentDate = DateTime.Now.Date;
            var item = _repoBuilding.FindById(building);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).ToListAsync();
            var plans = _repoPlan.FindAll()
            .Include(x => x.BPFCEstablish)
            .ThenInclude(x => x.ModelName)
            .Where(x => x.DueDate.Date == currentDate).ToList();
            // Header
            var header = new List<HeaderForSummary> {
                  new HeaderForSummary
                {
                    field = "Supplier",
                },
                new HeaderForSummary
                {
                    field = "Chemical"
                }
            };
            var modelNameList = new List<string>();
            foreach (var line in lineList)
            {
                var itemHeader = new HeaderForSummary
                {
                    field = line.Name
                };
                var plan = plans.Where(x => x.BuildingID == line.ID).OrderByDescending(x => x.CreatedDate).FirstOrDefault();
                if (plan != null)
                {
                    modelNameList.Add(plan.BPFCEstablish.ModelName.Name);
                }
                else
                {
                    modelNameList.Add(string.Empty);
                }
                header.Add(itemHeader);
            }
            // end header

            // Data
            var model = (from glue in _repoGlue.FindAll().ToList()
                         join bpfc in _repoBPFC.FindAll().Include(x => x.ModelName).ToList() on glue.BPFCEstablishID equals bpfc.ID
                         join plan in plans on bpfc.ID equals plan.BPFCEstablishID
                         join bui in lineList on plan.BuildingID equals bui.ID
                         select new SummaryDto
                         {
                             GlueID = glue.ID,
                             BuildingID = bui.ID,
                             GlueName = glue.Name,
                             BuildingName = bui.Name,
                             Comsumption = glue.Consumption,
                             ModelNameID = bpfc.ModelNameID,
                             WorkingHour = plan.WorkingHour,
                             HourlyOutput = plan.HourlyOutput
                         }).ToList();
            var data2 = new List<object>();
            var data = new List<object>();
            var plannings = _repoPlan.FindAll().Where(x => x.DueDate.Date == currentDate && lineList.Select(x => x.ID).Contains(x.BuildingID)).Select(p => p.BPFCEstablishID);
            var glueList = _repoGlue.FindAll()
                .Where(x => x.isShow == true)
                .Include(x => x.GlueIngredients)
                    .ThenInclude(x => x.Ingredient)
                    .ThenInclude(x => x.Supplier)
                .Include(x => x.BPFCEstablish)
                    .ThenInclude(x => x.ModelName)
                .Include(x => x.BPFCEstablish)
                    .ThenInclude(x => x.Plans)
                    .ThenInclude(x => x.Building)
                .Include(x => x.MixingInfos)
                .Where(x => plannings.Contains(x.BPFCEstablishID))
                .Select(x => new
                {
                    GlueIngredients = x.GlueIngredients.Select(a => new { a.GlueID, a.Ingredient, a.Position }),
                    x.Name,
                    x.ID,
                    x.BPFCEstablishID,
                    x.BPFCEstablish.Plans,
                    x.Consumption,
                    MixingInfos = x.MixingInfos.Select(a => new { a.GlueName, a.CreatedTime, a.ChemicalA, a.ChemicalB, a.ChemicalC, a.ChemicalD, a.ChemicalE, })
                });
            var glueDistinct = glueList.DistinctBy(x => x.Name);
            var rowParents = new List<RowParentDto>();
            foreach (var glue in glueDistinct)
            {

                var itemData = new ItemData<string, object>();
                var supplier = glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")) == null ? "#N/A" : glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")).Ingredient.Supplier.Name;
                var glueInfo = new GlueInfo { GlueName = glue.Name, BPFC = "" };
                itemData.Add("Supplier", supplier);
                itemData.Add("Chemical", glueInfo);
                var listTotal = new List<double>();
                var listStandardTotal = new List<double>();
                var listWorkingHour = new List<double>();
                var listHourlyOuput = new List<double>();
                var rowRealInfo = new List<object>();
                var rowCountInfo = new List<object>();
                var delivered = await _repoBuildingGlue.FindAll()
                                        .Where(x => x.GlueName.Equals(glue.Name) && lineList.Select(a => a.ID).Contains(x.BuildingID) && x.CreatedDate.Date == currentDate)
                                        .OrderBy(x => x.CreatedDate)
                                        .Select(x => new DeliveredInfo
                                        {
                                            ID = x.ID,
                                            Qty = x.Qty,
                                            GlueName = x.GlueName,
                                            CreatedDate = x.CreatedDate,
                                            LineID = x.BuildingID
                                        })
                                        .ToListAsync();
                var deliver = delivered.Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble).Sum();
                var mixingInfos = await _repoMixingInfo.FindAll().Where(x => x.GlueName.Equals(glue.Name) && x.CreatedTime.Date == currentDate).ToListAsync();
                double realTotal = 0;
                foreach (var real in mixingInfos)
                {
                    realTotal += real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
                }
                foreach (var line in lineList.OrderBy(x => x.Name))
                {

                    var sdtCon = model.FirstOrDefault(x => x.GlueName.Equals(glue.Name) && x.BuildingID == line.ID);
                    var listBuildingGlue = delivered.Where(x => x.GlueName.Equals(glue.Name) && x.LineID == line.ID && x.CreatedDate.Date == currentDate).OrderByDescending(x => x.CreatedDate).ToList();
                    double real = 0;
                    if (listBuildingGlue.FirstOrDefault() != null)
                    {
                        real = listBuildingGlue.FirstOrDefault().Qty.ToDouble();
                    }
                    double comsumption = 0;
                    if (sdtCon != null)
                    {
                        comsumption = glue.Consumption.ToDouble() * sdtCon.WorkingHour.ToDouble() * sdtCon.HourlyOutput.ToDouble();
                        itemData.Add(line.Name, Math.Round(comsumption / 1000, 3) + "kg");
                        listTotal.Add(glue.Consumption.ToDouble());
                        listWorkingHour.Add(sdtCon.WorkingHour.ToDouble());
                        listHourlyOuput.Add(sdtCon.HourlyOutput.ToDouble());
                        listStandardTotal.Add(comsumption / 1000);
                    }
                    else
                    {
                        itemData.Add(line.Name, 0);
                    }

                    rowCountInfo.Add(new SummaryInfo
                    {
                        GlueName = glue.Name,
                        line = line.Name,
                        lineID = line.ID,
                        glueID = glue.ID,
                        value = Math.Round(real, 3),
                        count = listBuildingGlue.Count,
                        maxReal = realTotal,
                        delivered = Math.Round(deliver, 3),
                        deliveredInfos = listBuildingGlue,
                        consumption = comsumption / 1000
                    });
                    rowRealInfo.Add(new SummaryInfo
                    {
                        GlueName = glue.Name,
                        line = line.Name,
                        lineID = line.ID,
                        glueID = glue.ID,
                        value = Math.Round(real, 3),
                        count = listBuildingGlue.Count,
                        maxReal = realTotal,
                        delivered = Math.Round(deliver, 3),
                        consumption = comsumption / 1000
                    });

                }
                itemData.Add("Real", $"{Math.Round(deliver, 3)}kg / {Math.Round(realTotal, 3)}kg");
                itemData.Add("Count", glue.MixingInfos.Where(x => x.CreatedTime.Date == currentDate).Count());
                itemData.Add("rowRealInfo", rowRealInfo);
                itemData.Add("rowCountInfo", rowCountInfo);
                data.Add(itemData);

            }
            var infoList = new List<HeaderForSummary>() {
                  new HeaderForSummary
                {
                    field = "Real"
                },
                new HeaderForSummary
                {
                    field = "Count"
                }};

            header.AddRange(infoList);
            // End Data
            return new { header, data, modelNameList };

        }
        public async Task<object> Summary(int building)
        {
            try
            {

                var currentDate = new DateTime(2020, 10, 22).Date;
                //var currentDate = DateTime.Now.Date;
                var lines = _repoBuilding.FindAll(x => x.ParentID == building).Select(x => x.ID);

                var plans = _repoPlan.FindAll()
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelName)
                 .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.Glues)
                .ThenInclude(x => x.GlueIngredients)
                .ThenInclude(x => x.Ingredient)
                .ThenInclude(x => x.Supplier)
                .Include(x => x.Building)
                .Where(x => lines.Contains(x.BuildingID) && x.DueDate.Date == currentDate).Select(x => new
                {
                    x.BPFCEstablishID,
                    x.BPFCEstablish,
                    LineID = x.Building.ID,
                    LineName = x.Building.Name,
                    x.WorkingHour,
                    x.HourlyOutput,
                    x.BPFCEstablish.Glues
                });
                // Header
                var header = new List<HeaderForSummary> {
                  new HeaderForSummary
                {
                    field = "Supplier",
                    HasRowspan = true,
                    RowspanValue = 0
                },
                new HeaderForSummary
                {
                    field = "Chemical",
                    HasRowspan = true,
                    RowspanValue = 0
                }
            };
                var modelNameHeader = new List<HeaderForSummary>();
                // Data

                var planHeaders = plans.Select(x => new
                {
                    ModelName = x.BPFCEstablish.ModelName.Name,
                    x.BPFCEstablishID,
                    LineName = x.LineName,
                    LineID = x.LineID,
                    x.WorkingHour,
                    x.HourlyOutput,
                    x.Glues,

                }).OrderBy(x => x.LineName).DistinctBy(x => new { x.LineName, x.ModelName });

                var rowParents = new List<RowParentDto>();
                var glueDistinct = planHeaders.SelectMany(x => x.Glues).ToList().Where(x => x.isShow).DistinctBy(x => x.Name);
                foreach (var plan in planHeaders)
                {
                    header.Add(new HeaderForSummary
                    {
                        field = plan.LineName,
                        ColspanValue = planHeaders.Where(x => x.LineID == plan.LineID).Count(),
                        HasColspan = true

                    });
                    modelNameHeader.Add(new HeaderForSummary
                    {
                        field = plan.ModelName,
                    });
                }
                foreach (var glue in glueDistinct)
                {
                    var rowParent = new RowParentDto();
                    var rowChild1 = new RowChildDto();
                    var rowChild2 = new RowChildDto();
                    var cellInfos = new List<CellInfoDto>();

                    var itemData = new ItemData<string, object>();
                    var supplier = glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")) == null ? "#N/A" : glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")).Ingredient.Supplier.Name;
                    // Static Left
                    rowChild1.Supplier = new CellInfoDto() { Supplier = supplier };
                    rowChild1.GlueName = new CellInfoDto() { GlueName = glue.Name };
                    rowChild1.GlueID = glue.ID;

                    rowChild2.Supplier = new CellInfoDto() { Supplier = supplier };
                    rowChild2.GlueName = new CellInfoDto() { GlueName = glue.Name };
                    rowChild2.GlueID = glue.ID;
                    // End Static Left
                    var listTotal = new List<double>();
                    var listStandardTotal = new List<double>();
                    var listWorkingHour = new List<double>();
                    var listHourlyOuput = new List<double>();


                    var mixingInfos = _repoMixingInfo.FindAll()
                        .Where(x => x.GlueName.Equals(glue.Name) && x.BuildingID == building && x.CreatedTime.Date == currentDate);

                    var delivered = _repoBuildingGlue.FindAll()
                                        .Where(x => x.GlueName.Equals(glue.Name) && x.CreatedDate.Date == currentDate)
                                        .OrderBy(x => x.CreatedDate)
                                        .Select(x => new DeliveredInfo
                                        {
                                            ID = x.ID,
                                            Qty = x.Qty,
                                            GlueName = x.GlueName,
                                            CreatedDate = x.CreatedDate,
                                            LineID = x.BuildingID
                                        });
                    double realTotal = 0;
                    double deliver = 0;
                    foreach (var plan in planHeaders)
                    {
                        realTotal = 0;
                        deliver = 0;
                        foreach (var mixingInfo in mixingInfos)
                        {
                            realTotal += mixingInfo.ChemicalA.ToDouble() + mixingInfo.ChemicalB.ToDouble() + mixingInfo.ChemicalC.ToDouble() + mixingInfo.ChemicalD.ToDouble() + mixingInfo.ChemicalE.ToDouble();
                        }

                        if (delivered.Count() > 0)
                        {
                            deliver = delivered.Where(x => x.LineID == plan.LineID).Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble).Sum();
                        }

                        var listBuildingGlue = delivered.Where(x => x.GlueName.Equals(glue.Name) && x.LineID == plan.LineID && x.CreatedDate.Date == currentDate).OrderByDescending(x => x.CreatedDate);
                        double real = 0;
                        var listBuildingGlueCount = listBuildingGlue.Count();
                        if (listBuildingGlueCount > 0)
                        {
                            real = listBuildingGlue.FirstOrDefault().Qty.ToDouble();
                        }
                        double comsumption = glue.Consumption.ToDouble() * plan.WorkingHour * plan.HourlyOutput;
                        itemData.Add(plan.LineName, Math.Round(comsumption / 1000, 3) + "kg");
                        listTotal.Add(glue.Consumption.ToDouble());
                        listWorkingHour.Add(plan.WorkingHour);
                        listHourlyOuput.Add(plan.HourlyOutput);
                        listStandardTotal.Add(comsumption / 1000);

                        double deliverdTotal = 0;
                        if (listBuildingGlueCount > 0)
                        {
                            deliverdTotal = listBuildingGlue.Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble).Sum();
                        }
                        var dynamicCellInfo = new CellInfoDto
                        {
                            GlueName = glue.Name,
                            line = plan.LineName,
                            lineID = plan.LineID,
                            value = real >= 1 && real < 10 ? Math.Round(real, 2) : real >= 10 ? Math.Round(real, 1) : Math.Round(real, 3),
                            count = listBuildingGlueCount,
                            maxReal = realTotal,
                            delivered = Math.Round(deliver, 3),
                            deliveredTotal = deliverdTotal >= 1 && deliverdTotal < 10 ? Math.Round(deliverdTotal, 2) : deliverdTotal >= 10 ? Math.Round(deliverdTotal, 1) : Math.Round(deliverdTotal, 3),
                            deliveredInfos = listBuildingGlue.Select(x => new DeliveredInfo
                            {
                                ID = x.ID,
                                LineID = x.LineID,
                                Qty = (x.Qty.ToDouble() >= 1 && x.Qty.ToDouble() < 10 ? Math.Round(x.Qty.ToDouble(), 2) : x.Qty.ToDouble() >= 10 ? Math.Round(x.Qty.ToDouble(), 1) : Math.Round(x.Qty.ToDouble(), 3)).ToSafetyString(),
                                GlueName = x.GlueName,
                                CreatedDate = x.CreatedDate
                            }).ToList(),
                            consumption = comsumption / 1000
                        };
                        cellInfos.Add(dynamicCellInfo);
                        rowChild1.CellsCenter = cellInfos;
                        rowChild2.CellsCenter = cellInfos;

                    }
                    // Static Right
                    var deliverTotal = delivered.Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble).Sum();
                    var actual = $"{Math.Round(deliverTotal, 3)}kg / {Math.Round(realTotal, 3)}kg";
                    var count = mixingInfos.Where(x => x.CreatedTime.Date == currentDate).Count();
                    rowChild1.Actual = new CellInfoDto() { real = actual };
                    rowChild1.Count = new CellInfoDto() { count = count };
                    rowChild2.Actual = new CellInfoDto() { real = actual };
                    rowChild2.Count = new CellInfoDto() { count = count };
                    // End Static Right
                    rowParent.Row1 = rowChild1;
                    rowParent.Row2 = rowChild2;
                    rowParents.Add(rowParent);
                }
                var infoList = new List<HeaderForSummary>() {
                  new HeaderForSummary
                {
                    field = "Real",
                    HasRowspan = true,
                    RowspanValue = 0
                },
                new HeaderForSummary
                {
                    field = "Count",
                    HasRowspan = true,
                    RowspanValue = 0
                }, new HeaderForSummary
                {
                    field = "Option",
                    HasRowspan = true,
                    RowspanValue = 0
                }
            };

                header.AddRange(infoList);
                // End Data
                return new { header = header.DistinctBy(x => x.field), rowParents, modelNameList = modelNameHeader };
            }
            catch (Exception ex)
            {
                return new { };

            }

        }
        public Task<object> GetAllPlansByDate(string from, string to)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<PlanDto>> GetGlueByBuildingBPFCID(int buildingID, int bpfcID)
        {
            var lists = await _repoGlue.FindAll().Where(x => x.isShow == true && x.BPFCEstablishID == bpfcID).ProjectTo<PlanDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
            return lists.ToList();
        }
        public async Task<object> DispatchGlue(BuildingGlueForCreateDto obj)
        {
            var buildingGlue = _mapper.Map<BuildingGlue>(obj);
            var building = _repoBuilding.FindById(obj.BuildingID);
            var lastMixingInfo = await _repoMixingInfo.FindAll().Where(x => x.GlueName.Contains(obj.GlueName) && x.BuildingID == building.ParentID).OrderByDescending(x => x.CreatedTime).FirstOrDefaultAsync();
            buildingGlue.MixingInfoID = lastMixingInfo == null ? 0 : lastMixingInfo.ID;
            _repoBuildingGlue.Add(buildingGlue);
            return await _repoBuildingGlue.SaveAll();
        }
        public async Task<object> ClonePlan(List<PlanForCloneDto> plansDto)
        {
            var plans = _mapper.Map<List<Plan>>(plansDto);
            var flag = false;
            try
            {
                foreach (var item in plans)
                {
                    var checkExist = await _repoPlan.FindAll().AnyAsync(x => x.BuildingID == item.BuildingID && x.BPFCEstablishID == item.BPFCEstablishID && x.DueDate.Date == item.DueDate.Date);
                    if (!checkExist)
                    {
                        _repoPlan.Add(item);
                        flag = await _repoBuildingGlue.SaveAll();
                    }
                }
                return flag;
            }
            catch
            {
                return flag;
            }

        }
        public async Task<object> DeleteRange(List<int> plansDto)
        {
            var plans = await _repoPlan.FindAll().Where(x => plansDto.Contains(x.ID)).ToListAsync();
            _repoPlan.RemoveMultiple(plans);
            return await _repoBuildingGlue.SaveAll();

        }
        public async Task<object> GetAllPlanByDefaultRange()
        {
            var min = DateTime.Now.Date;
            var max = DateTime.Now.AddDays(15).Date;
            return await _repoPlan.FindAll()
                .Where(x => x.DueDate.Date >= min && x.DueDate <= max)
                .Include(x => x.Building)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.Glues.Where(x => x.isShow == true))
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelName)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArticleNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArtProcess)
                .ThenInclude(x => x.Process)
                .ProjectTo<PlanDto>(_configMapper)
                .OrderByDescending(x => x.ID)
                .ToListAsync();
        }

        public async Task<object> GetAllPlanByRange(DateTime min, DateTime max)
        {

            return await _repoPlan.FindAll()
                .Where(x => x.DueDate.Date >= min.Date && x.DueDate.Date <= max.Date)
                .Include(x => x.Building)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelName)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArticleNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ArtProcess)
                .ThenInclude(x => x.Process)
                .ProjectTo<PlanDto>(_configMapper)
                .OrderByDescending(x => x.ID)
                .ToListAsync();
        }

        public async Task<object> GetBPFCByGlue(TooltipParams tooltip)
        {
            var name = tooltip.Glue.Trim().ToSafetyString();
            var results = new List<string>();
            var plans = await _repoPlan.FindAll()
                 .Include(x => x.BPFCEstablish)
                     .ThenInclude(x => x.ModelName)
                     .ThenInclude(x => x.ModelNos)
                     .ThenInclude(x => x.ArticleNos)
                     .ThenInclude(x => x.ArtProcesses)
                     .ThenInclude(x => x.Process)
                 .Include(x => x.BPFCEstablish)
                     .ThenInclude(x => x.Glues)
                 .Where(x => x.DueDate.Date == DateTime.Now.Date).ToListAsync();
            foreach (var plan in plans)
            {
                foreach (var glue in plan.BPFCEstablish.Glues.Where(x => x.isShow == true && x.Name.Trim().Equals(name)))
                {
                    var bpfc = $"{plan.BPFCEstablish.ModelName.Name} -> {plan.BPFCEstablish.ModelNo.Name} -> {plan.BPFCEstablish.ArticleNo.Name} -> {plan.BPFCEstablish.ArtProcess.Process.Name}";
                    results.Add(bpfc);
                }
            }
            return results.Distinct();
        }

        public async Task<bool> EditDelivered(int id, string qty)
        {
            try
            {
                var item = _repoBuildingGlue.FindById(id);
                item.Qty = qty.ToDouble().ToSafetyString();
                return await _repoBuildingGlue.SaveAll();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteDelivered(int id)
        {
            try
            {
                var item = _repoBuildingGlue.FindById(id);
                _repoBuildingGlue.Remove(item);
                return await _repoBuildingGlue.SaveAll();
            }
            catch
            {
                return false;
            }
        }

        public async Task<byte[]> Report(DateTime startDate, DateTime endDate)
        {
            var plans = _repoPlan.FindAll()
                .Where(x => x.DueDate.Date >= startDate.Date && x.DueDate.Date <= endDate.Date)
                .Include(x => x.Building)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelName)
                 .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.ModelNo)
                .Include(x => x.BPFCEstablish)
                .ThenInclude(x => x.Glues)
                .ThenInclude(x => x.GlueIngredients)
                .ThenInclude(x => x.Ingredient)
                .Select(x => new
                {
                    Glues = x.BPFCEstablish.Glues.Where(x => x.isShow),
                    GlueIngredients = x.BPFCEstablish.Glues.Where(x => x.isShow).SelectMany(x => x.GlueIngredients),
                    ModelName = x.BPFCEstablish.ModelName.Name,
                    ModelNo = x.BPFCEstablish.ModelNo.Name,
                    x.Quantity,
                    Line = x.Building.Name,
                    x.DueDate,
                })
                .AsQueryable();
            var buildingGlues = _repoBuildingGlue.FindAll().Where(x => x.CreatedDate.Date >= startDate.Date && x.CreatedDate.Date <= endDate.Date);

            var ingredients = plans.SelectMany(x => x.GlueIngredients).Select(x => new IngredientReportDto
            {
                CBD = x.Ingredient.CBD,
                Real = x.Ingredient.Real,
                Name = x.Ingredient.Name,
                ID = x.IngredientID,
                Position = x.Position
            }).DistinctBy(x => x.Name);

            var ingredientsHeader = ingredients.Select(x => x.Name).ToList();

            var headers = new ReportHeaderDto();
            headers.Ingredients = ingredientsHeader;
            var bodyList = new List<ReportBodyDto>();

            foreach (var plan in plans)
            {
                var body = new ReportBodyDto
                {
                    Day = plan.DueDate.Day,
                    CBD = 0,
                    Real = 0,
                    ModelName = plan.ModelName,
                    ModelNo = plan.ModelNo,
                    Quantity = plan.Quantity,
                    Line = plan.Line,
                    Date = plan.DueDate.Date,
                };

                foreach (var glue in plan.Glues)
                {
                    var ingredientsBody = new List<double>();
                    foreach (var ingredient in ingredients)
                    {
                        var buildingGlue = buildingGlues.Where(x => x.GlueName.Equals(glue.Name) && x.CreatedDate.Date == plan.DueDate.Date)
                            .Select(x => x.Qty);
                        double value = 0;
                        var quantity = buildingGlue.ToList().ConvertAll<double>(Convert.ToDouble).Sum();
                        if (glue.Name.Contains(ingredient.Name))
                        {
                            var glueIngredients = glue.GlueIngredients.DistinctBy(x => x.Position).ToList();
                            value = CalculateIngredientByPositon(glueIngredients, ingredient, quantity);
                            ingredientsBody.Add(value);
                        }
                        else
                        {
                            ingredientsBody.Add(value);
                        }

                    }
                    body.Ingredients = ingredientsBody;
                }
                bodyList.Add(body);
            }

            return ExportExcel(headers, bodyList, ingredients.ToList());
        }
        private Byte[] ExportExcel(ReportHeaderDto header, List<ReportBodyDto> bodyList, List<IngredientReportDto> ingredients)
        {
            try
            {
                ExcelPackage.LicenseContext = LicenseContext.Commercial;
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
                var memoryStream = new MemoryStream();
                using (ExcelPackage p = new ExcelPackage(memoryStream))
                {
                    // đặt tên người tạo file
                    p.Workbook.Properties.Author = "Henry Pham";

                    // đặt tiêu đề cho file
                    p.Workbook.Properties.Title = "Report";
                    //Tạo một sheet để làm việc trên đó
                    p.Workbook.Worksheets.Add("Report");

                    // lấy sheet vừa add ra để thao tác
                    ExcelWorksheet ws = p.Workbook.Worksheets["Report"];

                    // đặt tên cho sheet
                    ws.Name = "Report";
                    // fontsize mặc định cho cả sheet
                    ws.Cells.Style.Font.Size = 11;
                    // font family mặc định cho cả sheet
                    ws.Cells.Style.Font.Name = "Calibri";

                    

                    int ingredientRealRowIndex = 1;
                    int ingredientCBDRowIndex = 2;

                    int ingredientCBDColIndex = 8;
                    int ingredientRealColIndex = 8;

                    ws.Cells[ingredientRealRowIndex, ingredientRealColIndex++].Value = "Real";
                    ws.Cells[ingredientCBDRowIndex, ingredientCBDColIndex++].Value = "CBD";

                    foreach (var ingredient in ingredients)
                    {
                        int cbdColumn = ingredientCBDColIndex++;
                        int realColumn = ingredientRealColIndex++;
                        ws.Cells[ingredientCBDRowIndex, cbdColumn].Value = ingredient.CBD;
                        ws.Cells[ingredientRealRowIndex, realColumn].Value = ingredient.Real;

                        ws.Cells[ingredientCBDRowIndex, cbdColumn].Style.TextRotation = 90;
                        ws.Cells[ingredientRealRowIndex, realColumn].Style.TextRotation = 90;
                        ws.Cells[ingredientCBDRowIndex, cbdColumn].AutoFitColumns(3);
                        ws.Cells[ingredientRealRowIndex, realColumn].AutoFitColumns(3);

                    }

                    int headerRowIndex = 3;
                    int headerColIndex = 1;

                    int patternTypeColIndex = 1;
                    int backgroundColorColIndex = 1;

                    for (headerColIndex = 1; headerColIndex < 9; headerColIndex++)
                    {
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.Day;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.Date;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.ModelName;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.ModelNo;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.Quantity;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.Line;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.CBD;
                        ws.Cells[headerRowIndex, headerColIndex++].Value = header.Real;
                        // Style Header
                         ws.Cells[headerRowIndex, patternTypeColIndex++].Style.Fill.PatternType = ExcelFillStyle.Solid;
                         ws.Cells[headerRowIndex, patternTypeColIndex++].Style.Fill.PatternType = ExcelFillStyle.Solid;
                         ws.Cells[headerRowIndex, patternTypeColIndex++].Style.Fill.PatternType = ExcelFillStyle.Solid;
                         ws.Cells[headerRowIndex, patternTypeColIndex++].Style.Fill.PatternType = ExcelFillStyle.Solid;
                         ws.Cells[headerRowIndex, patternTypeColIndex++].Style.Fill.PatternType = ExcelFillStyle.Solid;

                        ws.Cells[headerRowIndex, backgroundColorColIndex++].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#4f81bd"));
                        ws.Cells[headerRowIndex, backgroundColorColIndex++].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#4f81bd"));
                        ws.Cells[headerRowIndex, backgroundColorColIndex++].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#4f81bd"));
                        ws.Cells[headerRowIndex, backgroundColorColIndex++].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#8db5e2"));
                        ws.Cells[headerRowIndex, backgroundColorColIndex++].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#9bbb59"));
                    }


                    // end Style
                    int ingredientColIndex =  9;
                    foreach (var ingredient in header.Ingredients)
                    {
                        int col = ingredientColIndex++;
                        ws.Cells[headerRowIndex, col].Value = ingredient;
                        ws.Cells[headerRowIndex, col].Style.Fill.PatternType = ExcelFillStyle.Solid;

                        ws.Cells[headerRowIndex, col].Style.TextRotation = 90;
                        ws.Cells[headerRowIndex, col].Style.Font.Color.SetColor(Color.White);
                        ws.Cells[headerRowIndex, col].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#808080"));

                    }
                    int colIndex = 1;
                    int rowIndex = 3;
                    // với mỗi item trong danh sách sẽ ghi trên 1 dòng
                    foreach (var body in bodyList)
                    {
                        // bắt đầu ghi từ cột 1. Excel bắt đầu từ 1 không phải từ 0 #c0514d
                        colIndex = 1;

                        // rowIndex tương ứng từng dòng dữ liệu
                        rowIndex++;

                       
                        //gán giá trị cho từng cell                      
                        ws.Cells[rowIndex, colIndex++].Value = body.Day;
                        ws.Cells[rowIndex, colIndex++].Value = body.Date.ToString("M/d");
                        ws.Cells[rowIndex, colIndex++].Value = body.ModelName;
                        ws.Cells[rowIndex, colIndex++].Value = body.ModelNo; ;
                        ws.Cells[rowIndex, colIndex++].Value = body.Quantity;
                        ws.Cells[rowIndex, colIndex++].Value = body.Line;

                        double cbdTotal = ingredients.Select(x => x.CBD).Sum();
                        double realTotal = ingredients.Select(x => x.Real).Sum();
                        double CBD = Math.Round(cbdTotal / body.Quantity, 3);
                        double real = Math.Round(realTotal / body.Quantity, 3);
                        ws.Cells[rowIndex, colIndex++].Value = CBD.ToString() == "NaN" ? "0" : CBD.ToString();
                        ws.Cells[rowIndex, colIndex++].Value = real.ToString() == "NaN" ? "0" : real.ToString();

                        foreach (var ingredient in body.Ingredients)
                        {
                            int col = colIndex++;
                            ws.Cells[rowIndex, col].Value = ingredient > 0 ? Math.Round(ingredient, 1).ToString() : string.Empty;
                            ws.Cells[rowIndex, col].Style.Font.Size = 8;
                            ws.Cells[rowIndex, col].Style.Font.Color.SetColor(Color.DarkRed);
                            ws.Cells[rowIndex, col].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                        }

                    }
                    int mergeFromColIndex = 1;
                    int mergeFromRowIndex = 4;
                    foreach (var item in bodyList.GroupBy(x => x.Day))
                    {
                        int mergeToRowIndex = item.Count() + (mergeFromRowIndex - 1);

                        ws.Cells[mergeFromRowIndex, 2, mergeFromRowIndex, 8].Style.Fill.PatternType = ExcelFillStyle.Solid;
                        ws.Cells[mergeFromRowIndex, 2, mergeFromRowIndex, 8].Style.Fill.BackgroundColor.SetColor(ColorTranslator.FromHtml("#c0514d"));

                        ws.Cells[mergeFromRowIndex, mergeFromColIndex, mergeToRowIndex, mergeFromColIndex].Merge = true;
                        ws.Cells[mergeFromRowIndex, mergeFromColIndex, mergeToRowIndex, mergeFromColIndex].Style.Font.Size = 36;
                        ws.Cells[mergeFromRowIndex, mergeFromColIndex, mergeToRowIndex, mergeFromColIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                        ws.Cells[mergeFromRowIndex, mergeFromColIndex, mergeToRowIndex, mergeFromColIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    }
                    //Make all text fit the cells
                    //ws.Cells[ws.Dimension.Address].AutoFitColumns();
                    ws.Cells[ws.Dimension.Address].Style.Font.Bold = true;

                    //make the borders of cell F6 thick
                    ws.Cells[ws.Dimension.Address].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    ws.Cells[ws.Dimension.Address].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                    ws.Cells[ws.Dimension.Address].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    ws.Cells[ws.Dimension.Address].Style.Border.Left.Style = ExcelBorderStyle.Thin;

                    int dayCol = 1, dateCol = 2, modelNameCol = 3, modelNoCol = 4, qtyCol = 5, lineCol = 6, cbdCol = 7, realCol = 8;
                    ws.Column(dayCol).AutoFit(12);
                    ws.Column(dateCol).AutoFit(12);
                    ws.Column(modelNameCol).AutoFit(30);
                    ws.Column(modelNoCol).AutoFit(12);
                    ws.Column(qtyCol).AutoFit(8);
                    ws.Column(lineCol).AutoFit(8);
                    ws.Column(cbdCol).AutoFit(8);
                    ws.Column(realCol).AutoFit(10);

                    ws.Column(8).Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Column(8).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                    ws.Column(dayCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(dateCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(modelNoCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(qtyCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(lineCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(cbdCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    ws.Column(realCol).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;


                    ws.Row(1).Height = 40;
                    ws.Row(2).Height = 40;
                    ws.Column(8).AutoFit(10);

                    ws.Cells[1, 1, 2, 7].Merge = true;
                    ws.Cells[3, 1, 3, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    ws.Cells[3, 1, 3, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                    //Lưu file lại
                    Byte[] bin = p.GetAsByteArray();
                    return bin;
                }
            }
            catch (Exception ex)
            {
                var mes = ex.Message;
                Console.Write(mes);
                return new Byte[] { };
            }
        }
        private double CalculateIngredientByPositon(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var count = glueIngredients.Count;
            switch (count)
            {
                case 1: return CalculateA(glueIngredients, ingredient, quantity);
                case 2: return CalculateAB(glueIngredients, ingredient, quantity);
                case 3: return CalculateABC(glueIngredients, ingredient, quantity);
                case 4: return CalculateABCD(glueIngredients, ingredient, quantity);
                case 5: return CalculateABCDE(glueIngredients, ingredient, quantity);
                default:
                    return 0;
            }
        }
        private double CalculateA(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var valueA = quantity;
            return valueA;

        }
        private double CalculateAB(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var glueIngredient = glueIngredients.FirstOrDefault(x => x.IngredientID == ingredient.ID);
            var position = glueIngredient.Position;
            var percentageB = 1 + (glueIngredient.Percentage / 100);
            var valueA = quantity - (quantity / percentageB);
            var valueB = quantity - valueA;
            switch (position)
            {
                case "A":
                    return valueA;
                case "B": return valueB;
                default:
                    return 0;
            }
        }
        private int FindPercentageByPosition(List<GlueIngredient> glueIngredients, string position)
        {
            var glueIngredient = glueIngredients.FirstOrDefault(x => x.Position == position);

            return glueIngredient == null ? 0 : glueIngredient.Percentage;
        }
        private double CalculateABC(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var glueIngredient = glueIngredients.FirstOrDefault(x => x.IngredientID == ingredient.ID);
            var position = glueIngredient.Position;
            var percentageB = 1 + FindPercentageByPosition(glueIngredients, "B");
            var percentageC = 1 + FindPercentageByPosition(glueIngredients, "C");

            var valueB = quantity - (quantity / percentageB);
            var valueC = quantity - valueB - (valueB / percentageB);

            var valueA = quantity - valueB - valueC;
            switch (position)
            {
                case "A": return valueA;
                case "B": return valueB;
                case "C": return valueC;
                default:
                    return 0;
            }

        }
        private double CalculateABCD(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var glueIngredient = glueIngredients.FirstOrDefault(x => x.IngredientID == ingredient.ID);
            var position = glueIngredient.Position;
            var percentageB = 1 + FindPercentageByPosition(glueIngredients, "B");
            var percentageC = 1 + FindPercentageByPosition(glueIngredients, "C");
            var percentageD = 1 + FindPercentageByPosition(glueIngredients, "D");
            var valueB = quantity - (quantity / percentageB);
            var valueC = quantity - valueB - (valueB / percentageB);
            var valueD = quantity - valueB - valueC - (valueC / percentageB);
            var valueA = quantity - valueB - valueC - valueD;
            switch (position)
            {

                case "A": return valueA;
                case "B": return valueB;
                case "C": return valueC;
                case "D": return valueD;
                default:
                    return 0;
            }

        }
        private double CalculateABCDE(List<GlueIngredient> glueIngredients, IngredientReportDto ingredient, double quantity)
        {
            var glueIngredient = glueIngredients.FirstOrDefault(x => x.IngredientID == ingredient.ID);
            var position = glueIngredient.Position;
            var percentageB = 1 + FindPercentageByPosition(glueIngredients, "B");
            var percentageC = 1 + FindPercentageByPosition(glueIngredients, "C");
            var percentageD = 1 + FindPercentageByPosition(glueIngredients, "D");
            var percentageE = 1 + FindPercentageByPosition(glueIngredients, "E");
            var valueB = quantity - (quantity / percentageB);
            var valueC = quantity - valueB - (valueB / percentageB);
            var valueD = quantity - valueB - valueC - (valueC / percentageB);
            var valueE = quantity - valueB - valueC - -valueD - (valueC / percentageB);
            var valueA = quantity - valueB - valueC - valueD - valueE;
            switch (position)
            {
                case "A": return valueA;
                case "B": return valueB;
                case "C": return valueC;
                case "D": return valueD;
                case "E": return valueE;
                default:
                    return 0;
            }

        }
        public async Task<bool> EditQuantity(int id, int qty)
        {
            try
            {
                var item = _repoBuildingGlue.FindById(id);
                item.Qty = qty.ToDouble().ToSafetyString();
                return await _repoBuildingGlue.SaveAll();
            }
            catch
            {
                return false;
            }
        }
    }
}