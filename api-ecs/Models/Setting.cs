using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Setting
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Name { get; set; }
        public string MachineType { get; set; }
        public string MachineCode { get; set; }
        public int MinRPM { get; set; }
        public int MaxRPM { get; set; }
        public int BuildingID { get; set; }
        [ForeignKey("BuildingID")]
        public Building Building { get; set; }
    }
}
