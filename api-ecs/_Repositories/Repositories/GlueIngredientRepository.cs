using System.Threading.Tasks;
using EC_API._Repositories.Interface;
using EC_API.Data;
using EC_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using EC_API.DTO;
using System.Collections.Generic;
using System.Transactions;
using System;

namespace EC_API._Repositories.Repositories
{
    public class GlueIngredientRepository : ECRepository<GlueIngredient>, IGlueIngredientRepository
    {
        private readonly DataContext _context;
        public GlueIngredientRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> EditPercentage(int glueid, int ingredientid, int percentage)
        {
            if (await _context.GlueIngredient.AnyAsync(x => x.GlueID == glueid && x.IngredientID == ingredientid))
            {
                var item = await _context.GlueIngredient.FirstOrDefaultAsync(x => x.GlueID == glueid && x.IngredientID == ingredientid);
                item.Percentage = percentage;
                try
                {
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (System.Exception)
                {
                    return false;
                }

            }
            return false;
        }

        public async Task<bool> EditAllow(int glueid, int ingredientid, int allow)
        {
            if (await _context.GlueIngredient.AnyAsync(x => x.GlueID == glueid && x.IngredientID == ingredientid))
            {
                var item = await _context.GlueIngredient.FirstOrDefaultAsync(x => x.GlueID == glueid && x.IngredientID == ingredientid);
                item.Allow = allow;
                try
                {
                    await _context.SaveChangesAsync();
                    return true;
                }
                catch (System.Exception)
                {
                    return false;
                }

            }
            return false;
        }

        public async Task<object> GetIngredientOfGlue(int glueid)
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
                                }).GroupBy(x => x.ID).ToListAsync();

            return model2;
        }

        public Task<Glue> Guidance(List<GlueIngredientForGuidanceDto> glueIngredientForGuidanceDto)
        {
            throw new NotImplementedException();
        }



        //Login khi them repo
    }
}