using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    [Table("mixing")]
    public class Mixing
    {
        public Mixing()
        {
        }

        [Column("id")]
        public int ID { get; set; }
        [Column("machineID")]
        public string MachineID { get; set; }
        [Column("mixingInfoID")]
        public int MixingInfoID { get; set; }

    }
}
