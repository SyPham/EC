using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Ingredient
    {
        public Ingredient()
        {
            this.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
        }
        public int ID { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string CreatedDate { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public string MaterialNO { get; set; }
        public string Unit { get; set; }
        public int SupplierID { get; set; }
        public Supplier Supplier { get; set; }
        public string VOC { get; set; }
        public int CreatedBy { get; set; }
        public int ExpiredTime { get; set; }
        public DateTime ExpiredDate { get; set; }
        public bool isShow { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }

    }
}
