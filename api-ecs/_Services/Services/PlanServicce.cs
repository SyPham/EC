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
        private readonly IIngredientRepository _repoIngredient;
        private readonly IBuildingRepository _repoBuilding;
        private readonly IBPFCEstablishRepository _repoBPFC;
        private readonly IMixingInfoRepository _repoMixingInfo;
        private readonly IModelNameRepository _repoModelName;
        private readonly IHubContext<ECHub> _hubContext;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public PlanService(
            IPlanRepository repoPlan,
            IGlueRepository repoGlue,
            IGlueIngredientRepository repoGlueIngredient,
            IIngredientRepository repoIngredient,
            IBuildingRepository repoBuilding,
            IBPFCEstablishRepository repoBPFC,
            IMixingInfoRepository repoMixingInfo,
            IModelNameRepository repoModelName,
            IHubContext<ECHub> hubContext,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoGlue = repoGlue;
            _repoGlueIngredient = repoGlueIngredient;
            _repoIngredient = repoIngredient;
            _repoPlan = repoPlan;
            _repoBuilding = repoBuilding;
            _repoModelName = repoModelName;
            _hubContext = hubContext;
            _repoBPFC = repoBPFC;
            _repoMixingInfo = repoMixingInfo;
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
            await _hubContext.Clients.All.SendAsync("summaryRecieve", "ok");

            return await _repoPlan.SaveAll();
        }

        //Lấy toàn bộ danh sách Brand 
        public async Task<List<PlanDto>> GetAllAsync()
        {
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
            var item = _repoBuilding.FindById(building);
            var lineList = await _repoBuilding.FindAll().Where(x => x.ParentID == item.ID).ToListAsync();
            var plannings = await _repoPlan.FindAll().Where(x => lineList.Select(x => x.ID).Contains(x.BuildingID)).ToListAsync();

            // Header
            var header = new List<object> {
                     new
                {
                    field = "GlueID",
                    headerText = "GlueID",
                    width = 60,
                    textAlign = "Center",
                    minWidth = 10
                },
                  new
                {
                    field = "Supplier",
                    headerText = "Supplier",
                    width = 60,
                    textAlign = "Center",
                    minWidth = 10
                },
                new
                {
                    field = "Chemical",
                    headerText = "Chemical",
                    width = 60,
                    textAlign = "Center",
                    minWidth = 10
                }


            };
          
            foreach (var line in lineList)
            {
                var itemHeader = new
                {
                    field = line.Name,
                    headerText = line.Name,
                    width = 20,
                    textAlign = "Center",
                    minWidth = 5
                };
                header.Add(itemHeader);
            }
            // end header

            // Data
            var data = new List<object>();
            var data2 = new List<object>();
            var model = (from glue in _repoGlue.FindAll().ToList()
                         join bpfc in _repoBPFC.FindAll().ToList() on glue.BPFCEstablishID equals bpfc.ID
                         join plan in _repoPlan.FindAll().ToList() on bpfc.ID equals plan.BPFCEstablishID
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
                .Include(x=>x.GlueIngredients)
                .ThenInclude(x=>x.Ingredient)
                .ThenInclude(x=>x.Supplier)
                .Include(x=>x.MixingInfos)
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

                foreach (var line in lineList.OrderBy(x => x.Name))
                {

                    var sdtCon = model.FirstOrDefault(x => x.GlueName == glue.Name && x.BuildingID == line.ID);
                    if (sdtCon != null)
                    {
                        itemData.Add(line.Name, sdtCon.Comsumption.ToDouble());
                        listTotal.Add(sdtCon.Comsumption.ToDouble());
                        listWorkingHour.Add(sdtCon.WorkingHour.ToDouble());
                        listHourlyOuput.Add(sdtCon.HourlyOutput.ToDouble());
                        var standard = sdtCon.Comsumption.ToDouble() * sdtCon.WorkingHour.ToDouble() * sdtCon.HourlyOutput.ToDouble();
                        listStandardTotal.Add(standard);
                    }
                    else
                    {
                        itemData.Add(line.Name, 0);
                    }
                }

                itemData.Add("Standard", Math.Round(listStandardTotal.Sum(), 2));
                var mixingInfos = _repoMixingInfo.FindAll().Where(x => x.GlueID == glue.ID).ToList();
                double realTotal = 0;
                foreach (var real in mixingInfos)
                {
                    realTotal += real.ChemicalA.ToDouble() + real.ChemicalB.ToDouble() + real.ChemicalC.ToDouble() + real.ChemicalD.ToDouble() + real.ChemicalE.ToDouble();
                }

                itemData.Add("Real", Math.Round(realTotal,3));
                itemData.Add("Count", glue.MixingInfos.Count());
                data.Add(itemData);
            }
            header.Add(new
            {
                field = "TotalComsumption",
                headerText = "Total Consumption",
                width = 60,
                textAlign = "Center",
                minWidth = 10
            });
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
    }
}