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
    public class ProcessService : IProcessService
    {

        private readonly IProcessRepository _repoProcess;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public ProcessService(IProcessRepository repoProcess, IMapper mapper, MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _repoProcess = repoProcess;

        }

        public async Task<bool> Add(ProcessDto model)
        {
            var artProcess = _mapper.Map<Process>(model);
            _repoProcess.Add(artProcess);
            return await _repoProcess.SaveAll();
        }


        public async Task<bool> Delete(object id)
        {
            var ArtProcess = _repoProcess.FindById(id);
            _repoProcess.Remove(ArtProcess);
            return await _repoProcess.SaveAll();
        }

        public async Task<bool> Update(ProcessDto model)
        {
            var artProcess = _mapper.Map<Process>(model);
            _repoProcess.Update(artProcess);
            return await _repoProcess.SaveAll();
        }
        public async Task<List<ProcessDto>> GetAllAsync()
        {
            return await _repoProcess.FindAll().ProjectTo<ProcessDto>(_configMapper).OrderBy(x => x.ID).ToListAsync();
        }


        public Task<PagedList<ProcessDto>> GetWithPaginations(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<ProcessDto>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public ProcessDto GetById(object id)
        {
            throw new NotImplementedException();
        }
    }
}