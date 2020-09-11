using EC_API.DTO;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IAbnormalService : IECService<Abnormal>
    {
        Task<object> AddRange(List<Abnormal> abnormals);
        Task<object> HasLock(string ingredient, string building);
        Task<object> GetBatchByIngredientID(int ingredientID);
        Task<object> GetBuildingByIngredientAndBatch(string ingredient, string batch);

    }
}
