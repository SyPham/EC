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
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
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
            var lines = await _materialService.GetAllAsync();
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
        public async Task<IActionResult> Create(MaterialDto create)
        {

            if (_materialService.GetById(create.ID) != null)
                return BadRequest("Material ID already exists!");
            //create.CreatedDate = DateTime.Now;
            if (await _materialService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the material failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(MaterialDto update)
        {
            if (await _materialService.Update(update))
                return NoContent();
            return BadRequest($"Updating Material {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _materialService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the Material");
        }
    }
}