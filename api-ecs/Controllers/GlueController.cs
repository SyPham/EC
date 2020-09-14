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
    public class GlueController : ControllerBase
    {
        private readonly IGlueService _glueService;
        public GlueController(IGlueService brandService)
        {
            _glueService = brandService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGlues([FromQuery]PaginationParams param)
        {
            var glues = await _glueService.GetWithPaginations(param);
            Response.AddPagination(glues.CurrentPage, glues.PageSize, glues.TotalCount, glues.TotalPages);
            return Ok(glues);
        }

        [HttpGet(Name = "GetGlues")]
        public async Task<IActionResult> GetAll()
        {
            var glues = await _glueService.GetAllAsync();
            return Ok(glues);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllGluesByBPFCID(int id)
        {
            var brands = await _glueService.GetAllGluesByBPFCID(id);
            return Ok(brands);
        }

        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var glues = await _glueService.Search(param, text);
            Response.AddPagination(glues.CurrentPage, glues.PageSize, glues.TotalCount, glues.TotalPages);
            return Ok(glues);
        }

        [HttpPost]
        public async Task<IActionResult> Create(GlueCreateDto glueIngredientDto)
        {

            if (await _glueService.CheckExists(glueIngredientDto.ID))
                return BadRequest("Glue ID already exists!");
            if (await _glueService.CheckBarCodeExists(glueIngredientDto.Code))
                return BadRequest("Barcode already exists!");
            //var username = User.FindFirst(ClaimTypes.Name).Value;
            glueIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _glueService.Add(glueIngredientDto))
            {
                return NoContent();
            }

            throw new Exception("Creating the glue failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(GlueCreateDto glueIngredientDto)
        {

            glueIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _glueService.Update(glueIngredientDto))
            {
                return NoContent();

            }
            return BadRequest($"Updating brand {glueIngredientDto.ID} failed on save");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateChemical(GlueCreateDto glueIngredientDto)
        {

            glueIngredientDto.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _glueService.UpdateChemical(glueIngredientDto))
            {
                return NoContent();

            }
            return BadRequest($"Updating glue {glueIngredientDto.ID} failed on save");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _glueService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the brand");
        }
    }
}