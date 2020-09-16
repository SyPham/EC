using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class IngredientInfo
    {
        public IngredientInfo()
        {
            this.CreatedDate = DateTime.Now;
            //this.CreatedTime = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
            this.CreatedTime = DateTime.Now;

        }
        public int ID { get; set; }
        public int IngredientID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime CreatedTime { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public string SupplierName { get; set; }
        public string Batch {get; set ;}
        public int ExpiredTime { get; set; }
        public int Qty { get; set; }
        public string Consumption { get; set; }
        public int UserID { get; set; }
        public string BuildingName { get; set; }

        public bool Status { get; set; }

    }
}
