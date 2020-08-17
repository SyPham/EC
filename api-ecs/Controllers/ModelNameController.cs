using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.IO;
using EC_API.Helpers.Enum;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ModelNameController : ControllerBase
    {
        private readonly IModelNameService _modelNameService;
        private readonly IMailExtension _mailExtension;

        public ModelNameController(IModelNameService modelNameService, IMailExtension mailExtension)
        {
            _modelNameService = modelNameService;
            _mailExtension = mailExtension;
        }

        [HttpGet]
        public async Task<IActionResult> GetModelNames([FromQuery] PaginationParams param)
        {
            var modelNames = await _modelNameService.GetWithPaginations(param);
            Response.AddPagination(modelNames.CurrentPage, modelNames.PageSize, modelNames.TotalCount, modelNames.TotalPages);
            return Ok(modelNames);
        }

        [HttpGet(Name = "GetModelNames")]
        public async Task<IActionResult> GetAll()
        {
            var modelNames = await _modelNameService.GetAllAsync();
            return Ok(modelNames);
        }
        [HttpGet("{ID}")]
        public IActionResult GetModelNameByID(int ID)
        {
            var modelNames = _modelNameService.GetById(ID);
            return Ok(modelNames);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllForAdmin()
        {
            var modelNames = await _modelNameService.GetAllAsyncForAdmin();
            return Ok(modelNames);
        }
        [HttpGet]
        public async Task<IActionResult> FilterByApprovedStatus()
        {
            var modelNames = await _modelNameService.FilterByApprovedStatus();
            return Ok(modelNames);
        }
        [HttpGet]
        public async Task<IActionResult> FilterByFinishedStatus()
        {
            var modelNames = await _modelNameService.FilterByFinishedStatus();
            return Ok(modelNames);
        }
        [HttpGet]
        public async Task<IActionResult> FilterByNotApprovedStatus()
        {
            var modelNames = await _modelNameService.FilterByNotApprovedStatus();
            return Ok(modelNames);
        }
        [HttpGet("{modelName}")]
        public async Task<IActionResult> GetArticleNameQuantityByModelName(int modelName)
        {
            var quantity = await _modelNameService.GetArticleNameQuantityByModelName(modelName);
            return Ok(quantity);
        }
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _modelNameService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ModelNameDto create)
        {

            if (_modelNameService.GetById(create.ID) != null)
                return BadRequest("ModelName ID already exists!");
            if (await _modelNameService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the model name failed on save");
        }
        [HttpGet("{email}")]
        public async Task<IActionResult> SendMailForPIC(string email)
        {
            await _modelNameService.SendMailForPIC(email);
            return NoContent();
        }
        [HttpPut]
        public async Task<IActionResult> Update(ModelNameDto update)
        {
            if (await _modelNameService.Update(update))
                return NoContent();
            return BadRequest($"Updating model name {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _modelNameService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the model name");
        }

        [HttpGet("{status}/{start}/{end}")]
        [HttpGet("{status}")]
        [HttpGet("{start}/{end}")]
        public async Task<IActionResult> GetModelNameForBPFCRecord(Status status = Status.Unknown, string start = "", string end = "")
        {
            return Ok(await _modelNameService.GetModelNameForBPFCRecord(status, start, end));
        }
      
        [HttpGet]
        public async Task<IActionResult> GetAllModelNameForBPFCSchedule()
        {
            return Ok(await _modelNameService.GetAllModelNameForBPFCSchedule());
        }
        [HttpGet("{modelNameID}/{modelName}/{modelNo}/{processID}")]
        public async Task<IActionResult> CloneModelName(int modelNameID, string modelName, string modelNo, int processID)
        {
            if (await _modelNameService.CloneModelName(modelNameID, modelName, modelNo, processID))
                return NoContent();
            throw new Exception("Error save the model name");
        }
        [HttpPost]
        public async Task<IActionResult> Clone(CloneDto clone)
        {
            return Ok(await _modelNameService.CloneModelName(clone));
        }
        [HttpGet("{modelNameID}/{modelName}/{modelNo}/{article}/{processID}")]
        public async Task<IActionResult> CloneArticleModelname(int modelNameID, string modelName, string modelNo, string article, int processID)
        {
            if (await _modelNameService.CloneArticleModelname(modelNameID, modelName, modelNo, article, processID))
                return NoContent();
            throw new Exception("Error save the model name");
        }
        [HttpGet("{modelNameID}/{modelNOID}/{articleNOID}/{processID}")]
        public async Task<IActionResult> Clone(int modelNameID, int modelNOID, int articleNOID, int processID)
        {
            if (await _modelNameService.CloneModelName(modelNameID, modelNOID, articleNOID, processID))
                return NoContent();
            throw new Exception("Error save the model name");
        }
        [HttpGet("{modelNameID}/{userid}")]
        public async Task<IActionResult> Done(int modelNameID, int userid)
        {
            return Ok(await _modelNameService.Done(modelNameID, userid));
        }
        [HttpGet("{modelNameID}/{userid}")]
        public async Task<IActionResult> Approval(int modelNameID, int userid)
        {
            return Ok(await _modelNameService.Approval(modelNameID, userid));

        }
        [HttpGet("{modelNameID}/{userid}")]
        public async Task<IActionResult> Release(int modelNameID, int userid)
        {
            return Ok(await _modelNameService.Release(modelNameID, userid));
        }
        [HttpGet("{modelNameID}/{userid}")]
        public async Task<IActionResult> Reject(int modelNameID, int userid)
        {
            return Ok(await _modelNameService.Reject(modelNameID, userid));

        }
        [HttpGet]
        public async Task<IActionResult> ExcelExport()
        {
            string filename = "BPFCTemplate.xlsx";
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
        [HttpPost]
        public async Task<ActionResult> Import([FromForm] IFormFile file2)
        {
            IFormFile file = Request.Form.Files["UploadedFile"];
            object createdBy = Request.Form["CreatedBy"];
            var datasList = new List<ModelNameForImportExcelDto>();
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
                        datasList.Add(new ModelNameForImportExcelDto()
                        {
                            ModelName = workSheet.Cells[rowIterator, 1].Value.ToSafetyString(),
                            ModelNo = workSheet.Cells[rowIterator, 2].Value.ToSafetyString(),
                            ArticleNo = workSheet.Cells[rowIterator, 3].Value.ToSafetyString(),
                            Process = workSheet.Cells[rowIterator, 4].Value.ToSafetyString(),
                            CreatedDate = DateTime.Now,
                            CreatedBy = userid
                        });
                    }
                }


                return Ok(await _modelNameService.ImportExcel(datasList));
            }
            else
            {
                return StatusCode(500);
            }

        }
    }
}