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
        private readonly int LINE = 4;
        private readonly IPlanRepository _repoPlan;
        private readonly IGlueRepository _repoGlue;
        private readonly IGlueIngredientRepository _repoGlueIngredient;
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
            IGlueRepository repoGlue,
            IGlueIngredientRepository repoGlueIngredient,
            IBuildingRepository repoBuilding,
            IBPFCEstablishRepository repoBPFC,
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
            _repoPlan = repoPlan;
            _repoBuilding = repoBuilding;
            _repoModelName = repoModelName;
            _hubContext = hubContext;
            _repoBPFC = repoBPFC;
            _repoMixingInfo = repoMixingInfo;
            _repoBuildingGlue= repoBuildingGlue;
        }

        //Thêm Brand mới vào bảng Plan
        public async Task<bool> Add(PlanDto model)
        {
            var plan = _mapper.Map<Plan>(model);
            plan.CreatedDate = DateTime.Now;
            plan.BPFCEstablishID = model.BPFCEstablishID;
            _repoPlan.Add(plan);
            var result = await _repoPlan.SaveAll();
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
            return result;
        }



        //Lấy danh sách Brand và phân trang
        public async Task<PagedList<PlanDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoPlan.FindAll().ProjectTo<PlanDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<PlanDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }

        //Tìm kiếm Plan
        public Task<PagedList<PlanDto>> Search(PaginationParams param, object text)
        {
            //var lists = _repoPlan.FindAll().ProjectTo<PlanDto>(_configMapper)
            //.Where(x => x.BuildingName.Contains(text.ToString()) || x.WorkHour.Contains(text.ToString()))
            //.OrderByDescending(x => x.ID);
            //return await PagedList<PlanDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
            throw new System.NotImplementedException();

        }
        //Xóa Brand
        public async Task<bool> Delete(object id)
        {
            var Plan = _repoPlan.FindById(id);
            _repoPlan.Remove(Plan);
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");
            return await _repoPlan.SaveAll();
        }

        //Cập nhật Brand
        public async Task<bool> Update(PlanDto model)
        {
            var plan = _mapper.Map<Plan>(model);
            plan.CreatedDate = DateTime.Now;
            _repoPlan.Update(plan);
            var result = await _repoPlan.SaveAll();
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");

            return result;
        }

        //Lấy toàn bộ danh sách Brand 
        public async Task<List<PlanDto>> GetAllAsync()
        {
            var min = DateTime.Now.Date;
            var max = DateTime.Now.AddDays(15).Date;
            return await _repoPlan.FindAll()
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
        //Lấy Brand theo Brand_Id
        public PlanDto GetById(object id)
        {
            return _mapper.Map<Plan, PlanDto>(_repoPlan.FindById(id));
        }

        public async Task<object> GetModelNames()
        {
            //return await _repoModelName.FindAll()
            //     .Where(x => x.ApprovedStatus == true && x.CreatedStatus == true)
            //     .ProjectTo<ModelNameDto>(_configMapper).Select(x => new ModelNameDto
            //     {
            //         ID = x.ID,
            //         Name = $"{x.Name}-{x.ModelNo}"

            //     }).ToListAsync();
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
            var plannings = await _repoPlan.FindAll().Where(x => x.DueDate.Date == currentDate && lineList.Select(x => x.ID).Contains(x.BuildingID)).ToListAsync();

            // Header
            var header = new List<HeaderForSummary> {
                     new HeaderForSummary
                {
                    field = "GlueID",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                },
                  new HeaderForSummary
                {
                    field = "Supplier",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                },
                new HeaderForSummary
                {
                    field = "Chemical",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                }


            };

            foreach (var line in lineList)
            {
                var itemHeader = new HeaderForSummary
                {
                    field = line.Name,
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                };
                header.Add(itemHeader);
            }
            // header.Add(new HeaderForSummary
            // {
            //     field = "Delivered",
            //     summaryInfo = new List<SummaryInfo>(),
            //     real = 0,
            //     count = 0
            // });
            header.Add(new HeaderForSummary
            {
                field = "TotalConsumption",
                summaryInfo = new List<SummaryInfo>(),
                real = 0,
                count = 0
            });
            // end header

            // Data
            var data = new List<object>();
            var data2 = new List<object>();
            var listBuildingGlueInfo = new List<object>();

            var model = (from glue in _repoGlue.FindAll().ToList()
                         join bpfc in _repoBPFC.FindAll().ToList() on glue.BPFCEstablishID equals bpfc.ID
                         join plan in _repoPlan.FindAll().Where(x=> x.DueDate.Date == currentDate).ToList() on bpfc.ID equals plan.BPFCEstablishID
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

            var glueList = await _repoGlue.FindAll()
                .Include(x => x.GlueIngredients)
                .ThenInclude(x => x.Ingredient)
                .ThenInclude(x => x.Supplier)
                .Include(x => x.MixingInfos)
                .Where(x => plannings.Select(p => p.BPFCEstablishID).Contains(x.BPFCEstablishID))
                .ToListAsync();
            var glueDistinct = glueList.DistinctBy(x => x.Name);
            foreach (var glue in glueDistinct)
            {
                var itemData = new Dictionary<string, object>();
                var supplier = glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")) == null ? "#N/A" : glue.GlueIngredients.FirstOrDefault(x => x.Position.Equals("A")).Ingredient.Supplier.Name;
                itemData.Add("GlueID", glue.ID);
                itemData.Add("Supplier", supplier);
                itemData.Add("Chemical", glue.Name);
                var listTotal = new List<double>();
                var listStandardTotal = new List<double>();
                var listWorkingHour = new List<double>();
                var listHourlyOuput = new List<double>();
                var rowRealInfo = new List<object>();
                var rowCountInfo = new List<object>();
                foreach (var line in lineList.OrderBy(x => x.Name))
                {
                    var sdtCon = model.FirstOrDefault(x => x.GlueName == glue.Name && x.BuildingID == line.ID);

                    var listBuildingGlue =  _repoBuildingGlue.FindAll().Where(x=>x.GlueID == glue.ID && x.BuildingID== line.ID && x.CreatedDate.Date == currentDate).ToList();
                    rowCountInfo.Add(new SummaryInfo {
                        glueName = glue.Name,
                        line = line.Name,
                        lineID=line.ID,
                        glueID = glue.ID,
                        value = 0,
                        count = listBuildingGlue.Count
                    });
                    List<double> real = listBuildingGlue.Select(x=>x.Qty).ToList().ConvertAll<double>(Convert.ToDouble);
                    rowRealInfo.Add(new SummaryInfo
                    {
                        glueName = glue.Name,
                        line = line.Name,
                        lineID = line.ID,
                        glueID = glue.ID,
                        value = Math.Round(real.Sum(), 3),
                    });
                    if (sdtCon != null)
                    {
                        var comsumption = sdtCon.Comsumption.ToDouble() * sdtCon.WorkingHour.ToDouble() * sdtCon.HourlyOutput.ToDouble();
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
                   
                }
                var delivered = await _repoBuildingGlue.FindAll().Where(x=>x.GlueID == glue.ID && lineList.Select(a=>a.ID).Contains(x.BuildingID) && x.CreatedDate.Date == currentDate).Select(x=>x.Qty).ToListAsync();
                // itemData.Add("Delivered", delivered.ConvertAll<double>(Convert.ToDouble).Sum() + "kg");
                itemData.Add("Standard", Math.Round(listStandardTotal.Sum(), 3) + "kg");
                var mixingInfos = _repoMixingInfo.FindAll().Where(x => x.GlueID == glue.ID && x.CreatedTime == currentDate).ToList();
                double realTotal = 0;
                foreach (var real in mixingInfos)
                {
                    realTotal += real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
                }
                var deliver = delivered.ConvertAll<double>(Convert.ToDouble).Sum() + "kg";
                itemData.Add("Real", $"{deliver} / {Math.Round(realTotal, 3)}kg");
                itemData.Add("Count", glue.MixingInfos.Where(x=>x.CreatedTime == currentDate).Count());
                itemData.Add("rowRealInfo", rowRealInfo);
                itemData.Add("rowCountInfo", rowCountInfo);
                data.Add(itemData);

            }
            var infoList = new List<HeaderForSummary>() {
                     new HeaderForSummary
                {
                    field = "Standard",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                },
                  new HeaderForSummary
                {
                    field = "Real",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                },
                new HeaderForSummary
                {
                    field = "Count",
                    summaryInfo = new List<SummaryInfo>(),
                    real = 0,
                    count = 0
                }};

            header.AddRange(infoList);

            // End Data
            return new { header, data };

        }

        public async Task<object> GetAllPlansByDate(string from, string to)
        {
            //var model = await _repoPlan.FindAll().Where(x => x.DueDate.Date == DateTime.Now.Date).ProjectTo<PlanDto>(_configMapper).OrderByDescending(x => x.ID).Select(x => new PlanDto
            //{
            //    ID = x.ID,
            //    BuildingID = x.BuildingID,
            //    ModelNameID = x.ModelNameID,
            //    PairOfShoesPerHour = x.PairOfShoesPerHour,
            //    CreatedDate = x.CreatedDate,
            //    DueDate = x.DueDate,
            //    BuildingName = _repoBuilding.FindAll().Any(a => a.ID == x.BuildingID) ? _repoBuilding.FindById(x.BuildingID).Name : "",
            //    ModelName = _repoModelName.FindAll().Any(a => a.ID == x.ModelNameID) ? $"{ _repoModelName.FindById(x.ModelNameID).Name}-{_repoModelName.FindById(x.ModelNameID).ModelNo}" : ""
            //}).ToListAsync();
            //if (!from.IsNullOrEmpty() && !to.IsNullOrEmpty())
            //{
            //    var FROM = from.ToParseStringDateTime().Date;
            //    var TO = to.ToParseStringDateTime().Date;
            //    model = model.Where(x => x.DueDate.Date >= FROM && x.DueDate.Date <= TO).ToList();
            //}
            //return model;
            throw new System.NotImplementedException();
        }

        public async Task<List<PlanDto>> GetGlueByBuildingBPFCID(int buildingID, int bpfcID)
        {
            var lists = await _repoGlue.FindAll().ProjectTo<PlanDto>(_configMapper).Where(x => x.BPFCEstablishID == bpfcID).OrderByDescending(x => x.ID).ToListAsync();
            return lists.ToList();
        }
        public async Task<object> DispatchGlue(BuildingGlueForCreateDto obj )
        {
            var buildingGlue = _mapper.Map<BuildingGlue>(obj);
            _repoBuildingGlue.Add(buildingGlue);
            return await _repoBuildingGlue.SaveAll();
        }
        public async Task<object> ClonePlan(List<PlanForCloneDto> plansDto) {
            var plans = _mapper.Map<List<Plan>>(plansDto);
            _repoPlan.AddRange(plans);
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
                .Where(x=>x.DueDate.Date >= min.Date && x.DueDate.Date <= max.Date)
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