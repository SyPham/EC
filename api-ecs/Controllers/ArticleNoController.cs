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
    public class ArticleNoController : ControllerBase
    {
        private readonly IArticleNoService _articleNoService;
        public ArticleNoController(IArticleNoService articleNoService)
        {
            _articleNoService = articleNoService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        {
            var plans = await _articleNoService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
            return Ok(plans);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _articleNoService.GetAllAsync();
            return Ok(plans);
        }
        [HttpGet("{modelNameID}")]
        public async Task<IActionResult> GetArticleNoByModelNameID(int modelNameID)
        {
            var item = await _articleNoService.GetArticleNoByModelNameID(modelNameID);
            return Ok(item);
        }
        [HttpGet("{modelNoID}")]
        public async Task<IActionResult> GetArticleNoByModelNoID(int modelNoID)
        {
            var item = await _articleNoService.GetArticleNoByModelNoID(modelNoID);
            return Ok(item);
        }
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _articleNoService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ArticleNoDto create)
        {

            if (_articleNoService.GetById(create.ID) != null)
                return BadRequest("Article ID already exists!");
            create.CreatedDate = DateTime.Now;
            if (await _articleNoService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the article no failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(ArticleNoDto update)
        {
            if (await _articleNoService.Update(update))
                return NoContent();
            return BadRequest($"Updating the article no {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _articleNoService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the article no");
        }
    }
}
