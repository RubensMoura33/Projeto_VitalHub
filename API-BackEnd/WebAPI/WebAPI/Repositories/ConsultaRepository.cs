using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Interfaces;

namespace WebAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {

        public VitalContext ctx = new VitalContext();

        public Consulta BuscarPorId(Guid id)
        {
            return ctx.Consultas.Find(id);
        }

        public void Cadastrar(Consulta clinica)
        {
            ctx.Consultas.Add(clinica);
            ctx.SaveChanges();
        }

        public void EditarProntuario(Consulta consulta)
        {
            Consulta buscada = ctx.Consultas.Include(x => x.Receita).FirstOrDefault(x => x.Id == consulta.Id)!;

            buscada.Descricao = consulta.Descricao;
            buscada.Diagnostico = consulta.Diagnostico;
            if(buscada.ReceitaId != null)
            {
            buscada.Receita.Medicamento = consulta.Receita.Medicamento;
            }
            else
            {
                buscada.Receita = new Receita();
                buscada.Receita.Medicamento = consulta.Receita.Medicamento;

                ctx.Receitas.Add(buscada.Receita);
                ctx.SaveChanges() ;

                buscada.ReceitaId = buscada.Receita.Id;
            }

            ctx.Update(buscada);
            ctx.SaveChanges();
        }



public void EditarStatus(Guid idConsulta)
        {
            var buscada = ctx.Consultas.Find(idConsulta);
            Guid idSituacaoCancelada = Guid.Parse(ctx.Situacoes.Where(x => x.Situacao == "Cancelados").FirstOrDefault().Id.ToString());
            buscada.SituacaoId = idSituacaoCancelada ;
            ctx.Update(buscada);
            ctx.SaveChanges();
        }


        public List<Consulta> ListarPorMedico(Guid IdMedico)
        {
            
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.MedicoClinica)
                .Where(x => x.MedicoClinica != null && x.MedicoClinica.MedicoId == IdMedico)
                .ToList();

            return listaConsultas;
            
        }

        public List<Consulta> ListarPorPaciente(Guid IdPaciente)
        {
            List<Consulta> listaConsultas = ctx.Consultas
                .Include(x => x.MedicoClinica)
                .Include(x => x.Paciente)
                .Include(x => x.Situacao)
                .Where(x => x.PacienteId != null && x.PacienteId == IdPaciente)
                .ToList();

            return listaConsultas;
        }

        public List<Consulta> ListarTodos()
        {
            return ctx.Consultas.ToList();
        }
    }
}
