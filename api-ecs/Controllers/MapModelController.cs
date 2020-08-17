using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EC_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapModelController : ControllerBase
    {
        private readonly IMapModelService _mapModelService;
        public MapModelController(IMapModelService brandService)
        {
            _mapModelService = brandService;
        }

        [HttpGet("GetModelNos/{modelNameID}")]
        public async Task<IActionResult> GetModels(int modelNameID)
        {
            var result = await _mapModelService.GetModelNos(modelNameID);
            return Ok(result);
        }
       
        [HttpPost]
        public async Task<IActionResult> MapMapModel(MapModel mapModel)
        {
            if (await _mapModelService.MapMapModel(mapModel))
            {
                return NoContent();
            }

            throw new Exception("MapModel failed on save");
        }
        [HttpGet("{modelNameID}/{modelNoID}/delete")]
        public async Task<IActionResult> Delete(int modelNameID, int modelNoID)
        {
            if (await _mapModelService.Delete(modelNameID, modelNoID))
            {
                return NoContent();
            }

            throw new Exception("Delete the MapModel failed on save");
        }
    }
}