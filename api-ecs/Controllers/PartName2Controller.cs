using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PartName2Controller : ControllerBase
    {
        private readonly ISupplierService _supplierService;
        private readonly IPartName2Service _partname2Service;
        public PartName2Controller(IPartName2Service partnameService)
        {
            _partname2Service = partnameService;
        }

        //[HttpGet]
        //public async Task<IActionResult> GetLines([FromQuery]PaginationParams param)
        //{
        //    var lines = await _lineService.GetWithPaginations(param);
        //    Response.AddPagination(lines.CurrentPage,lines.PageSize,lines.TotalCount,lines.TotalPages);
        //    return Ok(lines);
        //}

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var lines = await _partname2Service.GetAllAsync();
            return Ok(lines);
        }

        //[HttpGet("{text}")]
        //public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        //{
        //    var lists = await _lineService.Search(param, text);
        //    Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
        //    return Ok(lists);
        //}
       
        [HttpPost]
        public async Task<IActionResult> Create(PartName2Dto create)
        {

            if (_partname2Service.GetById(create.ID) != null)
                return BadRequest("Line ID already exists!");
            //create.CreatedDate = DateTime.Now;
            if (await _partname2Service.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the model name failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(PartName2Dto update)
        {
            if (await _partname2Service.Update(update))
                return NoContent();
            return BadRequest($"Updating model name {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _partname2Service.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the model name");
        }
    }
}