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
    public class BuildingController : ControllerBase
    {
        private readonly IBuildingService _buildingService;
        public BuildingController(IBuildingService buildingService)
        {
            _buildingService = buildingService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        {
            var plans = await _buildingService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
            return Ok(plans);
        }

        [HttpGet(Name = "GetBuildings")]
        public async Task<IActionResult> GetAll()
        {
            var buildings = await _buildingService.GetAllAsync();
            return Ok(buildings);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsTreeView()
        {
            var buildings = await _buildingService.GetAllAsTreeView();
            return Ok(buildings);
        }
        [HttpGet]
        public async Task<IActionResult> GetBuildings()
        {
            var buildings = await _buildingService.GetBuildings();
            return Ok(buildings);
        }
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _buildingService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
        [HttpGet]
        public async Task<IActionResult> GetBuildingsForSetting()
        {
            var buildings = await _buildingService.GetBuildingsForSetting();
            return Ok(buildings);
        }
        [HttpPost]
        public async Task<IActionResult> Create(BuildingDto create)
        {

            if (_buildingService.GetById(create.ID) != null)
                return BadRequest("Article ID already exists!");
            if (await _buildingService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the building failed on save");
        }
        [HttpPost]
        public async Task<IActionResult> CreateSubBuilding(BuildingDto create)
        {

            return Ok(await _buildingService.CreateSubBuilding(create));
            throw new Exception("Creating the building failed on save");
        }
        [HttpPost]
        public async Task<IActionResult> CreateMainBuilding(BuildingDto create)
        {

            return Ok(await _buildingService.CreateMainBuilding(create));

            throw new Exception("Creating the building failed on save");
        }
        [HttpPut]
        public async Task<IActionResult> Update(BuildingDto update)
        {
            if (await _buildingService.Update(update))
                return NoContent();
            return BadRequest($"Updating the building {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _buildingService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the building");
        }
       
    }
}
