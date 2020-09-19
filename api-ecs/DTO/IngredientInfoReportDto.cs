using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class IngredientInfoReportDto
    {
        public IngredientInfoReportDto()
        {
            this.CreatedTime = DateTime.Now;
            this.CreatedDate = DateTime.Now;
        }
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public string SupplierName { get; set; }
        public string Batch { get; set; }
        public DateTime ExpiredTime { get; set; }
        public int Qty { get; set; }
        public int IngredientInfoID { get; set; }
        public string Consumption { get; set; }

    }
}
