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
    public class SettingController : ControllerBase
    {
        private readonly IKindService _kindService;
        private readonly ISettingService _settingService;
        public SettingController(IKindService kindService , ISettingService settingService)
        {
            _kindService = kindService;
            _settingService = settingService;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllSetting()
        {
            var settings = await _settingService.GetAllAsync();
            return Ok(settings);
        }

        [HttpGet("{buildingID}")]
        public async Task<IActionResult> GetSettingByBuilding(int buildingID)
        {
            var settings = await _settingService.GetSettingByBuilding(buildingID);
            return Ok(settings);
        }

        [HttpPost]
        public async Task<IActionResult> Create(StirDTO create)
        {

            //create.CreatedDate = DateTime.Now;
            if (await _settingService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the Stir failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(StirDTO update)
        {
            if (await _settingService.Update(update))
                return NoContent();
            return BadRequest($"Updating stir {update.ID} failed on save");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateSetting(SettingDTO update)
        {
            if (await _settingService.UpdateSetting(update))
                return NoContent();
            return BadRequest($"Updating setting {update.ID} failed on save");
        }
        [HttpPost]
        public async Task<IActionResult> CreateSetting(SettingDTO create)
        {

            //create.CreatedDate = DateTime.Now;
            if (await _settingService.AddSetting(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the setting failed on save");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSetting(int id)
        {
            var settings = await _settingService.DeleteSetting(id);
            if (settings)
            {
                return NoContent();
            }

            throw new Exception("Deleting the setting failed on save");
        }
    }
}