using System.Threading.Tasks;
using EC_API.Data;
using EC_API.Models;

namespace EC_API._Repositories.Interface
{
    public interface IIngredientRepository : IECRepository<Ingredient>
    {
        Task<bool> CheckBarCodeExists(string code);
        Task<bool> CheckExists(int id);
        //viet them ham o day neu chua co trong ECRepository
    }
}