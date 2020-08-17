using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class IngredientForImportExcelDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int SupplierID { get; set; }
        public int CreatedBy { get; set; }
        public int ExpiredTime { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
