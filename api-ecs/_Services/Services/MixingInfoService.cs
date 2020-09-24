using AutoMapper;
using AutoMapper.QueryableExtensions;
using EC_API._Repositories.Interface;
using EC_API._Services.Interface;
using EC_API.DTO;
using EC_API.Helpers;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Services
{
    public class MixingInfoService : IMixingInfoService
    {
        private readonly IMixingInfoRepository _repoMixingInfor;
        private readonly IMixingService _repoMixing;
        private readonly IGlueRepository _repoGlue;
        private readonly IRawDataRepository _repoRawData;
        private readonly IStirRepository _repoStir;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public MixingInfoService(
            IMixingInfoRepository repoMixingInfor,
            IMixingService repoMixing,
            IRawDataRepository repoRawData,
            IMapper mapper, IGlueRepository repoGlue,
            IStirRepository repoStir,
            MapperConfiguration configMapper)
        {
            _repoMixingInfor = repoMixingInfor;
            _repoMixing = repoMixing;
            _repoGlue = repoGlue;
            _mapper = mapper;
            _repoStir = repoStir;
            _repoRawData = repoRawData;
            _configMapper = configMapper;
        }
    
        public async Task<MixingInfo> Mixing(MixingInfoForCreateDto mixing)
        {
            try
            {
                var item = _mapper.Map<MixingInfoForCreateDto, MixingInfo>(mixing);
                item.Code = CodeUtility.RandomString(8);
                item.CreatedTime = DateTime.Now;
                var glue = await _repoGlue.FindAll().FirstOrDefaultAsync(x => x.isShow == true && x.ID == mixing.GlueID);
                item.ExpiredTime = DateTime.Now.AddMinutes(glue.ExpiredTime);
                _repoMixingInfor.Add(item);
                await _repoMixingInfor.SaveAll();
                await _repoMixing.AddOrUpdate(item.ID);
                return item;
            }
            catch
            {
                return new MixingInfo();
            }
        }

        public async Task<List<MixingInfoDto>> GetMixingInfoByGlueID(int glueID)
        {
           var gluename = _repoGlue.FindById(glueID).Name;
            return await _repoMixingInfor.FindAll().Include(x => x.Glue).Where(x => x.GlueName.Equals(gluename) && x.Glue.isShow == true).ProjectTo<MixingInfoDto>(_configMapper).OrderByDescending(x => x.ID).ToListAsync();
        }

        public async Task<object> Stir(string glueName)
        {
            var currentDate = DateTime.Now.Date;
            var model = from a in _repoMixingInfor.FindAll().Where(x=> x.GlueName.Equals(glueName) && x.CreatedTime.Date == currentDate)
                        join b in _repoStir.FindAll().Where(x => x.GlueName.Equals(glueName) && x.CreatedTime.Date == currentDate) on a.ID equals b.MixingInfoID into gj
                        from ab in gj.DefaultIfEmpty()
                        select new {
                            a.ID,
                            StirID = ab.ID,
                            a.GlueName,
                            a.ChemicalA,
                            a.ChemicalB,
                            a.ChemicalC,
                            a.ChemicalD,
                            a.ChemicalE,
                            a.CreatedTime,
                            ab.StartTime,
                            ab.EndTime,
                            ab.SettingID,
                            ab.Status,
                            ab.RPM,
                            ab.TotalMinutes,
                            MixingStatus = ab.StartTime != null ? true :false
                        };
           return await model.ToListAsync();
        }

        public async Task<object> GetRPM(int mixingInfoID, string building, string startTime, string endTime)
        {
            var start = Convert.ToDateTime(startTime);
            var end = Convert.ToDateTime(endTime);
            TimeSpan minutes = new TimeSpan();
            var model = await _repoRawData.FindAll().Where(x=> x.MixingInfoID == mixingInfoID && x.CreatedDateTime >= start && x.CreatedDateTime <= end).Select(x=> new{x.RPM , x.CreatedDateTime} ).OrderByDescending(x=> x.CreatedDateTime).ToListAsync();
           if (model.Count() > 0) {
                var max = model.Select(x => x.CreatedDateTime).FirstOrDefault();
                var min = model.Select(x => x.CreatedDateTime).LastOrDefault();
                if (min != DateTime.MinValue && max != DateTime.MinValue)
                {
                    minutes = max - min;
                }
                return new
                {
                    rpm = Math.Round(model.Select(x => x.RPM).Average()),
                    totalMinutes = Math.Round(minutes.TotalMinutes, 2),
                    minutes
                };
           }
            return new
            {
                rpm = 0,
                totalMinutes = 0,
                minutes
            };
        }
    }
}
