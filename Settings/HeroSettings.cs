using Orchard.ContentManagement;
using Orchard.ContentManagement.MetaData;
using Orchard.ContentManagement.MetaData.Builders;
using Orchard.ContentManagement.MetaData.Models;
using Orchard.ContentManagement.ViewModels;
using System.Collections.Generic;

namespace Moov2.Orchard.Hero.Settings
{
    public class HeroTypePartSettings
    {
        public string Hint { get; set; }

        public string Breakpoints { get; set; }
    }

    public class HeroSettingsHooks : ContentDefinitionEditorEventsBase
    {
        private const string DefaultBreakpoints = "450, 768, 1400, 1900";
        private const string DefaultHint = @"<p>The hero section is a full-width media item displayed before the page content.</p>
<p>Use the shortcut below to quickly generate HTML for the hero section by picking a media item from the media library.</p>
<p>Alternatively, you can customise the display of a hero section by constructing custom HTML using the editor.</p>";

        public override IEnumerable<TemplateViewModel> TypePartEditor(ContentTypePartDefinition definition)
        {
            if (definition.PartDefinition.Name != "HeroPart")
                yield break;

            var model = definition.Settings.GetModel<HeroTypePartSettings>();
            yield return DefinitionTemplate(model);
        }

        public override IEnumerable<TemplateViewModel> TypePartEditorUpdate(ContentTypePartDefinitionBuilder builder, IUpdateModel updateModel)
        {
            if (builder.Name != "HeroPart")
                yield break;

            var model = new HeroTypePartSettings();
            updateModel.TryUpdateModel(model, "HeroTypePartSettings", null, null);
            builder.WithSetting("HeroTypePartSettings.Hint", !string.IsNullOrWhiteSpace(model.Hint) ? model.Hint : DefaultHint);
            builder.WithSetting("HeroTypePartSettings.Breakpoints", !string.IsNullOrWhiteSpace(model.Breakpoints) ? model.Breakpoints : DefaultBreakpoints);
            yield return DefinitionTemplate(model);
        }
    }
}