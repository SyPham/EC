using System;
using System.Security.Claims;
using System.Threading.Tasks;
using EC_API.Helpers;
using EC_API._Services.Interface;
using EC_API.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.IO;
using EC_API.Helpers.Enum;

namespace EC_API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ModelNoController : ControllerBase
    {
        private readonly IModelNoService _modelNoService;
        public ModelNoController(IModelNoService modelNoService)
        {
            _modelNoService = modelNoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var modelNos = await _modelNoService.GetAllAsync();
            return Ok(modelNos);
        }
        [HttpGet("{modelNameID}")]
        public async Task<IActionResult> GetModelNoByModelNameID(int modelNameID)
        {
            var modelNos = await _modelNoService.GetModelNoByModelNameID(modelNameID);
            return Ok(modelNos);
        }
        [HttpPost]
        public async Task<IActionResult> Create(ModelNoDto create)
        {

            if (_modelNoService.GetById(create.ID) != null)
                return BadRequest("Model No ID already exists!");
            if (await _modelNoService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the model no failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(ModelNoDto update)
        {
            if (await _modelNoService.Update(update))
                return NoContent();
            return BadRequest($"Updating model no {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _modelNoService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the model no");
        }
    }
}