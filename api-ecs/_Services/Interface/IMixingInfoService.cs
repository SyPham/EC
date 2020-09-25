using EC_API.DTO;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface IMixingInfoService
    {
        Task<MixingInfo> Mixing(MixingInfoForCreateDto mixing);
        Task<List<MixingInfoDto>> GetMixingInfoByGlueName(string glueName);
        Task<object> Stir(string glueName);
        Task<object> GetRPM(int mixingInfoID, string building, string startTime, string endTime);
        Task<object> GetRPMByMachineID(int machineID, string startTime, string endTime);
        Task<object> GetRPMByMachineCode(string machineCode, string startTime, string endTime);

    }
}
