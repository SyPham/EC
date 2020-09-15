using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class UpdateConsumpDto
    {
        public string qrCode { get; set; }
        public string batch { get; set; }
        public string consump { get; set; }
        public string buildingName { get; set; }
    }
}
