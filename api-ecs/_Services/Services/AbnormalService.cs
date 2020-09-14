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
            return await _repoAbnormal.FindAll().AnyAsync(x =>
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
            var ingredientName = ingredient.ToSafetyString();
            var from = DateTime.Now.Date.AddDays(-3).Date;
            var to = DateTime.Now.Date.Date;
            var plans = _repoPlan.FindAll()
                .Include(x => x.Building)
                .Include(x => x.BPFCEstablish)
                    .ThenInclude(x => x.Glues)
                .Where(x => x.DueDate.Date >= from && x.DueDate.Date <= to)
                 .Select(x => new
                 {
                     x.BPFCEstablish.Glues,
                     Line = x.Building.ParentID,
                     x.DueDate
                 });
            var lines = new List<int?>();

            foreach (var plan in plans)
            {
                // lap nhung bpfc chua ingredient search
                foreach (var glue in plan.Glues.Where(x=> x.isShow == true && x.Name.Contains(ingredientName.Trim())))
                {
                    lines.Add(plan.Line);
                }
            }
            var listBuilding = lines.Distinct();
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