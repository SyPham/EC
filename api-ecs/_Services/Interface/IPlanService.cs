using EC_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface IPlanService : IECService<PlanDto>
    {
        Task<object> GetAllPlanByDefaultRange();
        Task<object> GetAllPlanByRange(DateTime min, DateTime max);
        Task<object> GetAllPlansByDate(string from, string to);
        Task<object> Summary(int building);
        Task<object> GetLines(int buildingID);
        Task<Byte[]> Report(DateTime startDate, DateTime endDate);
        Task<List<GlueCreateDto1>> GetGlueByBuilding(int buildingID);
        Task<List<GlueCreateDto1>> GetGlueByBuildingModelName(int buildingID, int modelName);

        Task<object> GetBatchByIngredientID(int ingredientID);
        Task<List<PlanDto>> GetGlueByBuildingBPFCID(int buildingID, int bpfcID);
        Task<object> DispatchGlue(BuildingGlueForCreateDto obj);
        Task <object> TroubleShootingSearch(string ingredientName , string batch);
        Task<object> ClonePlan(List<PlanForCloneDto> plans);
        Task<object> DeleteRange(List<int> plansDto);
        Task<object> GetBPFCByGlue(TooltipParams tooltip);
        Task<bool> EditDelivered(int id, string qty );
        Task<bool> EditQuantity(int id, int qty );
        Task<bool> DeleteDelivered(int id);

    }
}
