using System.Threading.Tasks;
using EC_API.Models;

namespace EC_API.Data
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
    }
}