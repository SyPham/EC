using EC_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
   public interface IIngredientService: IECService<IngredientDto>
    {
        Task<bool> CheckExists(int id); 
        Task<bool> CheckBarCodeExists(string code);
        Task<bool> Add1(IngredientDto1 ingredientIngredientDto);
        Task<bool> AddRangeAsync(List<IngredientForImportExcelDto> model);
        Task<bool> DeleteIngredientInfo(int id);
        Task<bool> UpdatePrint(QrPrintDto entity);
        Task<IngredientDto> ScanQRCode(string qrCode);
        Task<List<IngredientInfoDto>> GetAllIngredientInfoAsync();
        Task<object> ScanQRCodeFromChemialWareHouse(string qrCode);
        Task<object> ScanQRCodeFromChemialWareHouseDate(string qrCode, string start , string end);
        Task<bool> UpdateConsumptionChemialWareHouse(string qrCode , int consump);
    }
}
