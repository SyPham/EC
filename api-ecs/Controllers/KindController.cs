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
    public class KindController : ControllerBase
    {
        private readonly IKindService _kindService;
        public KindController(IKindService kindService)
        {
            _kindService = kindService;
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
            var lines = await _kindService.GetAllAsync();
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
        public async Task<IActionResult> Create(KindDto create)
        {

            if (_kindService.GetById(create.ID) != null)
                return BadRequest("Kind ID already exists!");
            //create.CreatedDate = DateTime.Now;
            if (await _kindService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the kind failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(KindDto update)
        {
            if (await _kindService.Update(update))
                return NoContent();
            return BadRequest($"Updating Kind {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _kindService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the Kind");
        }
    }
}