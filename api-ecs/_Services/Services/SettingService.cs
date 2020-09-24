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
        public async Task<object> GetSettingByBuilding(int buildingID)
        {
            return await _repoSetting.FindAll().Where(x=>x.BuildingID == buildingID).ToListAsync();
        }
        public async Task<bool> Add(StirDTO model)
        {
            try
            {
                var stir = _mapper.Map<Stir>(model);
                _repoStir.Add(stir);
                return await _repoStir.SaveAll();
                
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }
        public async Task<bool> Update(StirDTO model)
        {
            try
            {
                var item = await _repoStir.FindAll().FirstOrDefaultAsync(x => x.ID == model.ID);
                if (item == null) 
                    return false;
                item.RPM = model.RPM;
                item.Status = model.Status;
                item.TotalMinutes = model.TotalMinutes;
                _repoStir.Update(item);
                return await _repoStir.SaveAll();

            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<bool> UpdateSetting(SettingDTO model)
        {
            try
            {
                var setting = _mapper.Map<Setting>(model);
                _repoSetting.Update(setting);
                return await _repoSetting.SaveAll();
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<bool> AddSetting(SettingDTO model)
        {
            try
            {
                var setting = _mapper.Map<Setting>(model);
                _repoSetting.Add(setting);
                return await _repoSetting.SaveAll();

            }
            catch (System.Exception)
            {

                throw;
            }
        }

        public async Task<bool> DeleteSetting(int id)
        {
            try
            {
                var item = await _repoStir.FindAll().FirstOrDefaultAsync(x => x.ID == id);
                if (item == null)
                    return false;
                _repoStir.Remove(item);
                return await _repoStir.SaveAll();

            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}