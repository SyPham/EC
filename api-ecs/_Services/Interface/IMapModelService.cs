using System.Collections.Generic;
using System.Threading.Tasks;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;

namespace EC_API._Services.Interface
{
    public interface IMapModelService : IECService<MapModelDto>
    {
        Task<List<ModelNoForMapModelDto>> GetModelNos(int modelNameID);
        Task<bool> MapMapModel(MapModel mapModel);
        Task<bool> Delete(int modelNameId, int modelNoId);
    }
}