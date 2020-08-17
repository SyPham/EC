using System.Threading.Tasks;
using EC_API.Data;
using EC_API.Models;

namespace EC_API._Repositories.Interface
{
    public interface IGlueRepository : IECRepository<Glue>
    {
        bool Save();
        Task<bool> CheckExists(int id);
        Task<bool> CheckBarCodeExists(string code);
        //viet them ham o day neu chua co trong ECRepository
    }
}