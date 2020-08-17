using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class GlueDto
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Consumption { get; set; }
        public string CreatedDate { get; set; }
        public int PartNameID { get; set; }
        public int ExpiredTime { get; set; }
        public int CreatedBy { get; set; }
        public int BPFCEstablishID { get; set; }
        public int KindID { get; set; }
        public int PartID { get; set; }
        public int MaterialID { get; set; }
        public  List<IngredientDto> Ingredients { get; set; }
    }
}
