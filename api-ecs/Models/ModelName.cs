using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class ModelName
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<BPFCEstablish> BPFCEstablishes { get; set; }
        public ICollection<ModelNo> ModelNos { get; set; }
    }
}
