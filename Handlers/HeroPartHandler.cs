using Moov2.Orchard.Hero.Models;
using Orchard.ContentManagement.Handlers;
using Orchard.Data;

namespace Moov2.Orchard.Hero.Handlers
{
    public class HeroPartHandler : ContentHandler
    {
        public HeroPartHandler(IRepository<HeroPartRecord> heroRepository)
        {
            Filters.Add(StorageFilter.For(heroRepository));
        }
    }
}