using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System;
namespace Models
{
    public class Voznja{

        [Key]
        public int ID{get;set;}     
        public int IdAutobus{get;set;}  
        public int IdOdredista{get;set;}
        
        public DateTime Vreme{get;set;}
       
        public int ocekivanaDuzinaPuta{get;set;}

        public int DolazniOdlazni { get; set; }

      
        public int BrojPresedanja{get;set;}

        [JsonIgnore]
        public virtual Autobus Autobus{get;set;}
        [JsonIgnore]
        public virtual Odrediste Odrediste{get;set;}
        }
}
