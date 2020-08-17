using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ArtProcessController : ControllerBase
    {
        private readonly IArtProcessService _artProcessService;
        public ArtProcessController(IArtProcessService artProcessService)
        {
            _artProcessService = artProcessService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        {
            var plans = await _artProcessService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
            return Ok(plans);
        }

        [HttpGet(Name = "GetArticleNos")]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _artProcessService.GetAllAsync();
            return Ok(plans);
        }
        [HttpGet("{articleNoID}")]
        public async Task<IActionResult> GetArtProcessByArticleNoID(int articleNoID)
        {
            var item = await _artProcessService.GetArtProcessByArticleNoID(articleNoID);
            return Ok(item);
        }
       
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _artProcessService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ArtProcessDto create)
        {

            if (_artProcessService.GetById(create.ID) != null)
                return BadRequest("Article ID already exists!");
            if (await _artProcessService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the article no failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(ArtProcessDto update)
        {
            if (await _artProcessService.Update(update))
                return NoContent();
            return BadRequest($"Updating the article no {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _artProcessService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the article no");
        }
    }
}
