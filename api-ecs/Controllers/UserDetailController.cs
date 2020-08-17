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
    public class UserDetailController : ControllerBase
    {
        private readonly IUserDetailService _userDetailService;
        public UserDetailController(IUserDetailService userDetailService)
        {
            _userDetailService = userDetailService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserDetails([FromQuery]PaginationParams param)
        {
            var userDetails = await _userDetailService.GetWithPaginations(param);
            Response.AddPagination(userDetails.CurrentPage,userDetails.PageSize,userDetails.TotalCount,userDetails.TotalPages);
            return Ok(userDetails);
        }

        [HttpGet(Name = "GetUserDetails")]
        public async Task<IActionResult> GetAll()
        {
            var userDetails = await _userDetailService.GetAllAsync();
            return Ok(userDetails);
        }
        [HttpGet("{id}",Name = "GetUserSingle")]
        public IActionResult Single(int id)
        {
            var userDetails =  _userDetailService.GetById(id);
            return Ok(userDetails);
        }
        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery]PaginationParams param, string text)
        {
            var lists = await _userDetailService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }
       
        [HttpPost]
        public async Task<IActionResult> Create(UserDetailDto create)
        {

            if (_userDetailService.GetById(create.ID).ID > 0)
                return BadRequest("UserDetail ID already exists!");
            if (await _userDetailService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the user detail failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(UserDetailDto update)
        {
            if (await _userDetailService.Update(update))
                return NoContent();
            return BadRequest($"Updating user detail {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _userDetailService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the user detail");
        }
    }
}