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
    public class OdredisteController : ControllerBase
    {

        public AutobuskaStanicaContext Context{get; set;}
        

       public OdredisteController(AutobuskaStanicaContext context)
       {
           Context=context;

       }   

        [Route("DodajOdrediste")]
        [HttpPost]
        public async Task<ActionResult> AddDestinacija([FromBody] Odrediste odrediste)
        {
            if ((odrediste.Grad=="")||(odrediste.Zemlja==""))
             {
                return BadRequest("Dodavanje destinacije neuspesno");
             }
            else {
                Context.Odredista.Add(odrediste);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodato odrediste!");
            }
        }
        [Route("PreuzmiOdrediste")]
        [HttpGet]
         public async Task<JsonResult> PreuzmiOdrediste()
        {
           var odrediste=await Context.Odredista.ToListAsync();
           if (odrediste!=null)
            {
               return new JsonResult(odrediste);
            } 
            else 
            return new JsonResult("");
        }
        
    
        [Route("PreuzimanjePoslednjeDodatoOdrediste")]
        [HttpGet]
         public async Task<JsonResult> PreuzimanjePoslednjeDodatoOdrediste()
        {
           var odrediste=await Context.Odredista.ToListAsync();
               return new JsonResult(odrediste[odrediste.Count-1]);
      

        }


        
        [Route("PreuzmiOdredisteSaId/{idOdrediste}")]
        [HttpGet]
         public async Task<JsonResult> PreuzmiOdredisteSaId(int idOdrediste)
        {
           var odrediste=await Context.Odredista.FindAsync(idOdrediste);
           return new JsonResult(odrediste);
        }
       
    }
}