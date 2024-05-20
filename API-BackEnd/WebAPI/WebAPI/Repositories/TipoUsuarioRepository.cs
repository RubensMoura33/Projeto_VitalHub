using WebAPI.Contexts;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuario
    {
        VitalContext ctx = new VitalContext();
        public Guid BuscarIdTipoUsuario(string tipoUsuario)
        {
        Guid id =  Guid.Parse(ctx.TiposUsuarios.Where(x => x.TipoUsuario == tipoUsuario).FirstOrDefault().Id.ToString());
            return id;
        }
    }
}
