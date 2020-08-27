using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using EC_API._Repositories.Interface;
using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;

namespace EC_API._Services.Services
{
    public class MixingService : IMixingService
    {
        private readonly IMixingRepository _repoMixing;

        public MixingService(IMixingRepository repoMixing)
        {
            _repoMixing = repoMixing;
        }

        public async Task<bool> AddOrUpdate(int mixingInfoID)
        {
            var isValid = await _repoMixing.FindAll().CountAsync(x => x.MachineID == "EM001");
            if (isValid > 0)
            {
                // update
                var item = await _repoMixing.FindAll().FirstOrDefaultAsync();
                item.MixingInfoID = mixingInfoID;
                return await _repoMixing.SaveAll();

            }
            else
            {
                // add new
                _repoMixing.Add(new Mixing { MixingInfoID = mixingInfoID, MachineID = "EM001" });
                return await _repoMixing.SaveAll();
            }
        }
    }
}