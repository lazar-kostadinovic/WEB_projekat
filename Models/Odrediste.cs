using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Odrediste")]
    public class Odrediste
    {
        [Key]   
        public int ID{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti grad odredista!")]
        public string Grad{get;set;}

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti zemlju odredista!")]
        public string Zemlja{get;set;}

        [StringLength(30)] 
        
        public string nazivStanice{get;set;}
        
        public virtual List<Voznja> Voznja {get;set;}
        
        public Odrediste()
        {
            Voznja=new List<Voznja>();
        }
        
    }
}