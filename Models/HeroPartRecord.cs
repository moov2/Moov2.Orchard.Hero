using Orchard.ContentManagement.Records;
using Orchard.Data.Conventions;

namespace Moov2.Orchard.Hero.Models
{
    public class HeroPartRecord : ContentPartVersionRecord
    {
        [StringLengthMax]
        public virtual string Html { get; set; }
    }
}