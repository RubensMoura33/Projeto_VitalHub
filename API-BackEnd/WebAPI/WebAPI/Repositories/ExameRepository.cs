using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.ViewModels;

namespace WebAPI.Repositories
{
    public class ExameRepository : IExameRepository
    {
        public VitalContext ctx = new VitalContext();
        public List<Exame> BuscarPorIdConsulta(Guid idConsulta)
        {
            try
            {
                return ctx.Exames
                    .Where(x => x.ConsultaId == idConsulta)
                    .ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Cadastrar(ExameViewModel exame)
        {
            try
            {

                var exameBuscado = ctx.Exames.FirstOrDefault(x => x.ConsultaId == exame.ConsultaId);

                if(exameBuscado != null)
                {
                    exameBuscado.Descricao = exame.Descricao;
                    ctx.Exames.Update(exameBuscado);
                }
                else
                {
                    Exame novoExame = new Exame();

                    novoExame.Descricao = exame.Descricao;
                    novoExame.ConsultaId = exame.ConsultaId;
                    ctx.Exames.Add(novoExame);
                }

  

                ctx.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
