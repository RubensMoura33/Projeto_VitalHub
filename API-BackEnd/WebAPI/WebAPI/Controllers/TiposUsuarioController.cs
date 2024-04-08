using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiposUsuarioController : ControllerBase
    {


        private ITipoUsuario tipoUsuarioRepository { get; set; }

        public TiposUsuarioController()
        {
            tipoUsuarioRepository = new TipoUsuarioRepository();
        }


        [HttpGet]
        public IActionResult GetId(string tipoUsuario)
        {
            return Ok(tipoUsuarioRepository.BuscarIdTipoUsuario(tipoUsuario));
        }

    }
}
