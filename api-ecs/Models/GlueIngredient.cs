using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class GlueIngredient
    {
        public GlueIngredient()
        {
            this.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss tt");
        }

        public int ID { get; set; }
        public int GlueID { get; set; } // Ma Keo
        public int IngredientID { get; set; } //Thanh phan
        public int Allow { get; set; }
        public int Percentage { get; set; } // Ty le phan tram
        public string CreatedDate { get; set; } // Ngay pha

        public string Position { get; set; }
        public Glue Glue { get; set; }
        public Ingredient Ingredient { get; set; }
    }
}
