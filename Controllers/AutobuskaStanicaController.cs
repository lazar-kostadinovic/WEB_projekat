using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Autobuska_Stanica.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutobuskaStanicaController : ControllerBase
    {

        public AutobuskaStanicaContext Context{get; set;}
        

       public AutobuskaStanicaController(AutobuskaStanicaContext context)
       {
           Context=context;

       }               
        [Route("DodajAutobuskuStanicu")]
        [HttpPost]
        public async Task<ActionResult> DodajAutobuskuStanicu([FromBody] AutobuskaStanica stanica)
        {
            if (string.IsNullOrWhiteSpace(stanica.Naziv) || stanica.Naziv.Length > 30)
            {
                return BadRequest("Pogrešan naziv!");
            }

            if (string.IsNullOrWhiteSpace(stanica.Lokacija) || stanica.Lokacija.Length > 40)
            {
                return BadRequest("Pogrešna lokacija!");
            }

            try
            {
                Context.Stanice.Add(stanica);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata autobuska stanica");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [Route("PreuzimanjeStanice")]
        [HttpGet]
         public async Task<JsonResult> PreuzmiStanicu()
        {
           var atubosukestanice=await Context.Stanice.Include(x=>x.Autobus).ToListAsync();
           return new JsonResult(atubosukestanice);
        }

        [Route("BrisanjeAutobuskeStanice/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiStanicu(int id)
        {
            var stanica=await Context.Stanice.FindAsync(id);
            if (stanica!=null) {
                var autobusi=await Context.Autobusi.Where(x=>x.Stanica==stanica).ToListAsync();
                if (autobusi!=null){
                    autobusi.ForEach(autobus=>{
                    Context.Autobusi.Remove(autobus);
                });  
                Context.Stanice.Remove(stanica);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana autobuska stanica kao i njeni autobusi!"); 
                }
                else return Ok("Uspesno obrisana autobuska stanica ali ona ne poseduje nijedan autobus!"); 
            }
            else
                {
                return BadRequest("Greska prilikom brisanja autobuske stanice");
                }
        }
        

    }
}
