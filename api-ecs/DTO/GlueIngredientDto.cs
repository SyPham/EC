using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class GlueIngredientDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public int Percentage { get; set; }
        public string Position { get; set; }
        public int Allow { get; set; }
        public Ingredient Ingredient { get; set; }
    }
   
}
