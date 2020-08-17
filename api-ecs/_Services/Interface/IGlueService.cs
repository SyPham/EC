using EC_API.DTO;
using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IGlueService: IECService<GlueCreateDto>
    {
        Task<bool> CheckExists(int id);
        Task<bool> CheckBarCodeExists(string code);
        //Task GetAllAsyncByModalName();
        Task<List<GlueCreateDto1>> GetAllAsyncByModalName(int modelNameID);
        Task<bool> Add1(GlueCreateDto1 glueIngredientDto);
        Task<bool> UpdateChemical(GlueCreateDto glueIngredientDto);
        Task<List<GlueCreateDto1>> GetAllGluesForBPFC(int modelNameID, int articleNo, int processID);
        Task<List<GlueCreateDto1>> GetAllGluesByBPFCID(int BPFCID);
    }
}
