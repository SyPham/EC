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
    public class GlueIngredientController : ControllerBase
    {
        private readonly IGlueIngredientService _glueIngredientService;
        public GlueIngredientController(IGlueIngredientService brandService)
        {
            _glueIngredientService = brandService;
        }

        [HttpGet("GetAllGlues/{page}/{pageSize}")]
        public async Task<IActionResult> GetGluesWithPaginations(int page, int pageSize)
        {
            PaginationParams param = new PaginationParams
            {
                PageNumber = page,
                PageSize = pageSize
            };
            var brands = await _glueIngredientService.GetGluesWithPaginations(param);
            Response.AddPagination(brands.CurrentPage, brands.PageSize, brands.TotalCount, brands.TotalPages);
            return Ok(brands);
        }

        [HttpGet("GetAllIngredients/{glueid}/{page}/{pageSize}")]
        public async Task<IActionResult> GetIngredientsWithPaginations(int glueid, int page, int pageSize)
        {
            PaginationParams param = new PaginationParams
            {
                PageNumber = page,
                PageSize = pageSize,
            };
            var brands = await _glueIngredientService.GetIngredientsWithPaginations(param, glueid);
            Response.AddPagination(brands.CurrentPage, brands.PageSize, brands.TotalCount, brands.TotalPages);
            return Ok(brands);
        }

        [HttpGet("GetIngredientsByGlueID/{glueid}")]
        [HttpGet("GetIngredientsByGlueID/{glueid}/{supid}")]
        public async Task<IActionResult> GetIngredientsWithPaginations(int glueid,int supid)
        {
            var brands = await _glueIngredientService.GetIngredientsByGlueID(glueid, supid);
            return Ok(brands);
        }

        //[HttpGet("GetIngredientsByGlueID/{glueid}")]
        //public async Task<IActionResult> GetIngredientsWithPaginations(int glueid)
        //{
        //    var brands = await _glueIngredientService.GetIngredientsByGlueID1(glueid);
        //    return Ok(brands);
        //}

        [HttpGet("{glueid}/detail")]
        public IActionResult Detail(int glueid)
        {
            var brands =  _glueIngredientService.GetGlueIngredientDetail(glueid);
            return Ok(brands);
        }

        //[HttpGet("GetIngredientsByGlueID/{glueid}")]
        //public async Task<IActionResult> GetIngredientsWithPaginations(int glueid)
        //{
        //    var brands = await _glueIngredientService.GetIngredientsByGlueID(glueid);
        //    return Ok(brands);
        //}
        [HttpPost("MapGlueIngredient")]
        public async Task<IActionResult> MapGlueIngredient(GlueIngredient glueIngredient)
        {

            glueIngredient.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            if (await _glueIngredientService.MapGlueIngredient(glueIngredient))
            {
                return NoContent();
            }
            else
            {
                return NoContent();
            }
            //throw new Exception("Creating the brand failed on save");
        }

        [HttpGet("{glueid}/{ingredient}/delete")]
        public async Task<IActionResult> Delete(int glueid, int ingredient)
        {

            //if (await _glueIngredientService.CheckExists(glueIngredientDto.ID))
            //    return BadRequest("Glue ID already exists!");
            //if (await _glueIngredientService.CheckBarCodeExists(glueIngredientDto.Code))
            //    return BadRequest("Barcode already exists!");
            ////var username = User.FindFirst(ClaimTypes.Name).Value;
            ////glueIngredientDto.Updated_By = username;
            //if(_glueIngredientService.get)
            //if (await _glueIngredientService.Delete(glueid, ingredient))
            //{
            //    return NoContent();
            //}
            if (await _glueIngredientService.Delete(glueid, ingredient))
            {
                return NoContent();
            }

            throw new Exception("Delete the brand failed on save");
        }

        [HttpPut("EditPercentage")]
        public async Task<IActionResult> Update(GlueIngredientForEditDto update)
        {
            if (await _glueIngredientService.EditPercentage(update.GlueID, update.IngredientID, update.Percentage))
                return NoContent();
            return BadRequest($"Updating glue Ingredient{update.GlueID} and {update.IngredientID} failed on save");
        }

        [HttpPut("EditAllow")]
        public async Task<IActionResult> UpdateAllow(GlueIngredientForEditDto1 update)
        {
            if (await _glueIngredientService.EditAllow(update.GlueID, update.IngredientID, update.Allow))
                return NoContent();
            return BadRequest($"Updating glue Ingredient{update.GlueID} and {update.IngredientID} failed on save");
        }

    }
}