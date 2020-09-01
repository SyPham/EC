using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class PlanController : ControllerBase
    {
        private readonly IPlanService _planService;
        public PlanController(IPlanService planService)
        {
            _planService = planService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery]PaginationParams param)
        {
            var plans = await _planService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage,plans.PageSize,plans.TotalCount,plans.TotalPages);
            return Ok(plans);
        }
        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetGlueByBuilding(int buildingID)
        {
            var plans = await _planService.GetGlueByBuilding(buildingID);
            return Ok(plans);
        }
        [HttpGet("{buildingID}/{modelName}")]
        public async Task<IActionResult> GetGlueByBuildingModelName(int buildingID, int modelName)
        {
            var plans = await _planService.GetGlueByBuildingModelName(buildingID, modelName);
            return Ok(plans);
        }
        [HttpGet(Name = "GetPlans")]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _planService.GetAllAsync();
            return Ok(plans);
        }
        [HttpGet("{from}/{to}")]
        public async Task<IActionResult> GetAllPlansByDate(string from, string to)
        {
            var plans = await _planService.GetAllPlansByDate(from, to);
            return Ok(plans);
        }
        //[HttpGet("{modeNameID}")]
        //public async Task<IActionResult> GetPlanByModelNameID(int modeNameID)
        //{
        //    var lists = await _planService.GetPlanByModelNameID(modeNameID);
        //    return Ok(lists);
        //}
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var lists = await _planService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetLines(int buildingID)
        {
            var lists = await _planService.GetLines(buildingID);
            return Ok(lists);
        }
        [HttpGet]
        public async Task<IActionResult> GetModelNames()
        {
            var lists = await _planService.GetModelNames();
            return Ok(lists);
        }
        [HttpPost]
        public async Task<IActionResult> Create(PlanDto create)
        {

            if (_planService.GetById(create.ID) != null)
                return BadRequest("Plan ID already exists!");
            create.CreatedDate = DateTime.Now;
            if (await _planService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the model no failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(PlanDto update)
        {
            if (await _planService.Update(update))
                return NoContent();
            return BadRequest($"Updating model no {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _planService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the model no");
        }
        [HttpGet("{buildingID}")]
        public async Task<IActionResult> Summary(int buildingID)
        {
            var model = await _planService.Summary(buildingID);
                return Ok(model);
        }
        [HttpPost]
        public async Task<IActionResult> ClonePlan(List<PlanForCloneDto> create)
        {
            return Ok(await _planService.ClonePlan(create));
        }
        [HttpPost]
        public async Task<IActionResult> DispatchGlue(BuildingGlueForCreateDto create)
        {
            return Ok(await _planService.DispatchGlue(create));
        }
        [HttpGet("{min}/{max}")]
        public async Task<IActionResult> Search(DateTime min, DateTime max)
        {
            var lists = await _planService.GetAllPlanByRange(min, max);
            return Ok(lists);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPlanByDefaultRange()
        {
            var lists = await _planService.GetAllPlanByDefaultRange();
            return Ok(lists);
        }
    }
}