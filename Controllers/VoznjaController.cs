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
    public class VoznjaController : ControllerBase
    {

        public AutobuskaStanicaContext Context{get; set;}
        

       public VoznjaController(AutobuskaStanicaContext context)
       {
           Context=context;
       }



        [Route("PreuzmiVoznju/{idAutobus}")]
        [HttpGet]
        public async Task<JsonResult> PreuzmiVoznju(int idAutobus)
        {
            var voznja=await Context.Voznje.Where(x=>x.Autobus.ID==idAutobus).ToListAsync();
            
            return new JsonResult(voznja);
        }
     
        [Route("DodelaVoznjeAutobusu/{idOdredista}/{idAutobus}/{Vreme}")] 
        [HttpPost] 
        public async Task<ActionResult> DodelaVoznjeAutobusu(int idOdredista,int idAutobus,DateTime Vreme,[FromBody] Voznja voznja)
        {
            var odrediste=await Context.Odredista.Where(x=>x.ID==idOdredista).FirstAsync();
            var autobus= await Context.Autobusi.Where(x=>x.ID==idAutobus).FirstAsync();

            if (odrediste == null) 
               return BadRequest("Odrediste nije pronadjeno!");
            else{
                if (autobus==null)  
                    return BadRequest("Autobus nije pronadjen!");
                else 
                {
                  
                    if ( (voznja.ocekivanaDuzinaPuta<2000) && ((voznja.DolazniOdlazni==1) || (voznja.DolazniOdlazni==0)))
                    {
                    Voznja voznja1=new Voznja();
                    voznja1.Odrediste=odrediste;
                    voznja1.Autobus=autobus;
                    voznja1.IdAutobus=idAutobus;
                    voznja1.IdOdredista=idOdredista;
                    voznja1.Vreme=Vreme;
                    voznja1.DolazniOdlazni=voznja.DolazniOdlazni;
                    voznja1.ocekivanaDuzinaPuta=voznja.ocekivanaDuzinaPuta;
                    voznja1.BrojPresedanja=voznja.BrojPresedanja;
                    Context.Voznje.Add(voznja1);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno zakazana voznja!");
                    }
                    else 
                    return BadRequest("Greska prilikom zakazivanje voznje!");
                }
            }
        }
        
        [Route("IzmenaVoznje/{idVoznje}/{vreme}/{idOdredista}/{ocekivanaDuzinaPuta}")]
        [HttpPut]
        public async Task<ActionResult> IzmenaVoznje(int idVoznje,DateTime vreme,int idOdredista,int ocekivanaDuzinaPuta)
        {
            var voznja=await Context.Voznje.FindAsync(idVoznje);
            if (voznja!=null)
            {
                voznja.Vreme=vreme;
                voznja.IdOdredista=idOdredista;
                voznja.ocekivanaDuzinaPuta=ocekivanaDuzinaPuta;
                Context.Voznje.Update(voznja);
                await Context.SaveChangesAsync();
                return Ok("Izmenjeni paremetri voznje!");
            }
            else
               return BadRequest("Greska prilikom izmene voznje!");

        }   
        
        [Route("ObrisiVoznju/{idVoznje}")]
        [HttpDelete]
            public async Task<ActionResult> ObrisiVoznju(int idVoznje)
        {
            var voznja =await Context.Voznje.FindAsync(idVoznje);
            if (voznja!=null){
                Context.Voznje.Remove(voznja);
                await Context.SaveChangesAsync();
                return Ok("Uspesno obrisana voznja!");
            } 
            else 
            {
                return BadRequest("Greska prilikom brisanja voznje!"); 
            }
        }
     }
}
