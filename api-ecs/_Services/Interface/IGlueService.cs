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
        Task<bool> UpdateChemical(GlueCreateDto glueIngredientDto);
        Task<List<GlueCreateDto1>> GetAllGluesByBPFCID(int BPFCID);
    }
}
