using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models{
    [Table("Autobus")]
    public class Autobus
    {
        [Key]
        [Column("ID")]    
        public int ID{get;set;}

        [Required(ErrorMessage="Neophodno je uneti registarsku oznaku!")]
        [StringLength(20)] 
        public string Registacija { get; set; }

        [Required(ErrorMessage="Neophodno je uneti marku!")]
        [StringLength(30)] 
        public string Marka { get; set; }

        [StringLength(30)] 
        [Required(ErrorMessage="Neophodno je uneti model!")]
        public string Model{get;set;}

        [Required]
        [Range(20,200)]
        [Column("BrojSedista")]
        public int brojSedista{get;set;}
        
        [JsonIgnore]     
        public virtual AutobuskaStanica Stanica{get;set;}
        
        public virtual List<Voznja> Voznja{get;set;}
       public Autobus()
        {
            Voznja=new List<Voznja>();
        }
        

    }
}
