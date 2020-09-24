using EC_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface ISettingService
    {
        Task<object> GetAllAsync();
        Task<bool> AddSetting(SettingDTO model);
        Task<bool> Add(StirDTO model);
        Task<bool> Update(StirDTO model);
        Task<bool> DeleteSetting(int id);
        Task<bool> UpdateSetting(SettingDTO model);
        Task<object> GetSettingByBuilding(int buildingID);
    }
}
