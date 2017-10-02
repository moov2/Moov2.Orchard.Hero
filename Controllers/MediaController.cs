using Moov2.Orchard.Hero.ViewModels;
using Orchard.ContentManagement;
using Orchard.Environment;
using Orchard.Forms.Services;
using Orchard.Logging;
using Orchard.MediaLibrary.Models;
using Orchard.MediaProcessing.Models;
using Orchard.MediaProcessing.Services;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Web.Mvc;

namespace Moov2.Orchard.Hero.Controllers
{
    public class MediaController : Controller
    {
        #region Dependencies

        private readonly IContentManager _contentManager;
        private readonly Work<IImageProfileManager> _imageProfileManager;

        public ILogger Logger { get; set; }

        #endregion

        #region Constructor

        public MediaController(IContentManager contentManager, Work<IImageProfileManager> imageProfileManager)
        {
            _contentManager = contentManager;
            _imageProfileManager = imageProfileManager;
        }

        #endregion

        #region Actions

        [HttpGet]
        public ActionResult Sizes(int id, string breakpoints)
        {
            if (id == 0 || string.IsNullOrWhiteSpace(breakpoints))
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            try
            {
                return Json(ProcessBreakpoints(_contentManager.Get(id), breakpoints), JsonRequestBehavior.AllowGet);
            } catch (Exception ex) {
                Logger.Error(ex, "An error occurred while generating breakpoints sizes for image {1} with breakpoints as {2}", id, breakpoints);
            }

            return Json(Enumerable.Empty<SizesItemViewModel>(), JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region HelperMethods

        private string GetResizeUrl(string path, string width)
        {
            var state = new Dictionary<string, string> {
                {"Width", width.ToString(CultureInfo.InvariantCulture)},
                {"Height", "0" }
            };

            var filter = new FilterRecord
            {
                Category = "Transform",
                Type = "Resize",
                State = FormParametersHelper.ToString(state)
            };

            var profile = "Transform_Resize"
                + "_w_" + Convert.ToString(width)
                + "_h_" + Convert.ToString(0);

            return _imageProfileManager.Value.GetImageProfileUrl(path, profile, filter);
        }

        private IEnumerable<SizesItemViewModel> ProcessBreakpoints(ContentItem media, string breakpoints)
        {
            var items = new List<SizesItemViewModel>();
            var sizes = breakpoints.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var size in sizes)
            {
                items.Add(new SizesItemViewModel {
                    Size = int.Parse(size.Trim()),
                    Url = GetResizeUrl(media.As<MediaPart>().MediaUrl, size.Trim())
                });
            }

            // add the original image
            items.Add(new SizesItemViewModel {
                Size = media.As<ImagePart>().Width,
                Url = media.As<MediaPart>().MediaUrl
            });

            return items.OrderBy(x => x.Size);
        }

        #endregion
    }
}