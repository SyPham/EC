using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Part
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Glue> Glues { get; set; }

    }
}
