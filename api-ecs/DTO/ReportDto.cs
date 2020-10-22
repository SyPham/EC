using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class ReportBodyDto
    {
        public PlanReportDto Plan { get; set; }
        public List<double> Ingredients { get; set; } = new List<double>();
    }
    public class ReportHeaderDto
    {
        public string Day { get; set; } = "Day";
        public string Date { get; set; } = "Date";
        public string ModelName { get; set; } = "Model Name";
        public string ModelNo { get; set; } = "Model NO";
        public string Quantity { get; set; } = "Qty";
        public string Line { get; set; } = "Line";
        public string CBD { get; set; } = "CBD U$";
        public string Real { get; set; } = "Real U$";
        public List<string> Ingredients { get; set; }
    }
    public class PlanReportDto
    {
        public int Day { get; set; }
        public double CBD { get; set; }
        public double Real { get; set; }
        public string ModelName { get; set; }
        public string ModelNo { get; set; }
        public int Quantity { get; set; }
        public string Line { get; set; }
        public DateTime Date { get; set; }

    }
    public class IngredientReportDto
    {
        public double Real { get; set; }
        public double CBD { get; set; }
        public int ID { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
    }
}
