using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PeopleCrudApi.Models
{
    public class Pessoa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required] public string Nome { get; set; } = string.Empty;
        [Required] public int Idade { get; set; }
        [Required] public string EstadoCivil { get; set; } = string.Empty;
        [Required] public string CPF { get; set; } = string.Empty;
        [Required] public string Cidade { get; set; } = string.Empty;
        [Required] public string Estado { get; set; } = string.Empty;
    }
}
