using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.IO;
using OfficeOpenXml.Table;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;
        public IngredientController(IIngredientService brandService)
        {
            _ingredientService = brandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetIngredients([FromQuery] PaginationParams param)
        {
            var ingredients = await _ingredientService.GetWithPaginations(param);
            Response.AddPagination(ingredients.CurrentPage, ingredients.PageSize, ingredients.TotalCount, ingredients.TotalPages);
            return Ok(ingredients);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var ingredients = await _ingredientService.GetAllAsync();
            return Ok(ingredients);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIngredientInfo()
        {
            var ingredientsInfo = await _ingredientService.GetAllIngredientInfoAsync();
            return Ok(ingredientsInfo);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIngredientInfoOutPut()
        {
            var ingredientsInfo = await _ingredientService.GetAllIngredientInfoOutputAsync();
            return Ok(ingredientsInfo);
        }

        [HttpGet("{buildingName}")]
        public async Task<IActionResult> GetAllIngredientInfoByBuildingName(string buildingName)
        {
            var ingredientsInfo = await _ingredientService.GetAllIngredientInfoByBuildingNameAsync(buildingName);
            return Ok(ingredientsInfo);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllIngredientInfoReport()
        {
            var ingredientsInfoReport = await _ingredientService.GetAllIngredientInfoReportAsync();
            return Ok(ingredientsInfoReport);
        }

        [HttpGet("{buildingName}")]
        public async Task<IActionResult> GetAllIngredientInfoReportByBuildingName(string buildingName)
        {
            var ingredientsInfoReport = await _ingredientService.GetAllIngredientInfoReportByBuildingNameAsync(buildingName);
            return Ok(ingredientsInfoReport);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllIngredientInfoReportByDate()
        {
            var ingredientsInfoReport = await _ingredientService.GetAllIngredientInfoReportAsync();
            return Ok(ingredientsInfoReport);
        }

        [HttpGet("{min}/{max}")]
        public async Task<IActionResult> Search(DateTime min, DateTime max)
        {
            var lists = await _ingredientService.GetAllIngredientReportByRange(min, max);
            return Ok(lists);
        }

        [HttpGet("{min}/{max}/{buildingName}")]
        public async Task<IActionResult> SearchWithBuildingName(DateTime min, DateTime max, string buildingName)
        {
            var lists = await _ingredientService.GetAllIngredientReportByRangeWithBuilding(min, max , buildingName);
            return Ok(lists);
        }

        

        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _ingredientService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        
        //[HttpGet("{ingredientid}", Name = "GetIngredientOfIngredient")]
        //public async Task<IActionResult> Ingredient(int ingredientid)
        //{
        //    var lists = await _ingredientService.GetIngredientOfIngredient(ingredientid);
        //    return Ok(lists);
        //}
        [HttpPost]
        public async Task<IActionResult> Create(IngredientDto ingredientIngredientDto)
        {
            if (await _ingredientService.CheckExists(ingredientIngredientDto.ID))
                return BadRequest("Ingredient ID already exists!");
            if (await _ingredientService.CheckBarCodeExists(ingredientIngredientDto.Code))
                return BadRequest("Ingredient Barcode already exists!");
            if (await _ingredientService.CheckExistsName(ingredientIngredientDto.Name))
                return BadRequest("Ingredient Name already exists!");
            ingredientIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _ingredientService.Add(ingredientIngredientDto))
            {
                return NoContent();
            }
            throw new Exception("Creating the brand failed on save");
        }

        [HttpPost]
        public async Task<IActionResult> Create1(IngredientDto1 ingredientIngredientDto)
        {
            if (await _ingredientService.CheckExists(ingredientIngredientDto.ID))
                return BadRequest("Ingredient ID already exists!");
            if (await _ingredientService.CheckBarCodeExists(ingredientIngredientDto.Code))
                return BadRequest("Ingredient Barcode already exists!");
            if (await _ingredientService.CheckExistsName(ingredientIngredientDto.Name))
                return BadRequest("Ingredient Name already exists!");
            ingredientIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _ingredientService.Add1(ingredientIngredientDto))
            {
                return NoContent();
            }

            throw new Exception("Creating the brand failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(IngredientDto ingredientIngredientDto)
        {

            ingredientIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _ingredientService.Update(ingredientIngredientDto))
                return NoContent();

            return BadRequest($"Updating brand {ingredientIngredientDto.ID} failed on save");
        }

        [HttpGet("{qrCode}")]
        public async Task<IActionResult> ScanQRCode(string qrCode)
        {
            return Ok(await _ingredientService.ScanQRCode(qrCode));
        }

        [HttpGet("{qrCode}/{building}/{userid}")]
        public async Task<IActionResult> ScanQRCodeFromChemialWareHouse(string qrCode, string building, int userid)
        {
            return Ok(await _ingredientService.ScanQRCodeFromChemialWareHouse(qrCode, building, userid));
        }

        [HttpGet("{qrCode}/{building}/{userid}")]
        public async Task<IActionResult> ScanQRCodeOutput(string qrCode, string building, int userid)
        {
            return Ok(await _ingredientService.ScanQRCodeOutput(qrCode, building, userid));
        }

        [HttpGet("{qrCode}/{start}/{end}")]
        public async Task<IActionResult> ScanQRCodeFromChemialWareHouseDate(string qrCode , string start , string end)
        {
            return Ok(await _ingredientService.ScanQRCodeFromChemialWareHouseDate(qrCode,start, end));
        }

        [HttpPost("{qrCode}/{consump}")]
        public async Task<IActionResult> UpdateConsumptionChemialWareHouse(string qrCode , int consump)
        {
            return Ok(await _ingredientService.UpdateConsumptionChemialWareHouse(qrCode,consump));
        }

        [HttpPost("{qrCode}/{batch}/{consump}")]
        public async Task<IActionResult> UpdateConsumptionIngredientReport(string qrCode, string batch , int consump)
        {
            return Ok(await _ingredientService.UpdateConsumptionIngredientReport(qrCode,batch,consump));
        }

        [HttpPost]
        public async Task<IActionResult> UpdateConsumptionOfBuildingIngredientReport(UpdateConsumpDto entity)
        {
            return Ok(await _ingredientService.UpdateConsumptionOfBuildingIngredientReport(entity));
        }

        // [HttpPost]
        // public async Task<IActionResult> UpdateConsumptionOfBuildingIngredientReport(string qrCode, string batch , int consump, string buildingName)
        // {
        //     return Ok(await _ingredientService.UpdateConsumptionOfBuildingIngredientReport(qrCode,batch,consump,buildingName));
        // }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            if (await _ingredientService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the brand");
        }
        private DataTable ReadFromExcelfile(Stream path, string sheetName)
        {
            // Khởi tạo data table
            DataTable dt = new DataTable();
            // Load file excel và các setting ban đầu
            using (ExcelPackage package = new ExcelPackage(path))
            {
                if (package.Workbook.Worksheets.Count == 1)
                {
                    // Log - Không có sheet nào tồn tại trong file excel của bạn return null; } 
                    // Lấy Sheet đầu tiện trong file Excel để truy vấn 
                    // Truyền vào name của Sheet để lấy ra sheet cần, nếu name = null thì lấy sheet đầu tiên 
                    ExcelWorksheet workSheet = package.Workbook.Worksheets.FirstOrDefault(x => x.Name == sheetName) ?? package.Workbook.Worksheets.FirstOrDefault();
                    // Đọc tất cả các header
                    foreach (var firstRowCell in workSheet.Cells[1, 1, 1, workSheet.Dimension.End.Column])
                    {
                        dt.Columns.Add(firstRowCell.Text);
                    }
                    // Đọc tất cả data bắt đầu từ row thứ 2
                    for (var rowNumber = 2; rowNumber >= workSheet.Dimension.End.Row; rowNumber++)
                    {
                        // Lấy 1 row trong excel để truy vấn
                        var row = workSheet.Cells[rowNumber, 1, rowNumber, workSheet.Dimension.End.Column];

                        // tạo 1 row trong data table
                        var newRow = dt.NewRow();
                        foreach (var cell in row)
                        {
                            newRow[cell.Start.Column - 1] = cell.Text;
                        }
                        dt.Rows.Add(newRow);
                    }
                }
                return dt;
            }
        }

        [HttpPost]
        public async Task<ActionResult> Import([FromForm] IFormFile file2)
        {
            IFormFile file = Request.Form.Files["UploadedFile"];
            object createdBy = Request.Form["CreatedBy"];
            var datasList = new List<IngredientForImportExcelDto>();
            //var datasList2 = new List<UploadDataVM2>();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            if ((file != null) && (file.Length > 0) && !string.IsNullOrEmpty(file.FileName))
            {
                string fileName = file.FileName;
                int userid = createdBy.ToInt();
                using (var package = new ExcelPackage(file.OpenReadStream()))
                {
                    var currentSheet = package.Workbook.Worksheets;
                    var workSheet = currentSheet.First();
                    var noOfCol = workSheet.Dimension.End.Column;
                    var noOfRow = workSheet.Dimension.End.Row;

                    for (int rowIterator = 2; rowIterator <= noOfRow; rowIterator++)
                    {
                        datasList.Add(new IngredientForImportExcelDto()
                        {
                            Name = workSheet.Cells[rowIterator, 1].Value.ToSafetyString(),
                            SupplierID = workSheet.Cells[rowIterator, 2].Value.ToInt(),
                        });
                    }
                }
                datasList.ForEach(item =>
                {
                    var generator = new RandomGenerator();
                    var code = generator.RandomStringNumber(8);
                    if (datasList.Any(x => x.Code == code))
                    {
                        code = generator.RandomStringNumber(8);
                    }
                    item.Code = code;
                    item.CreatedDate = DateTime.Now;
                    item.CreatedBy = userid;
                });

                return Ok(await _ingredientService.AddRangeAsync(datasList));
            }
            else
            {
                return StatusCode(500);
            }

        }
        [HttpGet]
        public async Task<IActionResult> ExcelExport()
        {
            string filename = "IngredientTemplate.xlsx";
            if (filename == null)
                return Content("filename not present");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "wwwroot/excelTemplate", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }
        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/octet-stream"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }
        [HttpGet]
        public ActionResult ExcelExport2()
        {

            DataTable Dt = new DataTable();
            Dt.Columns.Add("Name", typeof(string));
            Dt.Columns.Add("SupplierID", typeof(int));


            var memoryStream = new MemoryStream();
            using var excelPackage = new ExcelPackage(memoryStream);
            var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");
            worksheet.Cells["A1"].LoadFromDataTable(Dt, true, TableStyles.None);
            worksheet.Cells["A1:AB1"].Style.Font.Bold = true;
            worksheet.DefaultRowHeight = 18;
            if (excelPackage == null)
            {
                return NotFound();
            }

            byte[] data = excelPackage.GetAsByteArray() as byte[];

            return File(data, "application/octet-stream", "DataUpload.xlsx");

        }
        [HttpPut]
        public async Task<IActionResult> UpdatePrint(QrPrintDto entity)
        {

            if (await _ingredientService.UpdatePrint(entity))
                return NoContent();

            return BadRequest($"Updating brand {entity.ID} failed on save");
        }
        [HttpGet("{ID}")]
        public IActionResult GetbyID(int ID)
        {
            return Ok(_ingredientService.GetById(ID));
        }
        [HttpDelete("{id}/{code}/{qty}/{batch}")]
        public async Task<IActionResult> DeleteIngredientInfo(int id, string code, int qty , string batch)
        {
            return Ok(await _ingredientService.DeleteIngredientInfo(id , code , qty , batch));
        }
       
    }
}