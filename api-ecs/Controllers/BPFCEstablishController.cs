using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Helpers.Enum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EC_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BPFCEstablishController : ControllerBase
    {
        private readonly IBPFCEstablishService _bPFCEstablishService;

        public BPFCEstablishController(IBPFCEstablishService bPFCEstablishService)
        {
            _bPFCEstablishService = bPFCEstablishService;
        }

        // GET: api/<BPFCEstablishController>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _bPFCEstablishService.GetAllAsync());
        }
        [HttpPost]
        public async Task<IActionResult> GetBPFCID(GetBPFCIDDto bpfcInfo)
        {
            return Ok( await _bPFCEstablishService.GetBPFCID(bpfcInfo));
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBPFCStatus()
        {
            return Ok(await _bPFCEstablishService.GetAllBPFCStatus());
        }
        [HttpGet("{status}/{start}/{end}")]
        [HttpGet("{status}")]
        [HttpGet("{start}/{end}")]
        public async Task<IActionResult> GetAllBPFCRecord(Status status = Status.Unknown, string start = "", string end = "")
        {
            return Ok(await _bPFCEstablishService.GetAllBPFCRecord(status, start, end));
        }
        [HttpPost]
        public async Task<ActionResult> Import([FromForm] IFormFile file2)
        {
            IFormFile file = Request.Form.Files["UploadedFile"];
            object createdBy = Request.Form["CreatedBy"];
            var datasList = new List<BPFCEstablishDtoForImportExcel>();
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
                        datasList.Add(new BPFCEstablishDtoForImportExcel()
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

                await _bPFCEstablishService.ImportExcel(datasList);
                return Ok();
            }
            else
            {
                return StatusCode(500);
            }

        }
        [HttpGet("{bpfcID}/{userid}")]
        public async Task<IActionResult> Done(int bpfcID, int userid)
        {
            return Ok(await _bPFCEstablishService.Done(bpfcID, userid));
        }
        [HttpGet("{bpfcID}/{userid}")]
        public async Task<IActionResult> Approval(int bpfcID, int userid)
        {
            return Ok(await _bPFCEstablishService.Approval(bpfcID, userid));

        }
        [HttpGet("{bpfcID}/{userid}")]
        public async Task<IActionResult> Release(int bpfcID, int userid)
        {
            return Ok(await _bPFCEstablishService.Release(bpfcID, userid));
        }
        [HttpGet("{bpfcID}/{userid}")]
        public async Task<IActionResult> Reject(int bpfcID, int userid)
        {
            return Ok(await _bPFCEstablishService.Reject(bpfcID, userid));

        }
        [HttpGet]
        public async Task<IActionResult> FilterByApprovedStatus()
        {
            var bpfc = await _bPFCEstablishService.FilterByApprovedStatus();
            return Ok(bpfc);
        }
        [HttpGet]
        public async Task<IActionResult> FilterByFinishedStatus()
        {
            var bpfc = await _bPFCEstablishService.FilterByFinishedStatus();
            return Ok(bpfc);
        }
        [HttpGet]
        public async Task<IActionResult> FilterByNotApprovedStatus()
        {
            var bpfc = await _bPFCEstablishService.FilterByNotApprovedStatus();
            return Ok(bpfc);
        }
        [HttpGet("{email}")]
        public async Task<IActionResult> SendMailForPIC(string email)
        {
            await _bPFCEstablishService.SendMailForPIC(email);
            return NoContent();
        }
        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetAllBPFCByBuildingID(int buildingID)
        {
            return Ok(await _bPFCEstablishService.GetAllBPFCByBuildingID(buildingID));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSeason(BPFCEstablishUpdateSeason entity)
        {

            if (await _bPFCEstablishService.UpdateSeason(entity))
                return NoContent();

            return BadRequest($"Updating brand {entity.ID} failed on save");
        }

    }
}
