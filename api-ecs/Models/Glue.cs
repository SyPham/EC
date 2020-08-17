using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Glue
    {
        public Glue()
        {
            this.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
        }
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Consumption { get; set; }
        public string CreatedDate { get; set; }

        public int? MaterialID { get; set; }
        public int ExpiredTime { get; set; }
        public int? KindID { get; set; }
        public int? PartID { get; set; }
        public int CreatedBy { get; set; }
        public int BPFCEstablishID { get; set; }
        [ForeignKey("KindID")]
        public Kind Kind { get; set; } // kind
        [ForeignKey("PartID")]
        public Part Part { get; set; } // part
        [ForeignKey("MaterialID")]
        public Material Material { get; set; }
        public BPFCEstablish BPFCEstablish { get; set; }
        public ICollection<GlueIngredient> GlueIngredients { get; set; }
        public ICollection<MixingInfo> MixingInfos { get; set; }
    }
}
