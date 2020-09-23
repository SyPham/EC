using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    [Table("rawdata")]
    public class RawData
    {
        public RawData()
        {
        }
        [Column("id")]
        public int ID { get; set; }
        [Column("machineID")]
        public string MachineID { get; set; }
        public int RPM { get; set; }
        [Column("duration")]
        public int Duration { get; set; }
        [Column("sequence")]
        public int Sequence { get; set; }
        [Column("mixingInfoID")]
        public int MixingInfoID { get; set; }
        [Column("createddatetime")]
        public DateTime CreatedDateTime { get; set; }
    }
}
