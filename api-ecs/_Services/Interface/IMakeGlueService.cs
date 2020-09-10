using System.Threading.Tasks;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;

namespace EC_API._Services.Interface
{
    public interface IMakeGlueService
    {
        //Task<bool> CheckBrandExists(string brandId);
        Task<object> MakeGlue(int glueid);
        Task<object> MakeGlue(string code);
        Task<object> GetAllGlues();
        Task<object> GetGlueWithIngredients(int glueid);
        Task<object> GetGlueWithIngredientByGlueCode(string code);
        Task<object> GetGlueWithIngredientByGlueID(int glueid);
        Task<object> GetGlueWithIngredientByGlueName(string glueName);
        object DeliveredHistory();
    }
}