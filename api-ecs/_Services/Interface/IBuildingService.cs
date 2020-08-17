using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IBuildingService : IECService<BuildingDto>
    {
        Task<IEnumerable<HierarchyNode<BuildingDto>>> GetAllAsTreeView();
        Task<List<BuildingDto>> GetBuildings();
        Task<object> CreateMainBuilding(BuildingDto buildingDto);
        Task<object> CreateSubBuilding(BuildingDto buildingDto);
    }
}
