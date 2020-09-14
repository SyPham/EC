using EC_API.DTO;
using EC_API.Helpers.Enum;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface IBPFCEstablishService : IECService<BPFCEstablishDto>
    {
        Task ImportExcel(List<BPFCEstablishDtoForImportExcel> bPFCEstablishDtos);
        Task<object> Approval(int bpfcID, int userid);
        Task<object> Done(int bpfcID, int userid);
        Task<object> Release(int bpfcID, int userid);
        Task<object> Reject(int bpfcID, int userid);
        Task SendMailForPIC(string email);
        Task<List<BPFCHistoryDto>> GetAllHistoryAsync();
        Task<bool> Create(BPFCHistoryDto entity);
        Task<bool> UpdateBPFCHistory(BPFCHistory entity);
        Task<object> LoadBPFCHistory(int bpfcID);
        Task<List<BPFCStatusDto>> FilterByApprovedStatus();
        Task<List<BPFCStatusDto>> FilterByFinishedStatus();
        Task<List<BPFCStatusDto>> FilterByNotApprovedStatus();
        Task<List<BPFCRecordDto>> GetAllBPFCRecord(Status status, string startBuildingDate, string endBuildingDate);
        Task<List<BPFCStatusDto>> GetAllBPFCStatus();
        Task<object> GetAllBPFCByBuildingID(int buildingID);
        Task<BPFCEstablishDto> GetBPFCID(GetBPFCIDDto bpfcInfo);
        Task<bool> UpdateSeason(BPFCEstablishUpdateSeason entity);
    }
}
