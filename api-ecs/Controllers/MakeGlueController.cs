using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MakeGlueController : ControllerBase
    {
        private readonly IGlueIngredientService _glueIngredientService;
        private readonly IMixingInfoService _mixingInfoService;
        private readonly IMakeGlueService _makeGlueService;
        public MakeGlueController(IMakeGlueService makeGlueService, IGlueIngredientService glueIngredientService, IMixingInfoService mixingInfoService)
        {
            _makeGlueService = makeGlueService;
            _glueIngredientService = glueIngredientService;
            _mixingInfoService = mixingInfoService;
        }


        [HttpGet("getGlueIngredientByGlueID/{glueid}", Name = "getGlueIngredientByGlueID")]
        public async Task<IActionResult> getGlueIngredientByGlueID(int glueid)
        {
            var obj = await _makeGlueService.GetGlueWithIngredients(glueid);
            return Ok(obj);
        }
        [HttpGet("GetAllGlues", Name = "GetAllGlues")]
        public async Task<IActionResult> GetAllGlues()
        {
            var glues = await _makeGlueService.GetAllGlues();
            return Ok(glues);
        }

        [HttpPost("{code}", Name = "MakeGlueByCode")]
        public async Task<IActionResult> MakeGlue(string code)
        {
            var item = await _makeGlueService.MakeGlue(code);
            return Ok(item);
        }

        [HttpGet("GetGlueWithIngredientByGlueCode/{code}")]
        public async Task<IActionResult> GetGlueWithIngredientByGlueCode(string code)
        {
            var item = await _makeGlueService.GetGlueWithIngredientByGlueCode(code);
            return Ok(item);
        }
        [HttpGet("GetGlueWithIngredientByGlueName/{glueName}")]
        public async Task<IActionResult> GetGlueWithIngredientByGlueName(string glueName)
        {
            var item = await _makeGlueService.GetGlueWithIngredientByGlueName(glueName);
            return Ok(item);
        }
        [HttpGet("GetGlueWithIngredientByGlueID/{glueID}")]
        public async Task<IActionResult> GetGlueWithIngredientByGlueID(int glueID)
        {
            var item = await _makeGlueService.GetGlueWithIngredientByGlueID(glueID);
            return Ok(item);
        }
        [HttpPost("Guidance")]
        public async Task<IActionResult> Guidance(MixingInfoForCreateDto update)
        {
            return Ok(await _mixingInfoService.Mixing(update));
        }
        [HttpGet("GetMixingInfoByGlueID/{glueName}")]
        public async Task<IActionResult> GetMixingInfoByGlueName(string glueName)
        {
            return Ok(await _mixingInfoService.GetMixingInfoByGlueName(glueName));
        }
        [HttpGet("DeliveredHistory")]
        public IActionResult DeliveredHistory()
        {
            return Ok(_makeGlueService.DeliveredHistory());
        }
        
    }
}