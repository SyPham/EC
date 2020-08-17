using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class GlueIngredientDetailDto
    {
        public int ID { get; set; }
        public int GlueID { get; set; }
        public int IngredientID { get; set; }
        public string GlueName { get; set; }
        public string IngredientName { get; set; }
        public string Position { get; set; }
        public int Percentage { get; set; }
        public int Allow { get; set; }
        public int ExpiredTime { get; set; }
        public string CreatedDate { get; set; }
    }
}
