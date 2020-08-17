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
    public class MaterialNameController : ControllerBase
    {
        private readonly IMaterialNameService _materialnameService;
        public MaterialNameController(IMaterialNameService materialnameService)
        {
            _materialnameService = materialnameService;
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
            var lines = await _materialnameService.GetAllAsync();
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
        public async Task<IActionResult> Create(MaterialNameDto create)
        {

            if (_materialnameService.GetById(create.ID) != null)
                return BadRequest("Line ID already exists!");
            //create.CreatedDate = DateTime.Now;
            if (await _materialnameService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the model name failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(MaterialNameDto update)
        {
            if (await _materialnameService.Update(update))
                return NoContent();
            return BadRequest($"Updating model name {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _materialnameService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the model name");
        }
    }
}