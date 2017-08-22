using Orchard.ContentManagement.MetaData;
using Orchard.Core.Contents.Extensions;
using Orchard.Data.Migration;

namespace Moov2.Orchard.Hero
{
    public class Migrations : DataMigrationImpl
    {
        public int Create()
        {
            SchemaBuilder.CreateTable("HeroPartRecord",
                table => table
                    .ContentPartVersionRecord()
                    .Column<string>("Html", column => column.Unlimited())
                );

            ContentDefinitionManager.AlterPartDefinition("HeroPart", builder => builder
                .Attachable()
                .WithDescription("Add hero section to content item."));

            return 1;
        }
    }
}