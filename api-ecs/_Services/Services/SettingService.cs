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
    public class SettingService : ISettingService
    {
        private readonly IMixingRepository _repoMixing;
        private readonly IMixingInfoRepository _repoMixingInfo;
        private readonly ISettingRepository _repoSetting;
        private readonly IStirRepository _repoStir;
        private readonly IMapper _mapper;
        public SettingService(IMixingInfoRepository repoMixingInfo, IStirRepository repoStir,IMixingRepository repoMixing , IMapper mapper , ISettingRepository repoSetting)
        {
            _repoMixing = repoMixing ;
            _repoSetting = repoSetting ;
            _repoMixingInfo = repoMixingInfo;
            _repoStir = repoStir;
            _mapper = mapper ;
        }

        public async Task<object> GetAllAsync()
        {
            return await _repoSetting.FindAll().ToListAsync();

        }

        public async Task<bool> Add(StirDTO model)
        {
            try
            {
                var mixingInfoID = _repoMixingInfo.FindAll().FirstOrDefault(x => x.GlueID == model.GlueID).ID;
                model.MixingInfoID = mixingInfoID ;
                var Stir = _mapper.Map<Stir>(model);
                _repoStir.Add(Stir);
                return await _repoStir.SaveAll();
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
       
    }
}