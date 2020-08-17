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
    public class BuildingUserService : IBuildingUserService
    {
        private readonly IBuildingUserRepository _buildingUserRepository;
        private readonly IBuildingRepository _buildingRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _configMapper;
        public BuildingUserService(IBuildingUserRepository buildingUserRepository,
            IBuildingRepository buildingRepository,
            IMapper mapper,
            MapperConfiguration configMapper)
        {
            _configMapper = configMapper;
            _mapper = mapper;
            _buildingUserRepository = buildingUserRepository;
            _buildingRepository = buildingRepository;
        }

        public Task<bool> Add(BuildingUserDto model)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(object id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BuildingUserDto>> GetAllAsync()
        {
            return await _buildingUserRepository.FindAll().ProjectTo<BuildingUserDto>(_configMapper).ToListAsync();

        }

        public async Task<object> GetBuildingByUserID(int userid)
        {
            var model =await _buildingUserRepository.FindAll().FirstOrDefaultAsync(x => x.UserID == userid);
            return _buildingRepository.FindById(model.BuildingID);
        }

        public async Task<List<BuildingUserDto>> GetBuildingUserByBuildingID(int buildingID)
        {
            return await _buildingUserRepository.FindAll().Where(x=>x.BuildingID == buildingID).ProjectTo<BuildingUserDto>(_configMapper).ToListAsync();
        }

        public BuildingUserDto GetById(object id)
        {
            throw new NotImplementedException();
        }

        public Task<PagedList<BuildingUserDto>> GetWithPaginations(PaginationParams param)
        {
            throw new NotImplementedException();
        }

        public async Task<object> MapBuildingUser(int userid, int buildingid)
        {
            var item = await _buildingUserRepository.FindAll().FirstOrDefaultAsync(x => x.UserID == userid && x.BuildingID == buildingid);
            if (item == null)
            {
                _buildingUserRepository.Add(new BuildingUser
                {
                    UserID = userid,
                    BuildingID = buildingid,
                    CreatedDate = DateTime.Now
                });
                try
                {
                    await _buildingUserRepository.SaveAll();
                    return new
                    {
                        status = true,
                        message = "Mapping Successfully!"
                    };
                }
                catch (Exception)
                {
                    return new
                    {
                        status = false,
                        message = "Failed on save!"
                    };
                }
            }
            else
            {
                item.UserID = userid;
                item.BuildingID = buildingid;
                item.CreatedDate = DateTime.Now;

                try
                {
                    await _buildingUserRepository.SaveAll();
                    return new
                    {
                        status = true,
                        message = "Mapping Successfully!"
                    };
                }
                catch (Exception)
                {
                    return new
                    {
                        status = false,
                        message = "Failed on save!"
                    };
                }
            }
        }

        public async Task<object> MappingUserWithBuilding(BuildingUserDto buildingUserDto)
        {
            var item =await _buildingUserRepository.FindAll().FirstOrDefaultAsync(x => x.UserID == buildingUserDto.UserID && x.BuildingID == buildingUserDto.BuildingID);
            if (item == null)
            {
                _buildingUserRepository.Add(new BuildingUser { 
                    UserID = buildingUserDto.UserID,
                    BuildingID = buildingUserDto.BuildingID
                });
                try
                {
                   await _buildingUserRepository.SaveAll();
                    return new
                    {
                        status = true,
                        message = "Mapping Successfully!"
                    };
                }
                catch (Exception)
                {
                    return new
                    {
                        status = false,
                        message = "Failed on save!"
                    };
                }
            } else
            {

                return new
                {
                    status = false,
                    message = "The User belonged with other building!"
                };
            }
        }

        public async Task<object> RemoveBuildingUser(BuildingUserDto buildingUserDto)
        {
            var item = await _buildingUserRepository.FindAll().FirstOrDefaultAsync(x => x.UserID == buildingUserDto.UserID && x.BuildingID == buildingUserDto.BuildingID);
            if (item != null)
            {
                _buildingUserRepository.Remove(item);
                try
                {
                    await _buildingUserRepository.SaveAll();
                    return new
                    {
                        status = true,
                        message = "Delete Successfully!"
                    };
                }
                catch (Exception)
                {
                    return new
                    {
                        status = false,
                        message = "Failed on delete!"
                    };
                }
            }
            else
            {

                return new
                {
                    status = false,
                    message = ""
                };
            }
        }

        public Task<PagedList<BuildingUserDto>> Search(PaginationParams param, object text)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(BuildingUserDto model)
        {
            throw new NotImplementedException();
        }
    }
}
