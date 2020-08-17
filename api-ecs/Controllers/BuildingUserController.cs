using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EC_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BuildingUserController : ControllerBase
    {
        private readonly IBuildingUserService _buildingUserService;

        public BuildingUserController(IBuildingUserService buildingUserService)
        {
            _buildingUserService = buildingUserService;
        }
        [HttpPost]
        public async Task<IActionResult> MappingUserWithBuilding([FromBody]BuildingUserDto buildingUserDto)
        {
            var result = await _buildingUserService.MappingUserWithBuilding(buildingUserDto);
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> RemoveBuildingUser([FromBody] BuildingUserDto buildingUserDto)
        {
            var result = await _buildingUserService.RemoveBuildingUser(buildingUserDto);
            return Ok(result);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBuildingUsers()
        {
            var result = await _buildingUserService.GetAllAsync();
            return Ok(result);
        }
        
        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetBuildingUserByBuildingID(int buildingID)
        {
            var result = await _buildingUserService.GetBuildingUserByBuildingID(buildingID);
            return Ok(result);
        }
        [HttpGet("{userID}")]
        public async Task<IActionResult> GetBuildingByUserID(int userID)
        {
            var result = await _buildingUserService.GetBuildingByUserID(userID);
            return Ok(result);
        }
        [HttpGet("{userid}/{buildingid}")]
        public async Task<IActionResult> MapBuildingUser(int userid, int buildingid)
        {
            var result = await _buildingUserService.MapBuildingUser(userid, buildingid);
                return Ok(result);
        }
    }
}
