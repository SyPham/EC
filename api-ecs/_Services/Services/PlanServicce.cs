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

namespace EC_API._Services.Services
{
    public class PlanService : IPlanService
    {
        private readonly IPlanRepository _repoPlan;
        private readonly IPlanDetailRepository _repoPlanDetail;
        private readonly IGlueRepository _repoGlue;
        private readonly IGlueIngredientRepository _repoGlueIngredient;
        private readonly IIngredientRepository _repoIngredient;
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
            IBuildingRepository repoBuilding,
            IBPFCEstablishRepository repoBPFC,
            IMixingInfoRepository repoMixingInfo,
            IModelNameRepository repoModelName,
            IBuildingGlueRepository repoBuildingGlue,
            IHubContext<ECHub> hubContext,
            IIngredientRepository repoIngredient,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoGlue = repoGlue;
            _repoGlueIngredient = repoGlueIngredient;
            _repoPlan = repoPlan;
            _repoPlanDetail = repoPlanDetail;
            _repoBuilding = repoBuilding;
            _repoModelName = repoModelName;
            _hubContext = hubContext;
            _repoBPFC = repoBPFC;
            _repoMixingInfo = repoMixingInfo;
            _repoBuildingGlue = repoBuildingGlue;
            _repoIngredient = repoIngredient;
        }
        public async Task<object> TroubleShootingSearch(string value, string batchValue)
        {
            var from = DateTime.Now.Date.AddDays(-3).Date;
            var to = DateTime.Now.Date.Date;
            var infos = await _repoIngredient
                        .FindAll()
                        .Where(x => x.Name.Trim().ToLower().Contains(value.Trim().ToLower()))
                        .FirstOrDefaultAsync();
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
                .Where(x => x.DueDate.Date >= from && x.DueDate.Date <= to);
            var troubleshootings = new List<TroubleshootingDto>();
            
            foreach (var plan in plans)
            {
                // lap nhung bpfc chua ingredient search
                foreach (var glue in plan.BPFCEstablish.Glues)
                {
                    foreach (var item in glue.GlueIngredients.Where(x => x.Ingredient.Name.Contains(infos.Name)))
                    {
                      var buildingGlue =await _repoBuildingGlue.FindAll().Where(x=> x.BuildingID == plan.BuildingID && x.CreatedDate.Date == plan.DueDate.Date).FirstOrDefaultAsync();
                      var mixingID = 0;
                       if (buildingGlue != null){
                           mixingID = buildingGlue.MixingInfoID;
                       }
                        var mixingInfo =_repoMixingInfo.FindById(mixingID);
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
                            ModelName = glue.BPFCEstablish.ModelName.Name,
                            ModelNo = glue.BPFCEstablish.ModelNo.Name,
                            ArticleNo = glue.BPFCEstablish.ArticleNo.Name,
                            Process = glue.BPFCEstablish.ArtProcess.Process.Name,
                            Line = plan.Building.Name,
                            DueDate = plan.DueDate.Date,
                            Batch = batch,
                            MixDate = mixDate
                        };
                        troubleshootings.Add(detail);
                    }
                }
            }
            return troubleshootings.Where(x=> x.Batch.Equals(batchValue));
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
                var newPlan = await _repoPlan.FindAll()
                    .Include(x => x.BPFCEstablish)
                        .ThenInclude(x => x.Glues)
                        .ThenInclude(x => x.GlueIngredients)
                        .ThenInclude(x => x.Ingredient)
                        .ThenInclude(x => x.Supplier).FirstOrDefaultAsync(x => x.ID == plan.ID);
                var glue = newPlan.BPFCEstablish.Glues;
                var details = new List<PlanDetail>();
                foreach (var item in glue)
                {
                    var supplierName = "#N/A";
                    var ingredient = item.GlueIngredients.FirstOrDefault(x => x.Position.Equals('A'));
                    if (ingredient != null)
                        supplierName = ingredient.Ingredient.Supplier.Name;
                    var detail = new PlanDetail()
                    {
                        GlueName = item.Name,
                        Consumption = item.Consumption.ToDouble(),
                        Supplier = supplierName,
                        PlanID = plan.ID,
                        GlueID = item.ID,
                        BPFCName = plan.BPFCName
                    };
                    details.Add(detail);
                }
                _repoPlanDetail.AddRange(details);
                await _repoPlanDetail.SaveAll();
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
            var planItem = _repoPlan.FindAll().FirstOrDefault(x => x.ID == plan.ID);
            if (planItem.BPFCEstablishID != model.BPFCEstablishID)
            {
                var details = _repoPlanDetail.FindAll().Where(x => x.PlanID == plan.ID);
                _repoPlanDetail.Remove(details);
                await _repoPlanDetail.SaveAll();

                var glues = (await _repoPlan.FindAll()
                    .Include(x => x.BPFCEstablish)
                    .ThenInclude(x => x.Glues)
                    .ThenInclude(x => x.GlueIngredients)
                    .ThenInclude(x => x.Ingredient)
                    .ThenInclude(x => x.Supplier)
                    .FirstOrDefaultAsync(x => x.ID == plan.ID)).BPFCEstablish.Glues;

                foreach (var item in glues)
                {
                    var detailsAdd = new List<PlanDetail>();
                    foreach (var glue in item.GlueIngredients)
                    {
                        var supplierName = "#N/A";
                        var ingredient = item.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A"));
                        if (ingredient != null)
                            supplierName = ingredient.Ingredient.Supplier.Name;
                        var detail = new PlanDetail()
                        {
                            GlueName = item.Name,
                            GlueID = glue.ID,
                            Consumption = item.Consumption.ToDouble(),
                            Supplier = supplierName,
                            PlanID = item.ID,
                            BPFCName = plan.BPFCName

                        };
                        detailsAdd.Add(detail);
                    }
                    _repoPlanDetail.AddRange(detailsAdd);
                    await _repoPlanDetail.SaveAll();
                }
            }
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
            // foreach (var item in r)
            // {
            //     var newPlan = await _repoPlan.FindAll()
            //         .Include(x => x.BPFCEstablish)
            //             .ThenInclude(x => x.Glues)
            //             .ThenInclude(x => x.GlueIngredients)
            //             .ThenInclude(x => x.Ingredient)
            //             .ThenInclude(x => x.Supplier).FirstOrDefaultAsync(x => x.ID == item.ID);
            //     var details = new List<PlanDetail>();
            //     var glue = newPlan.BPFCEstablish.Glues;
            //     foreach (var item2 in glue)
            //     {
            //         var supplierName = "#N/A";
            //         var ingredient = item2.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A"));
            //         if (ingredient != null)
            //             supplierName = ingredient.Ingredient.Supplier.Name;
            //         var detail = new PlanDetail()
            //         {
            //             GlueName = item2.Name,
            //             GlueID = item2.ID,
            //             Consumption = item2.Consumption.ToDouble(),
            //             Supplier = supplierName,
            //             PlanID = item.ID,
            //             BPFCName = item.BPFCName

