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
    public class BuildingService : IBuildingService
    {

        private readonly IBuildingRepository _repoBuilding;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public BuildingService(IBuildingRepository repoBuilding, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoBuilding = repoBuilding;

        }

        public async Task<bool> Add(BuildingDto model)
        {
            var building = _mapper.Map<Building>(model);
            _repoBuilding.Add(building);
            return await _repoBuilding.SaveAll();
        }

        public async Task<PagedList<BuildingDto>> GetWithPaginations(PaginationParams param)
        {
            var lists = _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderByDescending(x => x.ID);
            return await PagedList<BuildingDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<PagedList<BuildingDto>> Search(PaginationParams param, object text)
        {
            var lists = _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper)
            .Where(x => x.Name.Contains(text.ToString()))
            .OrderByDescending(x => x.ID);
            return await PagedList<BuildingDto>.CreateAsync(lists, param.PageNumber, param.PageSize);
        }
        public async Task<bool> Delete(object id)
        {
            var Building = _repoBuilding.FindById(id);
            _repoBuilding.Remove(Building);
            return await _repoBuilding.SaveAll();
        }

        public async Task<bool> Update(BuildingDto model)
        {
            var building = _mapper.Map<Building>(model);
            _repoBuilding.Update(building);
            return await _repoBuilding.SaveAll();
        }

        public async Task<List<BuildingDto>> GetAllAsync()
        {
            return await _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public BuildingDto GetById(object id)
        {
            return _mapper.Map<Building, BuildingDto>(_repoBuilding.FindById(id));
        }

        public async Task<IEnumerable<HierarchyNode<BuildingDto>>> GetAllAsTreeView()
        {
            var lists = (await _repoBuilding.FindAll().ProjectTo<BuildingDto>(_configMapper).OrderBy(x => x.Name).ToListAsync()).AsHierarchy(x => x.ID, y => y.ParentID);
            return lists;
        }

        public async Task<List<BuildingDto>> GetBuildings()
        {
            return await _repoBuilding.FindAll().Where(x=>x.Level != 5).ProjectTo<BuildingDto>(_configMapper).OrderBy(x => x.Level).ToListAsync();

        }

        public async Task<object> CreateMainBuilding(BuildingDto buildingDto)
        {
            if (buildingDto.ID == 0)
            {
                var item = _mapper.Map<Building> (buildingDto);
                item.Level = 1;
                _repoBuilding.Add(item);

            } else
            {
                var item = _repoBuilding.FindById(buildingDto.ID);
                item.Name = buildingDto.Name;
            }
            try
            {
              
                return await _repoBuilding.SaveAll();
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<object> CreateSubBuilding(BuildingDto buildingDto)
        {
            var item = _mapper.Map<Building>(buildingDto);

            //Level cha tang len 1 va gan parentid cho subtask
            var itemParent = _repoBuilding.FindById(buildingDto.ParentID);
            item.Level = itemParent.Level + 1;
            item.ParentID = buildingDto.ParentID;
            _repoBuilding.Add(item);

            try
            {
                return await _repoBuilding.SaveAll();
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}