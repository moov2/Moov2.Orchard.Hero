using Orchard.Mvc.Routes;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Routing;

namespace Moov2.Orchard.Hero
{
    public class Routes : IRouteProvider { 
        public void GetRoutes(ICollection<RouteDescriptor> routes)
        {
            foreach (RouteDescriptor routeDescriptor in GetRoutes())
            {
                routes.Add(routeDescriptor);
            }
        }

        public IEnumerable<RouteDescriptor> GetRoutes()
        {
            return new[] {
                    new RouteDescriptor {
                        Priority = 5,
                        Route = new Route(
                            "Admin/Hero/Sizes",
                            new RouteValueDictionary {
                                {"area", "Moov2.Orchard.Hero"},
                                {"controller", "Media"},
                                {"action", "Sizes"}
                            },
                            new RouteValueDictionary(),
                            new RouteValueDictionary {
                                {"area", "Moov2.Orchard.Hero"}
                            },
                            new MvcRouteHandler())
                    },
                };
        }
    }
}