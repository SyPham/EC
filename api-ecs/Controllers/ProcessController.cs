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
    public class ProcessController : ControllerBase
    {
        private readonly IProcessService _processService;
        public ProcessController(IProcessService processService)
        {
            _processService = processService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var processes = await _processService.GetAllAsync();
            return Ok(processes);
        }
     
    }
}
