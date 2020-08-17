using EC_API.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Interface
{
    public interface IUserDetailService : IECService<UserDetailDto>
    {
        Task<List<ModelNoForMapModelDto>> GetModelNos(int modelNameID);
        Task<bool> MapUserDetailDto(UserDetailDto mapModel);
        Task<bool> Delete(int userId, int lineID);
    }
}
