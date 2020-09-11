using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AbnormalController : ControllerBase
    {
        private readonly IAbnormalService _abnormalService;
        public AbnormalController(IAbnormalService abnormalService)
        {
            _abnormalService = abnormalService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        {
            var plans = await _abnormalService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
            return Ok(plans);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _abnormalService.GetAllAsync();
            return Ok(plans);
        }
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _abnormalService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Abnormal create)
        {

            if (_abnormalService.GetById(create.ID) != null)
                return BadRequest("Abnormal already exists!");
            create.CreatedDate = DateTime.Now;
            if (await _abnormalService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the Abnormal failed on save");
        }
        [HttpPost]
        public async Task<IActionResult> CreateRange(List<Abnormal> create)
        {
            return Ok(await _abnormalService.AddRange(create));
        }
        [HttpPut]
        public async Task<IActionResult> Update(Abnormal update)
        {
            if (await _abnormalService.Update(update))
                return NoContent();
            return BadRequest($"Updating the Abnormal {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _abnormalService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the Abnormal");
        }
        [HttpGet("{ingredient}/{building}")]
        public async Task<IActionResult> HasLock(string ingredient, string building)
        {
            return Ok(await _abnormalService.HasLock(ingredient, building));
        }
        [HttpGet("{IngredientID}")]
        public async Task<IActionResult> GetBatchByIngredientID(int IngredientID)
        {
            var batchs = await _abnormalService.GetBatchByIngredientID(IngredientID);
            return Ok(batchs);
        }
        [HttpGet("{ingredient}/{batch}")]
        public async Task<IActionResult> GetBuildingByIngredientAndBatch(string ingredient, string batch)
        {
            return Ok(await _abnormalService.GetBuildingByIngredientAndBatch(ingredient, batch));
        }
    }
}
