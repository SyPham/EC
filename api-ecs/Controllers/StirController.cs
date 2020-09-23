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
    public class StirController : ControllerBase
    {
        private readonly IMixingInfoService _mixingInfoService;
        public StirController(IMixingInfoService mixingInfoService)
        {
            _mixingInfoService = mixingInfoService;
        }
        [HttpGet("{glueName}")]
        public async Task<IActionResult> GetStirInfo(string glueName)
        {
            return Ok(await _mixingInfoService.Stir(glueName));
        }
        [HttpGet("{mixingInfoID}/{building}/{start}/{end}")]
        public async Task<IActionResult> GetRPM(int mixingInfoID, string building, string start, string end)
        {
            return Ok(await _mixingInfoService.GetRPM(mixingInfoID, building, start, end));
        }
    }
}
