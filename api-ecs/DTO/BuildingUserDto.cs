using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class BuildingUserDto
    {
        public BuildingUserDto()
        {
            CreatedDate = DateTime.Now;
        }

        public int UserID { get; set; }
        public int BuildingID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
