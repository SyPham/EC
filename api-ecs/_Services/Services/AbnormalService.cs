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
    public class AbnormalService : IAbnormalService
    {

        private readonly IAbnormalRepository _repoAbnormal;
        private readonly IPlanRepository _repoPlan;
        private readonly IBuildingRepository _repoBuilding;
        private readonly IBuildingGlueRepository _repoBuildingGlue;
        private readonly IIngredientRepository _repoIngredient;
        private readonly IMixingInfoRepository _repoMixingInfo;
        private readonly IIngredientInfoRepository _repoIngredientInfo;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public AbnormalService(
            IAbnormalRepository repoAbnormal,
            IMapper mapper,
            IPlanRepository repoPlan,
             IIngredientRepository repoIngredient,
            IIngredientInfoRepository repoIngredientInfo,
            IBuildingRepository repoBuilding,
            IMixingInfoRepository repoMixingInfo,
            IBuildingGlueRepository repoBuildingGlue,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoAbnormal = repoAbnormal;
            _repoIngredientInfo = repoIngredientInfo;
            _repoPlan = repoPlan;
            _repoIngredient = repoIngredient;
            _repoBuilding = repoBuilding;
            _repoBuildingGlue = repoBuildingGlue;
            _repoMixingInfo = repoMixingInfo;
        }

        public async Task<bool> Add(Abnormal model)
        {
            var Abnormal = _mapper.Map<Abnormal>(model);

            _repoAbnormal.Add(Abnormal);
            return await _repoAbnormal.SaveAll();
        }

        public async Task<PagedList<Abnormal>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoAbnormal.FindAll().OrderByDescending(x => x.ID);
            return await PagedList<Abnormal>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<Abnormal>> Search(PaginationParams param, object text)
        {
            var lists = _repoAbnormal.FindAll()
            .Where(x => x.Ingredient.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<Abnormal>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Delete(object id)
        {
            var Abnormal = _repoAbnormal.FindById(id);
            _repoAbnormal.Remove(Abnormal);
            return await _repoAbnormal.SaveAll();
        }

        public async Task<bool> Update(Abnormal model)
        {
            var Abnormal = _mapper.Map<Abnormal>(model);
            _repoAbnormal.Update(Abnormal);
            return await _repoAbnormal.SaveAll();
        }

        public async Task<List<Abnormal>> GetAllAsync() => await _repoAbnormal.FindAll().OrderByDescending(x => x.ID).ToListAsync();

        public Abnormal GetById(object id) => _repoAbnormal.FindById(id);

        public async Task<object> HasLock(string ingredient, string building, string batch)
        {
            var buildingName = string.Empty;
            var buildings = new List<string>();
            var levels = new List<int> { 1, 2, 3 , 4};
            var buildingModel = await _repoBuilding.FindAll().FirstOrDefaultAsync(x => x.Name.Equals(building.ToSafetyString()));
            if (buildingModel != null)
            {
                // neu la level cao thi kiem tra het tat ca building
                if (levels.Contains(buildingModel.Level))
                {
                    buildings = await _repoBuilding.FindAll().Where(x => x.Level == 4).Select(x => x.Name).ToListAsync();
                    return await _repoAbnormal.FindAll().AllAsync(x =>
                            x.Ingredient.ToLower().Equals(ingredient.ToSafetyString().ToLower())
                        && x.Batch.ToLower().Equals(batch.ToSafetyString().ToLower())
                        && buildings.Contains(x.Building)
                        );
                }
                if (buildingModel.Level == 5)
                {
                    buildingName = _repoBuilding.FindById(buildingModel.ParentID).Name;
                }
            }
            return await _repoAbnormal.FindAll().AllAsync(x =>
                 x.Ingredient.ToLower().Equals(ingredient.ToSafetyString().ToLower())
              && x.Batch.ToLower().Equals(batch.ToSafetyString().ToLower())
              && x.Building.ToLower().Equals(building.ToSafetyString().ToLower())
             );
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
                return new List<BatchDto>();
            }

        }

        public async Task<object> GetBuildingByIngredientAndBatch(string ingredient, string batchValue)
        {
            var ingredientName = ingredient.ToSafetyString().ToLower();
            var from = DateTime.Now.Date.AddDays(-3).Date;
            var to = DateTime.Now.Date.Date;
            var infos = await _repoIngredient
                        .FindAll()
                        .Where(x => x.Name.Trim().ToLower().Contains(ingredientName.Trim().ToLower()))
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
                        var buildingGlue = await _repoBuildingGlue.FindAll().Where(x => x.BuildingID == plan.BuildingID && x.CreatedDate.Date == plan.DueDate.Date).FirstOrDefaultAsync();
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
                            ModelName = glue.BPFCEstablish.ModelName.Name,
                            ModelNo = glue.BPFCEstablish.ModelNo.Name,
                            ArticleNo = glue.BPFCEstablish.ArticleNo.Name,
                            Process = glue.BPFCEstablish.ArtProcess.Process.Name,
                            Line = plan.Building.Name,
                            LineID = plan.Building.ParentID.Value,
                            DueDate = plan.DueDate.Date,
                            Batch = batch,
                            MixDate = mixDate
                        };
                        troubleshootings.Add(detail);
                    }
                }
            }
            var listBuilding = troubleshootings.Where(x => x.Batch.Equals(batchValue)).DistinctBy(x => x.LineID).Select(x => x.LineID).ToList();
            var buildings = await _repoBuilding.FindAll().Where(x => listBuilding.Contains(x.ID)).ToListAsync();
            return buildings;
        }

        public async Task<object> AddRange(List<Abnormal> abnormals)
        {

            _repoAbnormal.AddRange(abnormals.Where(x => !_repoAbnormal.FindAll().Any(a => a.Building == x.Building && a.Ingredient == x.Ingredient && a.Batch == x.Batch)).ToList());
            return await _repoAbnormal.SaveAll();
        }
    }
}