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
        Task<bool> DeleteIngredientInfo(int id, string code , int qty ,string batch);
        Task<bool> UpdatePrint(QrPrintDto entity);
        Task<IngredientDto> ScanQRCode(string qrCode);
        Task<List<IngredientInfoDto>> GetAllIngredientInfoAsync();
        Task<List<IngredientInfoDto>> GetAllIngredientInfoOutputAsync();
        Task<List<IngredientInfoDto>> GetAllIngredientInfoByBuildingNameAsync(string name);
        Task<List<IngredientInfoReportDto>> GetAllIngredientInfoReportAsync();
        Task<List<IngredientInfoReportDto>> GetAllIngredientInfoReportByBuildingNameAsync(string name);
        Task<object> GetAllIngredientReportByRange(DateTime min, DateTime max);
        Task<object> GetAllIngredientReportByRangeWithBuilding(DateTime min, DateTime max, string name);
        
        Task<object> ScanQRCodeFromChemialWareHouse(string qrCode, string building, int userid);
         Task<object> ScanQRCodeOutput(string qrCode, string building, int userid);
        Task<object> ScanQRCodeFromChemialWareHouseDate(string qrCode, string start , string end);
        Task<bool> UpdateConsumptionChemialWareHouse(string qrCode , int consump);

        Task<bool> UpdateConsumptionIngredientReport(string qrCode, string batch, int consump );

        Task<bool> UpdateConsumptionOfBuildingIngredientReport(UpdateConsumpDto entity );

        Task<bool> CheckExistsName(string name);

    }
}
