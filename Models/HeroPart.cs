using Moov2.Orchard.Hero.Settings;
using Orchard.ContentManagement;

namespace Moov2.Orchard.Hero.Models
{
    public class HeroPart : ContentPart<HeroPartRecord>
    {
        #region PartData

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

        #endregion

        #region PartSettings

        public string Breakpoints
        {
            get
            {
                return TypePartDefinition.Settings.GetModel<HeroTypePartSettings>().Breakpoints;
            }
        }

        public string Hint
        {
            get
            {
                return TypePartDefinition.Settings.GetModel<HeroTypePartSettings>().Hint;
            }
        }

        #endregion

    }
}