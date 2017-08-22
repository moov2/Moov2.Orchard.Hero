using Moov2.Orchard.Hero.Models;
using Orchard.ContentManagement;
using Orchard.ContentManagement.Drivers;
using Orchard.ContentManagement.Handlers;
using Orchard.Localization;
using Orchard.Services;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Moov2.Orchard.Hero.Drivers
{
    public class HeroPartDriver : ContentPartDriver<HeroPart>
    {
        #region Constants

        private const string TemplateName = "Parts.Hero.HeroPart";

        #endregion

        #region Dependencies

        private readonly IEnumerable<IHtmlFilter> _htmlFilters;
        public Localizer T { get; set; }

        #endregion

        #region Constructor

        public HeroPartDriver(IEnumerable<IHtmlFilter> htmlFilters) {
            _htmlFilters = htmlFilters;
        }

        #endregion

        #region Overrides

        protected override string Prefix
        {
            get { return "Hero"; }
        }

        #endregion

        #region Display

        protected override DriverResult Display(HeroPart part, string displayType, dynamic shapeHelper)
        {
            if (displayType != "Detail")
                return null;

            var html = _htmlFilters.Aggregate(part.Html, (text, filter) => filter.ProcessContent(text, "Html"));

            return ContentShape("Parts_Hero",
                () => shapeHelper.Parts_Hero(
                    Html: new HtmlString(html)
                ));
        }

        #endregion

        #region Editor

        protected override DriverResult Editor(HeroPart part, dynamic shapeHelper)
        {
            return ContentShape("Parts_Hero_Edit",
                () => shapeHelper.EditorTemplate(TemplateName: TemplateName, Model: part, Prefix: Prefix));
        }

        protected override DriverResult Editor(HeroPart part, IUpdateModel updater, dynamic shapeHelper)
        {
            updater.TryUpdateModel(part, Prefix, null, null);
            return Editor(part, shapeHelper);
        }

        #endregion

        #region Import/Export

        protected override void Importing(HeroPart part, ImportContentContext context)
        {
            // Don't do anything if the tag is not specified.
            if (context.Data.Element(part.PartDefinition.Name) == null)
                return;

            context.ImportAttribute(part.PartDefinition.Name, "Html", html => part.Html = html);
        }

        protected override void Exporting(HeroPart part, ExportContentContext context)
        {
            context.Element(part.PartDefinition.Name).SetAttributeValue("Html", part.Html);
        }

        #endregion
    }
}