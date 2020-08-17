using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IBuildingUserService : IECService<BuildingUserDto>
    {
        Task<object> MappingUserWithBuilding(BuildingUserDto buildingUserDto);
        Task<object> RemoveBuildingUser(BuildingUserDto buildingUserDto);
        Task<List<BuildingUserDto>> GetBuildingUserByBuildingID(int buildingID);
        Task<object> GetBuildingByUserID(int userid);
        Task<object> MapBuildingUser(int userid, int buildingid);
    }
}
