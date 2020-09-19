using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EC_API.Helpers;

namespace EC_API.DTO
{
    public class IngredientDto
    {
        public IngredientDto()
        {
            this.Name = this.Name.ToSafetyString().Trim();
        }

        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string CreatedDate { get; set; }
        public int Percentage { get; set; }
        public bool Status { get; set; }
        public int SupplierID { get; set; }
        public double VOC { get; set; }
        public string Supplier { get; set; }
        
        public string Position { get; set; }
        public string MaterialNO { get; set; }
        public double Unit { get; set; }
        public int DaysToExpiration { get; set; }
        public int ExpiredTime { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public bool isShow { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

        public int Allow { get; set; }

    }
}
