using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class SettingDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string MachineType { get; set; }
        public string MachineCode { get; set; }
        public int MinRPM { get; set; }
        public int MaxRPM { get; set; }
        public int BuildingID { get; set; }
    }
}
