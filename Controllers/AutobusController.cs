using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.EntityFrameworkCore;

namespace Autobuska_Stanica.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AutobusController : ControllerBase
    {

        public AutobuskaStanicaContext Context{get; set;}
        

       public AutobusController(AutobuskaStanicaContext context)
       {
           Context=context;

       }   
    /*
        [Route("DodajAutobus/{idAutobuskeStanice}")]
        [HttpPost]
        public async Task<ActionResult> DodajAutobus(int idAutobuskeStanice,[FromBody] Autobus autobus)
        {
            var stanica=await Context.Stanice.FindAsync(idAutobuskeStanice);
            if (stanica!=null){
                
                autobus.Stanica=stanica;
                if (autobus.Registacija!=" ")
                {
                    Context.Autobusi.Add(autobus);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno dodat autobus u stanicu!");
                }
                else return BadRequest("Nije uspesno dodat autobus");
            }
            else return BadRequest("Greska prilikom dodavanja autobusa");
        }
        */
        
        [Route("DodajAutobus/{idAutobuskeStanice}")]
        [HttpPost]
        public async Task<ActionResult> DodajAutobus(int idAutobuskeStanice,[FromBody] Autobus autobus)
        {
            var stanica=await Context.Stanice.FindAsync(idAutobuskeStanice);
          
            if((autobus.brojSedista>200)&&(autobus.brojSedista<20))
              {
                   return BadRequest("Greska prilikom dodavanja autobusa broj sedista mora biti u opsegu od 20 do 200");

              }
            if (autobus.Registacija==" ")
            {
                return BadRequest("Greska prilikom dodavanja autobusa,morate uneti registarki broj");

            }        
            try
            {
                autobus.Stanica=stanica;
                Context.Autobusi.Add(autobus);
                    await Context.SaveChangesAsync();
                    return Ok("Dodali ste autobus u autobusku stanicu!");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }  

       [Route("PreuzimanjeAutobusaIzStanice/{idAutobuskeStanice}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjeAutobusaIzStanice(int idAutobuskeStanice)
        {
                  
            var autobus=await Context.Autobusi.Where(x=>x.Stanica.ID == idAutobuskeStanice).ToListAsync();
            return new JsonResult(autobus);
                
        }

        [Route("PreuzimanjePoslednjegAutobusaIzStanice/{idAutobuskeStanice}")]
        [HttpGet]
        public async Task<JsonResult> PreuzimanjePoslednjegAutobusaIzStanice(int idAutobuskeStanice)
        {
            var autobusi=await Context.Autobusi.Where(x=>x.Stanica.ID == idAutobuskeStanice).ToListAsync();

            return new JsonResult(autobusi[autobusi.Count-1]);
        }




        [Route("ObrisiAutobus/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiAutobus(int id)
        {
            var autobus=await Context.Autobusi.FindAsync(id);
            if (autobus!= null) {
                Context.Autobusi.Remove(autobus);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisan autobus!");
            }
            else return BadRequest("Greska prilikom brisanja");
        } 
         
    }
}
