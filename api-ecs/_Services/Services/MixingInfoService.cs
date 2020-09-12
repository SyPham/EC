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
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;

        public MixingInfoService(
            IMixingInfoRepository repoMixingInfor,
            IMixingService repoMixing,
            IMapper mapper, IGlueRepository repoGlue,
            MapperConfiguration configMapper)
        {
            _repoMixingInfor = repoMixingInfor;
            _repoMixing = repoMixing;
            _repoGlue = repoGlue;
            _mapper = mapper;
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
            return await _repoMixingInfor.FindAll().Include(x => x.Glue).Where(x => x.GlueID == glueID && x.Glue.isShow == true).ProjectTo<MixingInfoDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }
    }
}
