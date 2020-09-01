using EC_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IIngredientInfoService : IECService<IngredientInfoDto>
    {
        Task<bool> CheckExists(int id); 
        Task<bool> CheckBarCodeExists(string code);
        Task<bool> Add1(IngredientDto1 ingredientIngredientDto);
        Task<bool> AddRangeAsync(List<IngredientForImportExcelDto> model);
        Task<bool> UpdatePrint(QrPrintDto entity);
        Task<IngredientDto> ScanQRCode(string qrCode);

        Task<object> ScanQRCodeFromChemialWareHouse(string qrCode);
    }
}
