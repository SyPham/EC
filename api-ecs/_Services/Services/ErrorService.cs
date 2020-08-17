using EC_API._Services.Interface;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API._Services.Services
{
    public class ErrorService : IErrorService
    {
        public void Log(string error)
        {
            File.WriteAllText("LocalErrors.txt", error);
        }
    }
}
