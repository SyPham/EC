using EC_API.DTO;
using EC_API.Helpers.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface IModelNameService: IECService<ModelNameDto>
    {
        Task<int> GetArticleNameQuantityByModelName(int modelName);
        Task<bool> CloneModelName(int modelNameID, string modelName, string modelNo, int processID);
        Task<bool> CloneModelName(int modelNameID, int modelNOID, int articleNOID, int processID);
        Task<object> CloneModelName(CloneDto clone);
        Task<bool> CloneArticleModelname(int modelNameID, string modelName, string modelNo, string article, int processID);
        Task<bool> ImportExcel(List<ModelNameForImportExcelDto> modelNameForImportExcelDtos);
        Task<List<ModelNameDto>> GetAllAsyncForAdmin();
        Task<List<ModelNameDto>> FilterByApprovedStatus();
        Task<List<ModelNameDto>> FilterByFinishedStatus();
        Task<List<ModelNameDto>> FilterByNotApprovedStatus();
        Task<List<ModelNameDto>> GetModelNameForBPFCRecord(Status status, string startBuildingDate, string endBuildingDate);
        Task<List<ModelNameDtoForBPFCSchedule>> GetAllModelNameForBPFCSchedule();
        Task<object> Approval(int modelNameID, int userid);
        Task<object> Done(int modelNameID, int userid);
        Task<object> Release(int modelNameID, int userid);
        Task<object> Reject(int modelNameID, int userid);
        Task SendMailForPIC(string email);
    }
}
