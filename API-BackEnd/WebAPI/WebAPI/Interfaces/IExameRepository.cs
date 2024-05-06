using WebAPI.Domains;
using WebAPI.ViewModels;

namespace WebAPI.Interfaces
{
    public interface IExameRepository
    {
        public void Cadastrar(ExameViewModel exame);

        public List<Exame> BuscarPorIdConsulta(Guid idConsulta);
    }
}
