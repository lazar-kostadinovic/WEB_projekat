using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Models{
    [Table("AutobuskaStanica")]
    public class AutobuskaStanica
    {
        [Key]   
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti naziv autobuske stanice!")]
        public string Naziv{get;set;}

        [StringLength(40)] 
        [Required(ErrorMessage="Neophodno je uneti lokaciju autobuske stanice!")]
        public string Lokacija {get;set;}
        public virtual List<Autobus> Autobus{get;set;}

   public AutobuskaStanica()
    {
        Autobus=new List<Autobus>();
    }
    
    }
}