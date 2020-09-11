using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class TroubleshootingDto
    {
        public int IngredientID { get; set; }
        public string Ingredient { get; set; }
        public string GlueName { get; set; }
        public string Batch { get; set; }
        public string ModelName { get; set; }
        public string ModelNo { get; set; }
        public string ArticleNo { get; set; }
        public string Process { get; set; }
        public string Line { get; set; }
        public int LineID { get; set; }
        public DateTime MixDate { get; set; }
        public DateTime DueDate { get; set; }
    }
    
}
