using Orchard.ContentManagement;

namespace Moov2.Orchard.Hero.Models
{
    public class HeroPart : ContentPart<HeroPartRecord>
    {
        public string Html
        {
            get { return Retrieve(x => x.Html); }
            set { Store(x => x.Html, value); }
        }

        public string Text
        {
            get { return Html; }
            set { Html = value; }
        }
    }
}