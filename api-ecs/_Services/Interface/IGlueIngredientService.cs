using System.Collections.Generic;
using System.Threading.Tasks;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;

namespace EC_API._Services.Interface
{
    public interface IGlueIngredientService 
    {
        Task<PagedList<GlueCreateDto>> GetGluesWithPaginations(PaginationParams param);
        Task<PagedList<IngredientDto>> GetIngredientsWithPaginations(PaginationParams param, int glueid);
        Task<bool> MapGlueIngredient(GlueIngredient glueIngredient);
        Task<bool> Delete(int glueid, int ingredientid);
        Task<object> GetIngredientsByGlueID(int glueid,int supID);
        Task<List<IngredientDto>> GetIngredientsByGlueID1(int glueid);
        bool CheckExist(int glueid, int ingredientid);
        object GetGlueIngredientDetail(int glueid);
        Task<bool> EditPercentage(int glueid, int ingredientid, int percentage);
        Task<bool> EditAllow(int glueid, int ingredientid, int allow);
        Task<Glue> Guidance(List<GlueIngredientForGuidanceDto> glueIngredientForGuidanceDto);
    }
}