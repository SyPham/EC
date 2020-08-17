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
    public class PartController : ControllerBase
    {
        private readonly IPartService _partService;
        public PartController(IPartService partService)
        {
            _partService = partService;
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
            var lines = await _partService.GetAllAsync();
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
        public async Task<IActionResult> Create(PartDto create)
        {

            if (_partService.GetById(create.ID) != null)
                return BadRequest("Part ID already exists!");
            //create.CreatedDate = DateTime.Now;
            if (await _partService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the part failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(PartDto update)
        {
            if (await _partService.Update(update))
                return NoContent();
            return BadRequest($"Updating Part {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _partService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the Part");
        }
    }
}