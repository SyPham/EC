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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetPlans([FromQuery] PaginationParams param)
        {
            var plans = await _commentService.GetWithPaginations(param);
            Response.AddPagination(plans.CurrentPage, plans.PageSize, plans.TotalCount, plans.TotalPages);
            return Ok(plans);
        }

        [HttpGet(Name = "GetComments")]
        public async Task<IActionResult> GetAll()
        {
            var plans = await _commentService.GetAllAsync();
            return Ok(plans);
        }
        [HttpGet("{BPFCEstablishID}")]
        public async Task<IActionResult> GetAllCommentByBPFCEstablishID(int BPFCEstablishID)
        {
            var plans = await _commentService.GetAllCommentByBPFCEstablishID(BPFCEstablishID);
            return Ok(plans);
        }

        [HttpGet("{text}")]
        public async Task<IActionResult> Search([FromQuery] PaginationParams param, string text)
        {
            var lists = await _commentService.Search(param, text);
            Response.AddPagination(lists.CurrentPage, lists.PageSize, lists.TotalCount, lists.TotalPages);
            return Ok(lists);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CommentDto create)
        {

            if (_commentService.GetById(create.ID) != null)
                return BadRequest("Comment ID already exists!");
            create.CreatedDate = DateTime.Now;
            if (await _commentService.Add(create))
            {
                return NoContent();
            }

            throw new Exception("Creating the comment failed on save");
        }

        [HttpPut]
        public async Task<IActionResult> Update(CommentDto update)
        {
            if (await _commentService.Update(update))
                return NoContent();
            return BadRequest($"Updating the comment {update.ID} failed on save");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (await _commentService.Delete(id))
                return NoContent();
            throw new Exception("Error deleting the comment");
        }
    }
}