            //         };
            //         details.Add(detail);
            //     }
            //     _repoPlanDetail.AddRange(details);
            //     await _repoPlanDetail.SaveAll();
            // }
            return r;
        }
        public async Task<List<GlueCreateDto1>> GetGlueByBuilding(int buildingID)
        {
            var item = _repoBuilding.FindById(buildingID);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).Select(x => x.ID).ToListAsync();
            List<int> modelNameID = _repoPlan.FindAll().Where(x => lineList.Contains(x.BuildingID)).Select(x => x.BPFCEstablishID).ToList();
            var lists = await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x => modelNameID.Contains(x.BPFCEstablishID)).OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
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

            //return await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x=>x.ModalNameID == modelNameID).OrderByDescending(x => x.ID).ToListAsync();
        }
        public async Task<List<GlueCreateDto1>> GetGlueByBuildingModelName(int buildingID, int bpfc)
        {
            var item = _repoBuilding.FindById(buildingID);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).Select(x => x.ID).ToListAsync();
            List<int> modelNameID = _repoPlan.FindAll().Where(x => lineList.Contains(x.BuildingID)).Select(x => x.BPFCEstablishID).ToList();
            var lists = await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x => x.BPFCEstablishID == bpfc).OrderByDescending(x => x.ID).Select(x => new GlueCreateDto1
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

            //return await _repoGlue.FindAll().ProjectTo<GlueCreateDto1>(_configMapper).Where(x=>x.ModalNameID == modelNameID).OrderByDescending(x => x.ID).ToListAsync();
        }
        //Lấy Plan theo Plan_Id
        public PlanDto GetById(object id)
        {
            return _mapper.Map<Plan, PlanDto>(_repoPlan.FindById(id));
        }

        public Task<object> GetModelNames()
        {
            throw new System.NotImplementedException();
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

        public async Task<object> Summary(int building)
        {
           
                var currentDate = DateTime.Now.Date;
                var item = _repoBuilding.FindById(building);
                var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).ToListAsync();

                // Header
                var header = new List<HeaderForSummary> {
                     new HeaderForSummary
                {
                    field = "GlueID",
                },
                  new HeaderForSummary
                {
                    field = "Supplier",
                },
                new HeaderForSummary
                {
                    field = "Chemical"
                }
            };

                foreach (var line in lineList)
                {
                    var itemHeader = new HeaderForSummary
                    {
                        field = line.Name
                    };
                    header.Add(itemHeader);
                }
                header.Add(new HeaderForSummary
                {
                    field = "TotalConsumption"
                });
                // end header

                // Data
                var data = new List<object>();
                var data2 = new List<object>();
                var listBuildingGlueInfo = new List<object>();
                var plannings = _repoPlan.FindAll().Where(x => x.DueDate.Date == currentDate && lineList.Select(x => x.ID).Contains(x.BuildingID));
                var model = from glue in _repoGlue.FindAll()
                            join bpfc in _repoBPFC.FindAll() on glue.BPFCEstablishID equals bpfc.ID
                            join plan in plannings on bpfc.ID equals plan.BPFCEstablishID
                            select new SummaryDto
                            {
                                GlueID = glue.ID,
                                GlueName = glue.Name,
                                BuildingID = plan.BuildingID,
                                Comsumption = glue.Consumption,
                                ModelNameID = bpfc.ModelNameID,
                                WorkingHour = plan.WorkingHour,
                                HourlyOutput = plan.HourlyOutput
                            };


                var glueList = _repoGlue.FindAll()
                    .Include(x => x.GlueIngredients)
                        .ThenInclude(x => x.Ingredient)
                        .ThenInclude(x => x.Supplier)
                    .Include(x => x.BPFCEstablish)
                        .ThenInclude(x => x.Plans)
                        .ThenInclude(x => x.Building)
                    .Include(x => x.MixingInfos)
                    .Where(x => plannings.Select(p => p.BPFCEstablishID).Contains(x.BPFCEstablishID));
                var glueDistinct = glueList.DistinctBy(x => x.Name);

                foreach (var glue in glueDistinct)
                {
                   
                    var itemData = new Dictionary<string, object>();
                    var supplier = glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")) == null ? "#N/A" : glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")).Ingredient.Supplier.Name;
                    var glueInfo = new GlueInfo { GlueName = glue.Name, BPFC = "" };
                    itemData.Add("GlueID", glue.ID);
                    itemData.Add("Supplier", supplier);
                    itemData.Add("Chemical", glueInfo);
                    var listTotal = new List<double>();
                    var listStandardTotal = new List<double>();
                    var listWorkingHour = new List<double>();
                    var listHourlyOuput = new List<double>();
                    var rowRealInfo = new List<object>();
                    var rowCountInfo = new List<object>();
                    var delivered = await _repoBuildingGlue.FindAll().Where(x => x.GlueID == glue.ID && lineList.Select(a => a.ID).Contains(x.BuildingID) && x.CreatedDate.Date == currentDate).Select(x => x.Qty).ToListAsync();
                    var deliver = delivered.ConvertAll<double>(Convert.ToDouble).Sum();
                    var mixingInfos = _repoMixingInfo.FindAll().Where(x => x.GlueID == glue.ID && x.CreatedTime.Date == currentDate).ToList();
                    double realTotal = 0;
                    foreach (var real in mixingInfos)
                    {
                        realTotal += real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
                    }
                    foreach (var line in lineList.OrderBy(x => x.Name))
                    {
                        var sdtCon = await model.FirstOrDefaultAsync(x => x.GlueName == glue.Name && x.BuildingID == line.ID);
                        var listBuildingGlue =await _repoBuildingGlue.FindAll().Where(x => x.GlueID == glue.ID && x.BuildingID == line.ID && x.CreatedDate.Date == currentDate).ToListAsync();
                        List<double> real = listBuildingGlue.Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble);
                        double comsumption = 0;
                        if (sdtCon != null)
                        {
                            comsumption = sdtCon.Comsumption.ToDouble() * sdtCon.WorkingHour.ToDouble() * sdtCon.HourlyOutput.ToDouble();
                            itemData.Add(line.Name, Math.Round(comsumption / 1000, 3) + "kg");
                            listTotal.Add(sdtCon.Comsumption.ToDouble());
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
                            value = Math.Round(real.Sum(), 3),
                            count = listBuildingGlue.Count,
                            maxReal = realTotal,
                            delivered = deliver,
                            consumption = comsumption / 1000
                        });
                        rowRealInfo.Add(new SummaryInfo
                        {
                            GlueName = glue.Name,
                            line = line.Name,
                            lineID = line.ID,
                            glueID = glue.ID,
                            value = Math.Round(real.Sum(), 3),
                            count = listBuildingGlue.Count,
                            maxReal = realTotal,
                            delivered = deliver,
                            consumption = comsumption / 1000
                        });

                    }
                    itemData.Add("Standard", Math.Round(listStandardTotal.Sum(), 3) + "kg");
                    itemData.Add("Real", $"{Math.Round(deliver, 3)}kg / {Math.Round(realTotal, 3)}kg");
                    itemData.Add("Count", glue.MixingInfos.Where(x => x.CreatedTime.Date == currentDate).Count());
                    itemData.Add("rowRealInfo", rowRealInfo);
                    itemData.Add("rowCountInfo", rowCountInfo);
                    data.Add(itemData);

                }
                var infoList = new List<HeaderForSummary>() {
                     new HeaderForSummary
                {
                    field = "Standard"
                },
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
                return new { header, data };

        }
        //public async Task<object> Summary(int building)
        //{

        //    var currentDate = DateTime.Now.Date;
        //    var item = _repoBuilding.FindById(building);
        //    var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).ToListAsync();

        //    // Header
        //    var header = new List<HeaderForSummary> {
        //             new HeaderForSummary
        //        {
        //            field = "GlueID",
        //        },
        //          new HeaderForSummary
        //        {
        //            field = "Supplier",
        //        },
        //        new HeaderForSummary
        //        {
        //            field = "Chemical"
        //        }
        //    };

        //    foreach (var line in lineList)
        //    {
        //        var itemHeader = new HeaderForSummary
        //        {
        //            field = line.Name
        //        };
        //        header.Add(itemHeader);
        //    }
        //    header.Add(new HeaderForSummary
        //    {
        //        field = "TotalConsumption"
        //    });
        //    // end header

        //    // Data
        //    var data = new List<object>();
        //    var data2 = new List<object>();
        //    var listBuildingGlueInfo = new List<object>();
        //    var plannings = _repoPlanDetail.FindAll()
        //        .Include(x => x.Plan)
        //        .Where(x => x.Plan.DueDate.Date == currentDate && lineList.Select(x => x.ID).Contains(x.Plan.BuildingID));
         
        //    var planDetailsDistinct = plannings.DistinctBy(x => x.GlueName);

        //    foreach (var detail in planDetailsDistinct)
        //    {
        //        var itemData = new Dictionary<string, object>();
        //        var glueInfo = new GlueInfo { GlueName = detail.GlueName, BPFC = string.Join("<br>", plannings.Where(x=>x.GlueName == detail.GlueName).Select(x => x.BPFCName)) };
        //        itemData.Add("GlueID", detail.GlueID);
        //        itemData.Add("Supplier", detail.Supplier);
        //        itemData.Add("Chemical", glueInfo);
        //        var listTotal = new List<double>();
        //        var listStandardTotal = new List<double>();
        //        var listWorkingHour = new List<double>();
        //        var listHourlyOuput = new List<double>();
        //        var rowRealInfo = new List<object>();
        //        var rowCountInfo = new List<object>();
        //        var delivered = await _repoBuildingGlue.FindAll().Where(x => x.GlueID == detail.GlueID && lineList.Select(a => a.ID).Contains(x.BuildingID) && x.CreatedDate.Date == currentDate).Select(x => x.Qty).ToListAsync();
        //        var deliver = delivered.ConvertAll<double>(Convert.ToDouble).Sum();
        //        var mixingInfos = _repoMixingInfo.FindAll().Where(x => x.GlueID == detail.GlueID && x.CreatedTime.Date == currentDate).ToList();
        //        double realTotal = 0;
        //        foreach (var real in mixingInfos)
        //        {
        //            realTotal += real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
        //        }

        //        foreach (var line in lineList.OrderBy(x => x.Name))
        //        {
        //            var sdtCon = plannings.FirstOrDefault(x=>x.GlueName.Equals(detail.GlueName) && x.Plan.BuildingID == line.ID);
        //            var listBuildingGlue = await _repoBuildingGlue.FindAll().Where(x => x.GlueID == detail.GlueID && x.BuildingID == line.ID && x.CreatedDate.Date == currentDate).ToListAsync();
        //            List<double> real = listBuildingGlue.Select(x => x.Qty).ToList().ConvertAll<double>(Convert.ToDouble);
        //            double comsumption = 0;
        //            if (sdtCon != null)
        //            {

        //                comsumption = sdtCon.Consumption.ToDouble() * sdtCon.Plan.WorkingHour.ToDouble() * sdtCon.Plan.HourlyOutput.ToDouble();
        //                itemData.Add(line.Name, Math.Round(comsumption / 1000, 3) + "kg");
        //                listTotal.Add(sdtCon.Consumption.ToDouble());
        //                listWorkingHour.Add(sdtCon.Plan.WorkingHour.ToDouble());
        //                listHourlyOuput.Add(sdtCon.Plan.HourlyOutput.ToDouble());
        //                listStandardTotal.Add(comsumption / 1000);
        //            }
        //            else
        //            {
        //                itemData.Add(line.Name, 0);
        //            }

        //            rowCountInfo.Add(new SummaryInfo
        //            {
        //                GlueName = detail.GlueName,
        //                line = line.Name,
        //                lineID = line.ID,

        //                glueID = detail.GlueID,
        //                value = Math.Round(real.Sum(), 3),
        //                count = listBuildingGlue.Count,
        //                maxReal = realTotal,
        //                delivered = deliver,
        //                consumption = comsumption / 1000,
        //            });
        //            rowRealInfo.Add(new SummaryInfo
        //            {
        //                GlueName = detail.GlueName,
        //                line = line.Name,
        //                lineID = line.ID,
        //                glueID = detail.GlueID,
        //                value = Math.Round(real.Sum(), 3),
        //                count = listBuildingGlue.Count,
        //                maxReal = realTotal,
        //                delivered = deliver,
        //                consumption = comsumption / 1000
        //            });

        //        }
        //        itemData.Add("Standard", Math.Round(listStandardTotal.Sum(), 3) + "kg");
        //        itemData.Add("Real", $"{Math.Round(deliver, 3)}kg / {Math.Round(realTotal, 3)}kg");
        //        itemData.Add("Count", mixingInfos.Count());
        //        itemData.Add("rowRealInfo", rowRealInfo);
        //        itemData.Add("rowCountInfo", rowCountInfo);
        //        data.Add(itemData);

        //    }

        //    var infoList = new List<HeaderForSummary>() {
        //             new HeaderForSummary
        //        {
        //            field = "Standard"
        //        },
        //          new HeaderForSummary
        //        {
        //            field = "Real"
        //        },
        //        new HeaderForSummary
        //        {
        //            field = "Count"
        //        }};

        //    header.AddRange(infoList);

        //    // End Data
        //    return new { header, data };


        //}

        public Task<object> GetAllPlansByDate(string from, string to)
        {
            throw new System.NotImplementedException();
        }

        public async Task<List<PlanDto>> GetGlueByBuildingBPFCID(int buildingID, int bpfcID)
        {
            var lists = await _repoGlue.FindAll().ProjectTo<PlanDto>(_configMapper).Where(x => x.BPFCEstablishID == bpfcID).OrderByDescending(x => x.ID).ToListAsync();
            return lists.ToList();
        }
        public async Task<object> DispatchGlue(BuildingGlueForCreateDto obj)
        {
            var buildingGlue = _mapper.Map<BuildingGlue>(obj);
           var building = _repoBuilding.FindById(obj.BuildingID);
           var lastMixingInfo=await _repoMixingInfo.FindAll().Where(x=>x.GlueName.Contains(obj.GlueName) && x.BuildingID == building.ParentID).OrderByDescending(x=>x.CreatedTime).FirstOrDefaultAsync();
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

       
    }
}