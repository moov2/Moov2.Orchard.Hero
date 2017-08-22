using Orchard.UI.Resources;

namespace Moov2.Orchard.Hero
{
    public class ResourceManifest : IResourceManifestProvider
    {
        public void BuildManifests(ResourceManifestBuilder builder)
        {
            var manifest = builder.Add();

            manifest.DefineScript("HeroJs").SetUrl("orchard.hero.min.js", "orchard.hero.js").SetDependencies(new string[] { "jQueryColorBox" });
        }
    }
}