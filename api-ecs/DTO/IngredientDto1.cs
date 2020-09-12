using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class IngredientDto1
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string CreatedDate { get; set; }
        public int Percentage { get; set; }
        public bool Status { get; set; }
        public string MaterialNO { get; set; }
        public double Unit { get; set; }
        public double VOC { get; set; }
        public string Supplier { get; set; }
        public int SupplierID { get; set; }
        public int ExpiredTime { get; set; }
        public DateTime ManufacturingDate { get; set; }


        public string Position { get; set; }

    }
}
