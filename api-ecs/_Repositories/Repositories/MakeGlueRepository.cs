using System.Threading.Tasks;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EC_API.DTO;
using System.Collections.Generic;
using EC_API.Helpers;

namespace EC_API._Repositories.Repositories
{
    public class MakeGlueRepository : ECRepository<GlueIngredient>, IMakeGlueRepository
    {
        private readonly DataContext _context;
        public MakeGlueRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<object> GetGlueWithIngredientByGlueCode(string code)
        {
            var model2 = await (from a in _context.GlueIngredient
                                join b in _context.Glues on a.GlueID equals b.ID
                                join c in _context.Ingredients on a.IngredientID equals c.ID
                                select new GlueIngredientDto
                                {
                                    ID = a.GlueID,
                                    Name = b.Name,
                                    Code = b.Code,
                                    Ingredient = c,
                                    Percentage = a.Percentage
                                }).ToListAsync();
            var glues = new GlueDto();
            var list = new List<IngredientDto>();
            foreach (var item in model2)
            {
                if (item.Code.Contains(code))
                {
                    glues.ID = item.ID;
                    glues.Name = item.Name;
                    glues.Code = item.Code;

                    list.Add(new IngredientDto
                    {
                        ID = item.Ingredient.ID,
                        Name = item.Ingredient.Name,
                        Percentage = item.Percentage,
                        Code = item.Ingredient.Code,
                    });
                }

            }
            glues.Ingredients = list;
            return glues;
        }

        public async Task<object> GetGlueWithIngredientByGlueID(int glueid)
        {
            var model2 = await(from a in _context.GlueIngredient
                               join b in _context.Glues on a.GlueID equals b.ID
                               join c in _context.Ingredients on a.IngredientID equals c.ID
                               select new GlueIngredientDto
                               {
                                   ID = a.GlueID,
                                   Name = b.Name,
                                   Code = b.Code,
                                   Ingredient = c,
                                   Percentage = a.Percentage,
                                   Position = a.Position,
                                   Allow = a.Allow
                                   
                               }).ToListAsync();
            var glues = new GlueDto();
            var list = new List<IngredientDto>();
            foreach (var item in model2)
            {
                if (item.ID.Equals(glueid))
                {
                    glues.ID = item.ID;
                    glues.Name = item.Name;
                    glues.Code = item.Code;

                    list.Add(new IngredientDto
                    {
                        ID = item.Ingredient.ID,
                        Name = item.Ingredient.Name,
                        Percentage = item.Percentage,
                        Code = item.Ingredient.Code,
                        Position = item.Position,
                        Allow = item.Allow
                    });
                }

            }
            glues.Ingredients = list.OrderBy(x=>x.Position).ToList();
            return glues;
        }

        public async Task<object> GetGlueWithIngredientByGlueName(string glueName)
        {
            var model2 = await(from a in _context.GlueIngredient
                               join b in _context.Glues on a.GlueID equals b.ID
                               join c in _context.Ingredients on a.IngredientID equals c.ID
                               select new GlueIngredientDto
                               {
                                   ID = a.GlueID,
                                   Name = b.Name,
                                   Code = b.Code,
                                   Ingredient = c,
                                   Percentage = a.Percentage
                               }).ToListAsync();
            var glues = new GlueDto();
            var list = new List<IngredientDto>();
            foreach (var item in model2)
            {
                if (item.Name.Equals(glueName))
                {
                    glues.ID = item.ID;
                    glues.Name = item.Name;
                    glues.Code = item.Code;

                    list.Add(new IngredientDto
                    {
                        ID = item.Ingredient.ID,
                        Name = item.Ingredient.Name,
                        Percentage = item.Percentage,
                        Code = item.Ingredient.Code,
                    });
                }

            }
            glues.Ingredients = list.DistinctBy(x=>x.Name).ToList();
            return glues;
        }

        public async Task<object> MakeGlue(int glueid)
        {
            var model2 = await (from a in _context.GlueIngredient
                                join b in _context.Glues on a.GlueID equals b.ID
                                join c in _context.Ingredients on a.IngredientID equals c.ID
                                select new GlueIngredientDto
                                {
                                    ID = a.GlueID,
                                    Name = b.Name,
                                    Code = b.Code,
                                    Ingredient = c,
                                    Percentage = a.Percentage
                                }).ToListAsync();
            var glues = new GlueDto();
            var list = new List<IngredientDto>();
            foreach (var item in model2)
            {
                if (item.ID == glueid)
                {
                    glues.ID = item.ID;
                    glues.Name = item.Name;
                    glues.Code = item.Code;

                    list.Add(new IngredientDto
                    {
                        ID = item.Ingredient.ID,
                        Name = item.Ingredient.Name,
                        Percentage = item.Percentage,
                        Code = item.Ingredient.Code,
                    });
                }

            }
            glues.Ingredients = list;
            return glues;

        }

        public async Task<object> MakeGlue(string code)
        {
            if (code == null || code == string.Empty)
                return new IngredientDto();
            var item = await (from a in _context.GlueIngredient
                              join b in _context.Glues on a.GlueID equals b.ID
                              join c in _context.Ingredients on a.IngredientID equals c.ID
                              select new GlueIngredientDto
                              {
                                  ID = a.GlueID,
                                  Name = b.Name,
                                  Code = b.Code,
                                  Ingredient = c,
                                  Percentage = a.Percentage
                              }).FirstOrDefaultAsync(x => x.Code.Contains(code));
            var list = new List<IngredientDto>();
            var glues = new GlueDto();
            glues.ID = item.ID;
            glues.Name = item.Name;
            glues.Code = item.Code;

            list.Add(new IngredientDto
            {
                ID = item.Ingredient.ID,
                Name = item.Ingredient.Name,
                Percentage = item.Percentage,
                Code = item.Ingredient.Code,
            });
            glues.Ingredients = list;
            return glues;

        }



        //Login khi them repo
    }
}